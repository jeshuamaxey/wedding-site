// Imports data/guestlist.csv into the `guests` table, then seeds one
// `rsvp_responses` row per guest per event day and one `dietary_requirements`
// row per guest. Uses the service-role key, so it bypasses RLS -- run it
// only from a trusted machine, never from the browser.
//
// Usage:
//   node --env-file=.env.local scripts/import-guestlist.mjs --dry-run
//   node --env-file=.env.local scripts/import-guestlist.mjs
//   node --env-file=.env.local scripts/import-guestlist.mjs --force   (re-run despite existing guests rows)

import { readFile } from 'node:fs/promises'
import { parse } from 'csv-parse/sync'
import { createClient } from '@supabase/supabase-js'

const CSV_PATH = new URL('../data/guestlist.csv', import.meta.url)

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const force = args.has('--force')

const SIDE_MAP = { SB: 'bride', JM: 'groom' }
const INVITE_STATUS_MAP = {
  invite: 'invited',
  reserve: 'reserve',
  'no invite': 'not_invited',
}

function toIntOrZero(value) {
  const n = parseInt(String(value ?? '').trim(), 10)
  return Number.isFinite(n) ? n : 0
}

function cleanOrNull(value) {
  const v = String(value ?? '').trim()
  return v === '' ? null : v
}

function transform(rows) {
  const guests = []
  const skipped = []
  const syntheticGroups = []
  let nextSyntheticGroupId = 100000

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2 // +1 for 0-index, +1 for header row
    const name = cleanOrNull(row['Name'])
    if (!name) continue // blank template rows

    const inviteRaw = String(row['Invite'] ?? '').trim().toLowerCase()
    const inviteStatus = INVITE_STATUS_MAP[inviteRaw]
    if (!inviteStatus) {
      skipped.push({ rowNumber, name, reason: `unrecognized Invite value: "${row['Invite']}"` })
      continue
    }

    let inviteGroupId = parseInt(String(row['Invite group'] ?? '').trim(), 10)
    if (!Number.isFinite(inviteGroupId)) {
      inviteGroupId = nextSyntheticGroupId++
      syntheticGroups.push({ rowNumber, name, assignedGroup: inviteGroupId })
    }

    guests.push({
      invite_group_id: inviteGroupId,
      full_name: name,
      name_is_placeholder: /PLUS 1\s*$/i.test(name),
      side: SIDE_MAP[String(row['Side'] ?? '').trim()] ?? null,
      group_label: cleanOrNull(row['Group']),
      invite_status: inviteStatus,
      kids_count: toIntOrZero(row['Kids']),
      babies_count: toIntOrZero(row['Babies']),
      kids_dietary_note: null,
      address: cleanOrNull(row['Address']),
      room_alloc: cleanOrNull(row['Room alloc']),
      room_subsidy_pct: cleanOrNull(row['Room subsidy']),
      negotiable: cleanOrNull(row['Negotiable']),
      sent_std: cleanOrNull(row['Sent text STD?']),
      given_std: cleanOrNull(row['Given STD?']),
    })
  }

  return { guests, skipped, syntheticGroups }
}

async function main() {
  const csvText = await readFile(CSV_PATH, 'utf8')
  const rows = parse(csvText, { columns: true, skip_empty_lines: true })
  const { guests, skipped, syntheticGroups } = transform(rows)

  const statusCounts = guests.reduce((acc, g) => {
    acc[g.invite_status] = (acc[g.invite_status] ?? 0) + 1
    return acc
  }, {})

  console.log(`Parsed ${rows.length} CSV rows -> ${guests.length} importable guests`)
  console.log('By invite_status:', statusCounts)

  if (skipped.length) {
    console.log(`\nSkipped ${skipped.length} row(s) -- needs your review, not imported:`)
    for (const s of skipped) console.log(`  row ${s.rowNumber}: "${s.name}" -- ${s.reason}`)
  }

  if (syntheticGroups.length) {
    console.log(`\n${syntheticGroups.length} guest(s) had no Invite group in the sheet -- assigned a solo group:`)
    for (const s of syntheticGroups) console.log(`  row ${s.rowNumber}: "${s.name}" -> invite_group_id ${s.assignedGroup}`)
  }

  if (dryRun) {
    console.log('\n--dry-run: no data written.')
    return
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.')
  }
  const supabase = createClient(url, serviceRoleKey)

  const { count: existingCount, error: countError } = await supabase
    .from('guests')
    .select('id', { count: 'exact', head: true })
  if (countError) throw countError
  if (existingCount > 0 && !force) {
    throw new Error(
      `guests table already has ${existingCount} row(s). Re-running would duplicate data. ` +
        `Pass --force to proceed anyway (you likely want to truncate guests/rsvp_responses/dietary_requirements first).`
    )
  }

  console.log('\nInserting guests...')
  const { data: insertedGuests, error: guestsError } = await supabase
    .from('guests')
    .insert(guests)
    .select('id')
  if (guestsError) throw guestsError
  console.log(`Inserted ${insertedGuests.length} guests.`)

  const { data: eventDays, error: eventDaysError } = await supabase.from('event_days').select('id')
  if (eventDaysError) throw eventDaysError

  const responses = insertedGuests.flatMap((g) =>
    eventDays.map((d) => ({ guest_id: g.id, event_day_id: d.id }))
  )
  console.log(`Seeding ${responses.length} rsvp_responses rows...`)
  const { error: responsesError } = await supabase.from('rsvp_responses').insert(responses)
  if (responsesError) throw responsesError

  const dietaryRows = insertedGuests.map((g) => ({ guest_id: g.id }))
  console.log(`Seeding ${dietaryRows.length} dietary_requirements rows...`)
  const { error: dietaryError } = await supabase.from('dietary_requirements').insert(dietaryRows)
  if (dietaryError) throw dietaryError

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
