"use client";

/**
 * Interactive 3D "dollhouse" of the Divine Home Stay 2BHK.
 * Stylised (not to scale) — built from primitives so it ships with no model files.
 * Plan coordinates are in metres: x → right (0–14), z → front-to-back (balcony at z<0, main door at z=8.5).
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { rooms, type RoomId } from "@/data/homestay";

type Rect = [x0: number, z0: number, x1: number, z1: number];
type V3 = [number, number, number];

const OFFSET: V3 = [-7, 0, -3.5]; // centres the flat on the origin
const WALL_H = 1.35;
const WALL_T = 0.12;

const roomRects: Record<RoomId, Rect> = {
  bedroom1: [0, 0, 4.5, 5],
  living: [4.5, 0, 9.5, 5],
  bedroom2: [9.5, 0, 14, 5],
  bath1: [0, 5, 2.4, 8.5],
  entrance: [2.4, 5, 4.5, 8.5],
  dining: [4.5, 5, 7.5, 8.5],
  kitchen: [7.5, 5, 11.6, 8.5],
  bath2: [11.6, 5, 14, 8.5],
  balcony: [4.5, -1.6, 9.5, 0],
};

const floorColors: Record<RoomId, string> = {
  bedroom1: "#eadfcb",
  living: "#f5eee2",
  bedroom2: "#eadfcb",
  bath1: "#dde5e8",
  entrance: "#efe7da",
  dining: "#f5eee2",
  kitchen: "#ece3d3",
  bath2: "#dde5e8",
  balcony: "#d9c4a4",
};

const walls: Rect[] = [
  // exterior
  [0, 0, 4.5, 0], [4.5, 0, 6.2, 0], [7.8, 0, 9.5, 0], [9.5, 0, 14, 0],
  [0, 0, 0, 8.5], [14, 0, 14, 8.5],
  [0, 8.5, 2.9, 8.5], [4.1, 8.5, 14, 8.5],
  // interior
  [4.5, 0, 4.5, 3.8], [9.5, 0, 9.5, 3.8],
  [0, 5, 0.8, 5], [1.6, 5, 4.5, 5],
  [2.4, 5, 2.4, 8.5], [4.5, 6.4, 4.5, 8.5],
  [9.5, 5, 12.4, 5], [13.2, 5, 14, 5],
  [7.5, 6.8, 7.5, 8.5], [11.6, 5, 11.6, 8.5],
];

const railings: Rect[] = [[4.5, -1.6, 9.5, -1.6], [4.5, -1.6, 4.5, 0], [9.5, -1.6, 9.5, 0]];

function centerOf(id: RoomId): V3 {
  const [x0, z0, x1, z1] = roomRects[id];
  return [(x0 + x1) / 2 + OFFSET[0], 0, (z0 + z1) / 2 + OFFSET[2]];
}

const easeOutBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------- building blocks ---------- */

function Box({ p, s, c, emissive, opacity, rough = 0.7 }: { p: V3; s: V3; c: string; emissive?: string; opacity?: number; rough?: number }) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial
        color={c}
        roughness={rough}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? 1.4 : 0}
        transparent={opacity !== undefined}
        opacity={opacity ?? 1}
      />
    </mesh>
  );
}

/** Grows walls up from the floor, or drops furniture in, after `delay` seconds. */
function Intro({ delay, mode = "drop", children }: { delay: number; mode?: "grow" | "drop"; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const done = useRef(false);
  useFrame(({ clock }) => {
    if (!ref.current || done.current) return;
    const t = THREE.MathUtils.clamp((clock.elapsedTime - delay) / 0.9, 0, 1);
    if (mode === "grow") {
      ref.current.scale.y = Math.max(0.001, easeOutCubic(t));
    } else {
      ref.current.position.y = (1 - easeOutBack(t)) * 3;
      ref.current.visible = t > 0;
    }
    if (t >= 1) done.current = true;
  });
  return <group ref={ref} scale={mode === "grow" ? [1, 0.001, 1] : 1} visible={mode === "grow"}>{children}</group>;
}

function Wall({ r, h = WALL_H, color = "#f7f0e4", cap = "#7B1E1E" }: { r: Rect; h?: number; color?: string; cap?: string }) {
  const [x0, z0, x1, z1] = r;
  const horizontal = z0 === z1;
  const len = horizontal ? Math.abs(x1 - x0) : Math.abs(z1 - z0);
  const size: V3 = horizontal ? [len + WALL_T, h, WALL_T] : [WALL_T, h, len + WALL_T];
  const pos: V3 = [(x0 + x1) / 2, h / 2, (z0 + z1) / 2];
  return (
    <group>
      <Box p={pos} s={size} c={color} />
      <Box p={[pos[0], h + 0.02, pos[2]]} s={[size[0] + 0.01, 0.04, size[2] + 0.01]} c={cap} />
    </group>
  );
}

function Bed({ x, z, headAt }: { x: number; z: number; headAt: "left" | "right" }) {
  const dir = headAt === "left" ? -1 : 1;
  return (
    <group position={[x, 0, z]}>
      <Box p={[0, 0.2, 0]} s={[2.1, 0.4, 2.0]} c="#2a2526" />
      <Box p={[0, 0.5, 0]} s={[2.0, 0.22, 1.92]} c="#ffffff" rough={0.95} />
      <Box p={[dir * 1.07, 0.75, 0]} s={[0.1, 1.0, 2.05]} c="#1f1b1c" />
      <Box p={[dir * 1.01, 0.82, 0]} s={[0.04, 0.6, 1.8]} c="#f4f1ec" rough={0.9} />
      {[-0.6, -0.2, 0.2, 0.6].map((pz) => (
        <Box key={pz} p={[dir * 0.78, 0.68, pz]} s={[0.28, 0.14, 0.36]} c="#fbfbfb" rough={1} />
      ))}
      {/* bedside tables */}
      <Box p={[dir * 0.9, 0.25, 1.3]} s={[0.4, 0.5, 0.4]} c="#3a2a22" />
      <Box p={[dir * 0.9, 0.25, -1.3]} s={[0.4, 0.5, 0.4]} c="#3a2a22" />
    </group>
  );
}

function Armchair({ x, z, rot = 0 }: { x: number; z: number; rot?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <Box p={[0, 0.22, 0]} s={[0.8, 0.44, 0.8]} c="#6b4f3f" rough={1} />
      <Box p={[0, 0.6, -0.32]} s={[0.8, 0.5, 0.16]} c="#5e4436" rough={1} />
      <Box p={[-0.36, 0.5, 0]} s={[0.12, 0.2, 0.8]} c="#5e4436" rough={1} />
      <Box p={[0.36, 0.5, 0]} s={[0.12, 0.2, 0.8]} c="#5e4436" rough={1} />
    </group>
  );
}

function Plant({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.4, 16]} />
        <meshStandardMaterial color="#8a8f94" />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial color="#3f7d3a" flatShading />
      </mesh>
    </group>
  );
}

function Toilet({ x, z, rot = 0 }: { x: number; z: number; rot?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.2, 0.1]} castShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.4, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <Box p={[0, 0.5, -0.2]} s={[0.4, 0.4, 0.18]} c="#ffffff" rough={0.2} />
    </group>
  );
}

function Basin({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 0.8, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <Box p={[0, 0.85, 0]} s={[0.5, 0.12, 0.4]} c="#ffffff" rough={0.2} />
    </group>
  );
}

function Pendant({ x, z, y = 1.9 }: { x: number; z: number; y?: number }) {
  return (
    <group position={[x, y, z]}>
      <Box p={[0, 0.35, 0]} s={[0.01, 0.6, 0.01]} c="#222222" />
      <Box p={[0, 0, 0]} s={[0.16, 0.2, 0.16]} c="#fff1cc" emissive="#ffb347" />
    </group>
  );
}

function Temple() {
  // Stylised nagara shikhara for the BHU Shri Vishwanath Temple, seen beyond the balcony.
  return (
    <group position={[7, 0, -15]}>
      <Box p={[0, 0.25, 0]} s={[5, 0.5, 5]} c="#e9dcc4" />
      <Box p={[0, 1.3, 0]} s={[3, 1.6, 3]} c="#f3ead8" />
      <mesh position={[0, 4.4, 0]} castShadow>
        <cylinderGeometry args={[0.3, 1.45, 4.6, 8]} />
        <meshStandardMaterial color="#f6eedd" flatShading />
      </mesh>
      {[[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]].map(([px, pz]) => (
        <mesh key={`${px}${pz}`} position={[px, 3, pz]} castShadow>
          <cylinderGeometry args={[0.12, 0.5, 1.8, 8]} />
          <meshStandardMaterial color="#f1e6cf" flatShading />
        </mesh>
      ))}
      <mesh position={[0, 6.9, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.25} emissive="#7a5a00" emissiveIntensity={0.4} />
      </mesh>
      <Box p={[0, 7.6, 0]} s={[0.03, 1.2, 0.03]} c="#5a3a1a" />
      <Box p={[0.3, 7.95, 0]} s={[0.6, 0.35, 0.02]} c="#E8751A" emissive="#E8751A" />
    </group>
  );
}

function Trees() {
  const trees = useMemo(() => {
    const list: Array<{ p: V3; s: number }> = [];
    let seed = 7;
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 26; i++) {
      const x = -6 + rand() * 26;
      const z = -4 - rand() * 16;
      if (Math.abs(x - 7) < 3.4) continue; // keep the balcony→temple sightline clear
      list.push({ p: [x, 0, z], s: 0.7 + rand() * 0.9 });
    }
    return list;
  }, []);
  return (
    <>
      {trees.map(({ p, s }, i) => (
        <group key={i} position={p} scale={s}>
          <Box p={[0, 0.5, 0]} s={[0.15, 1, 0.15]} c="#6b4a2f" />
          <mesh position={[0, 1.4, 0]} castShadow>
            <icosahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color={i % 2 ? "#5b8f4a" : "#4c7d3f"} flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ---------- rooms & furniture ---------- */

function RoomFloor({ id, active, onHover, onSelect }: { id: RoomId; active: boolean; onHover: (id: RoomId | null) => void; onSelect: (id: RoomId) => void }) {
  const [x0, z0, x1, z1] = roomRects[id];
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const base = useMemo(() => new THREE.Color(floorColors[id]), [id]);
  const glow = useMemo(() => new THREE.Color("#F4A623"), []);
  useFrame((_, dt) => {
    if (!mat.current) return;
    const target = active ? base.clone().lerp(glow, 0.55) : base;
    mat.current.color.lerp(target, 1 - Math.pow(0.002, dt));
  });
  return (
    <mesh
      position={[(x0 + x1) / 2, 0.01, (z0 + z1) / 2]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); onHover(id); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = ""; }}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(id); }}
    >
      <planeGeometry args={[x1 - x0, z1 - z0]} />
      <meshStandardMaterial ref={mat} color={floorColors[id]} roughness={0.35} metalness={0.05} />
    </mesh>
  );
}

function Furniture() {
  return (
    <>
      {/* Master bedroom */}
      <Intro delay={1.1}><Bed x={1.2} z={2.3} headAt="left" /></Intro>
      <Intro delay={1.25}>
        <Box p={[3.5, 0.8, 0.45]} s={[1.1, 1.6, 0.6]} c="#1c1a1d" rough={0.4} />
        <Armchair x={3.6} z={3.4} rot={-Math.PI / 2} />
        <Box p={[1.4, 1.15, 0.12]} s={[0.9, 0.28, 0.2]} c="#fdfdfd" rough={0.3} />
      </Intro>

      {/* Living room */}
      <Intro delay={1.4}>
        <Box p={[5.2, 0.22, 2.3]} s={[0.9, 0.44, 2.4]} c="#6b4f3f" rough={1} />
        <Box p={[4.82, 0.62, 2.3]} s={[0.18, 0.5, 2.4]} c="#5e4436" rough={1} />
        <Box p={[5.2, 0.5, 1.05]} s={[0.9, 0.2, 0.14]} c="#5e4436" rough={1} />
        <Box p={[5.2, 0.5, 3.55]} s={[0.9, 0.2, 0.14]} c="#5e4436" rough={1} />
        <Armchair x={7.1} z={4.2} rot={Math.PI} />
      </Intro>
      <Intro delay={1.55}>
        <Box p={[6.8, 0.38, 2.3]} s={[0.9, 0.04, 1.3]} c="#bfe3ea" opacity={0.55} rough={0.05} />
        <Box p={[6.8, 0.18, 2.3]} s={[0.8, 0.36, 1.2]} c="#4a3426" />
        {/* backlit TV wall */}
        <Box p={[9.38, 0.68, 2.2]} s={[0.08, 1.3, 2.8]} c="#7a4a24" />
        <Box p={[9.32, 0.72, 2.2]} s={[0.04, 0.9, 1.8]} c="#f2eee8" emissive="#ffb347" />
        <Box p={[9.29, 0.78, 2.2]} s={[0.03, 0.5, 0.95]} c="#0d0d0f" rough={0.2} />
        <Box p={[9.18, 0.3, 2.2]} s={[0.3, 0.14, 1.6]} c="#1d8a9a" />
        <Plant x={5.0} z={0.5} />
        <Pendant x={6.4} z={1.6} />
        <Pendant x={6.8} z={2.2} y={1.8} />
        <Pendant x={7.2} z={1.8} y={2.0} />
      </Intro>

      {/* Second bedroom */}
      <Intro delay={1.7}><Bed x={12.85} z={2.5} headAt="right" /></Intro>
      <Intro delay={1.85}>
        <Box p={[11, 1.0, 0.12]} s={[0.7, 0.45, 0.3]} c="#f6f6f6" rough={0.3} />
        <Box p={[11, 1.0, 0.04]} s={[0.85, 0.6, 0.06]} c="#1b8c9c" />
        <Armchair x={10.3} z={4.1} rot={Math.PI / 2} />
      </Intro>

      {/* Dining */}
      <Intro delay={2.0}>
        <Box p={[6.0, 0.72, 6.8]} s={[1.0, 0.06, 1.9]} c="#d9c7a3" />
        <Box p={[6.0, 0.36, 6.8]} s={[0.8, 0.7, 1.6]} c="#4a3426" />
        {[6.1, 6.8, 7.5].flatMap((cz) => [
          <group key={`l${cz}`} position={[5.25, 0, cz]}>
            <Box p={[0, 0.24, 0]} s={[0.42, 0.48, 0.42]} c="#1f2a44" />
            <Box p={[-0.18, 0.75, 0]} s={[0.06, 0.6, 0.42]} c="#e9edf5" />
          </group>,
          <group key={`r${cz}`} position={[6.75, 0, cz]}>
            <Box p={[0, 0.24, 0]} s={[0.42, 0.48, 0.42]} c="#1f2a44" />
            <Box p={[0.18, 0.75, 0]} s={[0.06, 0.6, 0.42]} c="#e9edf5" />
          </group>,
        ])}
      </Intro>

      {/* Kitchen */}
      <Intro delay={2.15}>
        <Box p={[9.55, 0.43, 8.13]} s={[3.9, 0.86, 0.6]} c="#1b8c9c" rough={0.4} />
        <Box p={[9.55, 0.88, 8.13]} s={[3.92, 0.05, 0.64]} c="#7a3b2a" rough={0.3} />
        <Box p={[11.23, 0.43, 6.6]} s={[0.6, 0.86, 2.4]} c="#1b8c9c" rough={0.4} />
        <Box p={[11.23, 0.88, 6.6]} s={[0.64, 0.05, 2.42]} c="#7a3b2a" rough={0.3} />
        <Box p={[8.3, 1.07, 8.15]} s={[0.55, 0.32, 0.42]} c="#121214" rough={0.3} />
        <Box p={[9.4, 0.92, 8.13]} s={[0.4, 0.03, 0.38]} c="#0b0b0b" rough={0.15} />
        <Box p={[10.6, 1.15, 8.4]} s={[0.36, 0.46, 0.12]} c="#fafafa" rough={0.3} />
        <Box p={[10.6, 1.15, 8.33]} s={[0.06, 0.34, 0.02]} c="#1d4ed8" emissive="#1d4ed8" />
      </Intro>

      {/* Bathrooms & entrance */}
      <Intro delay={2.3}>
        <Toilet x={0.45} z={7.9} rot={Math.PI / 2} />
        <Basin x={2.0} z={7.9} />
        <Box p={[0.12, 1.05, 6.2]} s={[0.12, 0.4, 0.3]} c="#ffffff" rough={0.3} />
        <Toilet x={13.55} z={7.9} rot={-Math.PI / 2} />
        <Basin x={12.0} z={7.9} />
        <Box p={[13.88, 1.05, 6.2]} s={[0.12, 0.4, 0.3]} c="#ffffff" rough={0.3} />
        <Basin x={2.75} z={5.5} />
        <Box p={[3.5, 0.95, 8.85]} s={[1.1, 1.9, 0.06]} c="#8a4a22" />
      </Intro>

      {/* Balcony */}
      <Intro delay={2.45}>
        <Plant x={4.9} z={-1.2} scale={0.8} />
        <Plant x={9.1} z={-1.2} scale={0.8} />
        <Armchair x={6.4} z={-0.8} rot={Math.PI} />
        <Armchair x={7.6} z={-0.8} rot={Math.PI} />
      </Intro>
    </>
  );
}

/* ---------- camera ---------- */

function CameraRig({ selected, interacted }: { selected: RoomId | null; interacted: React.MutableRefObject<boolean> }) {
  const { camera, controls, size } = useThree();
  const animating = useRef(true);
  const wide = size.width / size.height;

  const goal = useMemo(() => {
    const far = wide < 1 ? 1.8 : wide < 1.4 ? 1.0 : 0.9;
    if (!selected) return { target: new THREE.Vector3(0, 0, -0.5), pos: new THREE.Vector3(9 * far, 11 * far, 13 * far) };
    const c = new THREE.Vector3(...centerOf(selected));
    if (selected === "balcony") return { target: new THREE.Vector3(0, 2.5, -12), pos: new THREE.Vector3(0.2, 2.6, 2) };
    const d = (wide < 1 ? 1.6 : 1) * 1.15;
    return { target: c, pos: c.clone().add(new THREE.Vector3(3.2 * d, 6.2 * d, 5.4 * d)) };
  }, [selected, wide]);

  useEffect(() => {
    animating.current = true;
    interacted.current = false;
  }, [goal, interacted]);

  useFrame((_, dt) => {
    const ctl = controls as unknown as OrbitControlsImpl | null;
    if (!ctl || !animating.current) return;
    if (interacted.current && !selected) {
      animating.current = false;
      return;
    }
    const k = 1 - Math.pow(0.02, dt);
    camera.position.lerp(goal.pos, k);
    ctl.target.lerp(goal.target, k);
    ctl.update();
    if (camera.position.distanceTo(goal.pos) < 0.03) animating.current = false;
  });

  useEffect(() => {
    const ctl = controls as unknown as OrbitControlsImpl | null;
    if (!ctl) return;
    const stop = () => {
      animating.current = false;
    };
    ctl.addEventListener("start", stop);
    return () => ctl.removeEventListener("start", stop);
  }, [controls]);

  return null;
}

/* ---------- labels ---------- */

function RoomLabel({ id, active, onSelect }: { id: RoomId; active: boolean; onSelect: (id: RoomId) => void }) {
  const room = rooms.find((r) => r.id === id)!;
  const [x, , z] = centerOf(id);
  const short = room.name.replace(/ —.*$/, "").replace("& Wash Area", "");
  return (
    <Html position={[x - OFFSET[0], WALL_H + 0.6, z - OFFSET[2]]} center zIndexRange={[30, 0]}>
      <button
        type="button"
        onClick={() => onSelect(id)}
        className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-md backdrop-blur transition-all ${
          active ? "scale-110 border-saffron bg-saffron text-white" : "border-white/70 bg-white/85 text-maroon hover:bg-white"
        }`}
      >
        <span aria-hidden="true">{room.icon}</span> {short}
      </button>
    </Html>
  );
}

/* ---------- main ---------- */

export default function FlatTour3D({ selected, onSelect }: { selected: RoomId | null; onSelect: (id: RoomId | null) => void }) {
  const [hovered, setHovered] = useState<RoomId | null>(null);
  const interacted = useRef(false);
  const ids = Object.keys(roomRects) as RoomId[];

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [22, 26, 30], fov: 38, near: 0.1, far: 200 }}
      onPointerMissed={() => onSelect(null)}
    >
      <color attach="background" args={["#fdf6ec"]} />
      <fog attach="fog" args={["#fdf6ec", 30, 70]} />
      <hemisphereLight args={["#fff7e8", "#c9b08a", 0.9]} />
      <directionalLight
        position={[12, 20, 8]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <pointLight position={[2.4, 1.6, -1.3]} intensity={6} distance={6} color="#ffb347" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -4]} receiveShadow>
        <circleGeometry args={[60, 48]} />
        <meshStandardMaterial color="#efe3cc" />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={30} blur={2.4} far={6} />

      <group position={OFFSET}>
        {ids.map((id) => (
          <RoomFloor key={id} id={id} active={hovered === id || selected === id} onHover={setHovered} onSelect={onSelect} />
        ))}
        <Intro delay={0.2} mode="grow">
          {walls.map((r, i) => <Wall key={i} r={r} />)}
          {railings.map((r, i) => <Wall key={`r${i}`} r={r} h={0.7} color="#cfd8dc" cap="#8a6d3b" />)}
        </Intro>
        <Furniture />
        <Intro delay={2.6}>
          <Temple />
          <Trees />
        </Intro>
        {ids.map((id) => (
          <RoomLabel key={id} id={id} active={hovered === id || selected === id} onSelect={onSelect} />
        ))}
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.15}
        autoRotate={!selected}
        autoRotateSpeed={0.5}
        onStart={() => (interacted.current = true)}
      />
      <CameraRig selected={selected} interacted={interacted} />
    </Canvas>
  );
}
