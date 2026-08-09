"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { usePointerParallax } from "@/lib/usePointerParallax";

/**
 * Seeded PRNG. The scatter needs to look random but be deterministic — a fixed
 * seed keeps the halo identical across renders and reloads, and keeps this a
 * pure function of its arguments.
 */
function mulberry32(seed: number) {
  return function next() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Points scattered through a spherical shell — the ambient halo. */
function useHaloPositions(count: number, inner: number, outer: number) {
  return useMemo(() => {
    const random = mulberry32(0x5ca8ff);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Uniform direction, then a random radius inside the shell.
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = inner + random() * (outer - inner);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count, inner, outer]);
}

type CoreProps = { progress: RefObject<number>; compact?: boolean };

/**
 * Pulls the camera back far enough that the object stays whole in any viewport.
 *
 * A PerspectiveCamera's fov is *vertical*, so a portrait phone has a very
 * narrow horizontal field. At a fixed distance the object then overflows
 * sideways and what is left on screen is an unreadable tangle of lines rather
 * than a recognisable shape. Fitting against whichever axis is tighter solves
 * that here and in narrow desktop windows alike.
 */
function CameraFit({ radius = 2.8 }: { radius?: number }) {
  // Last aspect the camera was solved for. Reading the camera off the frame
  // state rather than out of useThree keeps this a plain three.js mutation
  // instead of writing through a hook's return value.
  const solvedFor = useRef(0);

  useFrame(({ camera, size }) => {
    const aspect = size.width / Math.max(size.height, 1);
    if (Math.abs(aspect - solvedFor.current) < 0.001) return;
    solvedFor.current = aspect;

    const perspective = camera as THREE.PerspectiveCamera;
    const fov = (perspective.fov * Math.PI) / 180;
    const fitVertical = radius / Math.tan(fov / 2);
    const fitHorizontal = fitVertical / Math.max(aspect, 0.0001);
    perspective.position.z = Math.max(fitVertical, fitHorizontal) * 1.02;
    perspective.updateProjectionMatrix();
  });

  return null;
}

/**
 * The hero object: a matte solid core inside two counter-rotating wireframe
 * shells, wrapped in a particle halo. Scroll drives rotation and depth; the
 * pointer adds a small parallax tilt.
 */
function Core({ progress, compact = false }: CoreProps) {
  const group = useRef<THREE.Group>(null);
  const innerShell = useRef<THREE.LineSegments>(null);
  const outerShell = useRef<THREE.LineSegments>(null);
  const halo = useRef<THREE.Points>(null);
  const pointer = usePointerParallax();

  const haloPositions = useHaloPositions(compact ? 340 : 720, 3.1, 5.4);

  const geometries = useMemo(() => {
    const solid = new THREE.IcosahedronGeometry(1.18, 1);
    const inner = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.15, 1));
    const outer = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.75, 0));
    return { solid, inner, outer };
  }, []);

  useFrame((state, delta) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    // delta is clamped so a dropped frame or a backgrounded tab cannot fling
    // the rotation forward by a large step.
    const step = Math.min(delta, 0.05);

    if (group.current) {
      group.current.rotation.y += step * 0.16;
      // Scroll tips the object over and pushes it back into the scene.
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.18 + p * 0.9 + pointer.current.y * 0.12,
        0.05,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.current.x * -0.1, 0.05);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -p * 3.2, 0.06);
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        Math.sin(t * 0.5) * 0.08 + p * 0.6,
        0.06,
      );
      const scale = 1 - p * 0.18;
      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, scale, 0.06));
    }

    if (innerShell.current) innerShell.current.rotation.y -= step * 0.34;
    if (outerShell.current) {
      outerShell.current.rotation.y += step * 0.2;
      outerShell.current.rotation.x -= step * 0.1;
    }
    if (halo.current) {
      halo.current.rotation.y -= step * 0.05;
      halo.current.rotation.x = p * 0.4;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometries.solid}>
        <meshStandardMaterial
          color="#0d1017"
          roughness={0.34}
          metalness={0.72}
          emissive="#0a1a34"
          emissiveIntensity={0.8}
          flatShading
        />
      </mesh>

      <lineSegments ref={innerShell} geometry={geometries.inner}>
        <lineBasicMaterial color="#5CA8FF" transparent opacity={0.42} />
      </lineSegments>

      <lineSegments ref={outerShell} geometry={geometries.outer}>
        <lineBasicMaterial color="#9682FF" transparent opacity={0.26} />
      </lineSegments>

      <points ref={halo}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[haloPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#9fb2cc"
          transparent
          opacity={0.62}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroScene({ progress, compact = false }: CoreProps) {
  return (
    <Canvas
      // Cap DPR: this is soft-focus decoration, so retina pixels buy nothing
      // here but cost a lot of fill rate — and fill rate is the scarce
      // resource on a phone, hence the lower ceiling there.
      dpr={compact ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 4, 6]} intensity={140} distance={26} decay={2} color="#5CA8FF" />
      <pointLight position={[-6, -2, 3]} intensity={95} distance={24} decay={2} color="#9682FF" />
      <pointLight position={[0, 5, -4]} intensity={55} distance={22} decay={2} color="#4EE0C8" />
      <CameraFit />
      <Core progress={progress} compact={compact} />
    </Canvas>
  );
}
