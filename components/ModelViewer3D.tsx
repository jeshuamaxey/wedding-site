'use client'

import { Suspense, useMemo, Component, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Center, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Catches 404s or parse errors when a model file hasn't been downloaded yet
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children
  }
}

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  // Clone so switching models doesn't mutate a cached scene object
  const clone = useMemo(() => scene.clone(), [scene])
  return <primitive object={clone} />
}

// Shown while the model loads or if the file is missing
function PlaceholderCRT() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.6, 1.3, 0.85]} />
        <meshStandardMaterial color="#cec8b6" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.04, 0.44]} castShadow>
        <boxGeometry args={[1.38, 1.08, 0.02]} />
        <meshStandardMaterial color="#b2ac9c" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.04, 0.455]}>
        <boxGeometry args={[1.18, 0.92, 0.01]} />
        <meshStandardMaterial
          color="#001800"
          emissive="#002800"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[0, -0.88, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.62, 0.14, 36]} />
        <meshStandardMaterial color="#c4be9e" roughness={0.65} />
      </mesh>
    </group>
  )
}

function NotDownloaded() {
  return (
    <group>
      <PlaceholderCRT />
    </group>
  )
}

export interface ModelViewer3DProps {
  /** Path relative to /public, e.g. /models/crt-fizyman/scene.gltf */
  path: string
  /** Background colour of the canvas — default transparent */
  background?: string
  autoRotate?: boolean
}

export function ModelViewer3D({ path, background, autoRotate = false }: ModelViewer3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 2.8], fov: 42 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows
      style={{ background: background ?? 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-3, 1, -3]} intensity={0.35} color="#b8c8ff" />

      <ModelErrorBoundary fallback={<Center><NotDownloaded /></Center>}>
        <Suspense fallback={<Center><PlaceholderCRT /></Center>}>
          <Center>
            <Model path={path} />
          </Center>
        </Suspense>
      </ModelErrorBoundary>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.35}
        scale={5}
        blur={2.5}
        far={2.5}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={1.4}
        maxDistance={6}
        maxPolarAngle={Math.PI * 0.72}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
      />

      <Environment preset="city" />
    </Canvas>
  )
}
