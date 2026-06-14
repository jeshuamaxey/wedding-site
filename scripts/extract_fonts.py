#!/usr/bin/env python3
"""
Extract individual .woff2 files from a .ttc font collection.
Usage: python3 extract_fonts.py <path-to.ttc> <output-dir>
"""

import sys
import os

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 extract_fonts.py <path-to.ttc> <output-dir>")
        sys.exit(1)

    ttc_path = sys.argv[1]
    output_dir = sys.argv[2]

    try:
        from fontTools.ttLib import TTCollection
    except ImportError:
        print("Missing dependency. Run: pip install fonttools brotli")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    print(f"Reading: {ttc_path}\n")
    collection = TTCollection(ttc_path)

    for i, font in enumerate(collection.fonts):
        name_table = font["name"]
        full_name = name_table.getDebugName(4) or f"font_{i}"
        postscript_name = name_table.getDebugName(6) or f"font_{i}"

        # Sanitise filename
        safe_name = postscript_name.replace(" ", "-").replace("/", "-")
        out_path = os.path.join(output_dir, f"{safe_name}.woff2")

        font.flavor = "woff2"
        font.save(out_path)

        print(f"[{i}] {full_name}")
        print(f"     → {out_path}")

    print(f"\nDone. {len(collection.fonts)} file(s) written to {output_dir}/")

if __name__ == "__main__":
    main()
