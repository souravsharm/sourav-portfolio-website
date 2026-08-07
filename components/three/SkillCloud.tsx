"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import type { RoleId, Skill } from "@/content/skills";
import { resolveFontFamily, usePointerParallax } from "@/lib/usePointerParallax";

type Label = {
  skill: Skill;
  texture: THREE.CanvasTexture;
  aspect: number;
  position: THREE.Vector3;
};

const RADIUS = 2.7;
/** Depth fade range — words at the back of the sphere recede rather than collide. */
const NEAR_OPACITY = 1;
const FAR_OPACITY = 0.16;

const CORE_COLOR = new THREE.Color("#a8d0ff");
const STRONG_COLOR = new THREE.Color("#b3a4ff");
const DIM_COLOR = new THREE.Color("#3f4655");

/** Reused across every sprite each frame so the loop allocates nothing. */
const worldPosition = new THREE.Vector3();

/**
 * The cloud is decoration, not the reference list below it, so long names are
 * trimmed to their recognisable head: parentheticals and the second half of an
 * "A & B" pair carry no weight at this size.
 */
function cloudLabel(name: string) {
  return name.replace(/\s*\([^)]*\)/g, "").split(" & ")[0].trim();
}

/**
 * Renders a word to a 2D canvas and returns it as a texture. Drawing the text
 * ourselves avoids an SDF text library — and, more importantly, avoids the
 * remote font fetch those libraries perform by default.
 */
function makeLabelTexture(text: string, level: number, family: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return null;

  const fontSize = 72;
  const weight = level === 3 ? 700 : level === 2 ? 600 : 500;
  const font = `${weight} ${fontSize}px ${family}`;

  context.font = font;
  const width = Math.ceil(context.measureText(text).width) + 36;
  const height = fontSize + 36;

  canvas.width = width;
  canvas.height = height;

  // Resizing a canvas resets its 2D context, so the font must be set again.
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";
  context.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return { texture, aspect: width / height };
}

/** Even distribution over a sphere — avoids the clumping of random placement. */
function fibonacciSphere(index: number, total: number) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = index * increment;
  return new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(RADIUS);
}

function Cloud({
  skills,
  activeRole,
  progress,
}: {
  skills: Skill[];
  activeRole: RoleId | null;
  progress: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointerParallax();
  const [family, setFamily] = useState<string | null>(null);

  // Textures baked before the display font finishes loading would render in the
  // fallback face, so wait for the font, then resolve the real family name.
  useEffect(() => {
    let cancelled = false;
    const resolve = () => {
      if (!cancelled) setFamily(resolveFontFamily("--font-display", "Inter, system-ui, sans-serif"));
    };
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(resolve).catch(resolve);
    return () => {
      cancelled = true;
    };
  }, []);

  const labels = useMemo<Label[]>(() => {
    if (!family) return [];

    // Cap the population. Past roughly thirty words a tag sphere stops being a
    // picture of a skill set and becomes noise, so the strongest ones win.
    const chosen = [...skills].sort((a, b) => b.level - a.level).slice(0, 30);

    return chosen
      .map((skill, index) => {
        const made = makeLabelTexture(cloudLabel(skill.name), skill.level, family);
        if (!made) return null;
        return { skill, ...made, position: fibonacciSphere(index, chosen.length) };
      })
      .filter((label): label is Label => label !== null);
  }, [skills, family]);

  useEffect(() => {
    return () => labels.forEach((label) => label.texture.dispose());
  }, [labels]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05);

    group.current.rotation.y += step * 0.11 + pointer.current.x * step * 0.4;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.3 + progress.current * 0.55,
      0.04,
    );

    // Matched skills brighten and grow, the rest recede. Driving this per frame
    // rather than through props makes a filter change a transition, not a jump.
    for (const child of group.current.children) {
      const sprite = child as THREE.Sprite;
      const { matched, baseScale, aspect, level } = sprite.userData as {
        matched: boolean;
        baseScale: number;
        aspect: number;
        level: number;
      };
      const material = sprite.material as THREE.SpriteMaterial;

      // Depth fade. Without it every word sits at the same visual weight and
      // the far side of the sphere reads as a collision rather than as depth.
      sprite.getWorldPosition(worldPosition);
      const depth = THREE.MathUtils.clamp((worldPosition.z + RADIUS) / (RADIUS * 2), 0, 1);
      const depthFade = THREE.MathUtils.lerp(FAR_OPACITY, NEAR_OPACITY, depth * depth);

      const height = THREE.MathUtils.lerp(
        sprite.scale.y,
        baseScale * (matched ? 1 : 0.84) * (0.82 + depth * 0.28),
        0.08,
      );
      sprite.scale.set(height * aspect, height, 1);

      const target = matched ? depthFade : depthFade * 0.22;
      material.opacity = THREE.MathUtils.lerp(material.opacity, target, 0.1);
      material.color.lerp(matched ? (level === 3 ? CORE_COLOR : STRONG_COLOR) : DIM_COLOR, 0.08);
    }
  });

  return (
    <group ref={group}>
      {labels.map((label) => (
        // scale, opacity and color are deliberately not props: they are driven
        // in useFrame, and re-applying them on render would snap the transition.
        <sprite
          key={label.skill.name}
          position={label.position}
          userData={{
            matched: activeRole === null || label.skill.roles.includes(activeRole),
            baseScale: 0.24 + label.skill.level * 0.05,
            aspect: label.aspect,
            level: label.skill.level,
          }}
        >
          <spriteMaterial
            map={label.texture}
            transparent
            depthWrite={false}
            opacity={0}
            color="#a8d0ff"
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export default function SkillCloud({
  skills,
  activeRole,
  progress,
}: {
  skills: Skill[];
  activeRole: RoleId | null;
  progress: RefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      // Far enough back that the widest label still clears the frustum edge
      // when it swings to the side of the sphere.
      camera={{ position: [0, 0, 8.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Cloud skills={skills} activeRole={activeRole} progress={progress} />
    </Canvas>
  );
}
