import type { ProjectVisual as Variant } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn (in SVG) diagrams standing in for screenshots.
 *
 * A cropped screenshot of an API is a terminal window and a screenshot of a
 * research model is a notebook — a diagram of what the system actually does
 * carries far more signal, stays sharp at any size, and costs no bytes.
 *
 * Colours come from the --c-accent / --c-accent-2 custom properties that the
 * project card sets, so each diagram is drawn in its own card's palette.
 *
 * The flowing dashes are decorative and stop under prefers-reduced-motion via
 * the global animation override in globals.css.
 */

const ACCENT = "stroke-[rgb(var(--c-accent))]";
const ACCENT_FILL = "fill-[rgb(var(--c-accent))]";
const ALT_FILL = "fill-[rgb(var(--c-accent-2))]";
const LABEL = "font-mono text-[7px] uppercase tracking-[0.14em] fill-dim";
const LABEL_ON = "font-mono text-[7px] uppercase tracking-[0.14em] fill-[rgb(var(--c-accent))]";

function Flow({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <>
      <path d={d} className="stroke-line" strokeWidth={1} fill="none" />
      <path
        d={d}
        className={ACCENT}
        strokeWidth={1.25}
        fill="none"
        strokeDasharray="4 58"
        style={{ animation: `dashFlow 3.2s linear ${delay}s infinite` }}
      />
    </>
  );
}

/**
 * Gallagher Command Centre node.
 *
 * Deliberately a generic security-shield glyph rather than the vendor's actual
 * logo — the mark is their trademark, and a portfolio diagram has no business
 * reproducing it. The label carries the identification.
 */
function CommandCentreNode() {
  return (
    <g>
      <rect x="296" y="76" width="92" height="88" rx="10" className="fill-elevated stroke-line" strokeWidth={1} />

      <g transform="translate(342, 106)">
        <path
          d="M0 -18 L15 -12 V2 C15 12 8 18 0 21 C-8 18 -15 12 -15 2 V-12 Z"
          className={cn("fill-[rgb(var(--c-accent)/0.14)]", ACCENT)}
          strokeWidth={1.25}
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-2" r="3.4" className={ACCENT} strokeWidth={1.25} fill="none" />
        <path d="M0 1.4 V8" className={ACCENT} strokeWidth={1.6} strokeLinecap="round" />
      </g>

      <text x="342" y="140" textAnchor="middle" className="font-mono text-[7px] uppercase tracking-[0.1em] fill-muted">
        Gallagher
      </text>
      <text x="342" y="152" textAnchor="middle" className={LABEL_ON}>
        Command centre
      </text>
    </g>
  );
}

function ApiVisual() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="h-full w-full"
      role="img"
      aria-label="Request flow: a client calls the versioned API, which authenticates, validates, and adapts the request before reaching Gallagher Command Centre"
    >
      <rect x="14" y="94" width="72" height="52" rx="8" className="fill-elevated stroke-line" strokeWidth={1} />
      <text x="50" y="115" textAnchor="middle" className={LABEL}>Client</text>
      <text x="50" y="130" textAnchor="middle" className="font-mono text-[8px] fill-muted">JWT</text>

      <Flow d="M86 120 H128" />

      <rect x="128" y="50" width="120" height="140" rx="10" className="fill-surface stroke-[rgb(var(--c-accent)/0.4)]" strokeWidth={1} />
      <text x="188" y="70" textAnchor="middle" className={LABEL_ON}>API /v1</text>
      {[
        { y: 84, label: "auth · rate limit" },
        { y: 108, label: "zod validation" },
        { y: 132, label: "service layer" },
        { y: 156, label: "adapter" },
      ].map((row) => (
        <g key={row.y}>
          <rect x="142" y={row.y} width="92" height="18" rx="4" className="fill-elevated stroke-line" strokeWidth={0.75} />
          <text x="188" y={row.y + 12.5} textAnchor="middle" className="font-mono text-[7px] fill-muted">
            {row.label}
          </text>
        </g>
      ))}

      <Flow d="M248 120 H296" delay={0.9} />
      <text x="272" y="110" textAnchor="middle" className="font-mono text-[6.5px] uppercase tracking-[0.1em] fill-mint">
        mTLS
      </text>

      <CommandCentreNode />

      <g className="opacity-70">
        <path d="M14 206 H386" className="stroke-line" strokeWidth={1} strokeDasharray="2 4" />
        <text x="14" y="220" className={LABEL}>Winston · correlation ids · pii redacted</text>
      </g>
    </svg>
  );
}

function SaasVisual() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label="A guided product flow ending in a one-time payment">
      <rect x="40" y="28" width="320" height="184" rx="12" className="fill-surface stroke-line" strokeWidth={1} />
      <path d="M40 54 H360" className="stroke-line" strokeWidth={1} />
      {[54, 66, 78].map((cx) => (
        <circle key={cx} cx={cx} cy={41} r={3} className="fill-line" />
      ))}

      {[
        { y: 76, w: 150, on: true },
        { y: 102, w: 220, on: true },
        { y: 128, w: 186, on: false },
      ].map((row, index) => (
        <g key={row.y}>
          <circle
            cx={72}
            cy={row.y + 5}
            r={6}
            className={row.on ? cn("fill-[rgb(var(--c-accent)/0.2)]", ACCENT) : "fill-elevated stroke-line"}
            strokeWidth={1}
          />
          {row.on ? (
            <path
              d={`M69 ${row.y + 5} l2.2 2.4 L75 ${row.y + 1.6}`}
              className={ACCENT}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
            />
          ) : null}
          <rect x={90} y={row.y} width={row.w} height={10} rx={5} className={index === 2 ? "fill-line/60" : "fill-elevated"} />
        </g>
      ))}

      <path d="M72 158 H328" className="stroke-line" strokeWidth={1} />

      <rect
        x="72"
        y="172"
        width="118"
        height="26"
        rx="13"
        className={cn("fill-[rgb(var(--c-accent)/0.14)]", "stroke-[rgb(var(--c-accent)/0.45)]")}
        strokeWidth={1}
      />
      <text x="131" y="189" textAnchor="middle" className={LABEL_ON}>Pay once</text>

      <g>
        <rect x="238" y="172" width="90" height="26" rx="13" className="fill-elevated stroke-line" strokeWidth={1} />
        <circle cx="256" cy="185" r="4" className={ALT_FILL} />
        <text x="294" y="189" textAnchor="middle" className="font-mono text-[7px] uppercase tracking-[0.14em] fill-[rgb(var(--c-accent-2))]">
          Live
        </text>
      </g>
    </svg>
  );
}

function MlVisual() {
  const curve = "M40 178 C 96 172, 128 150, 168 132 S 246 96, 296 66 T 360 44";
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label="Model accuracy improving from 86 percent to 94 percent, with feature importance weights below">
      {[44, 78, 112, 146, 180].map((y) => (
        <path key={y} d={`M40 ${y} H360`} className="stroke-line" strokeWidth={0.75} strokeDasharray="2 5" />
      ))}
      <path d="M40 26 V196 H364" className="stroke-lineStrong" strokeWidth={1} fill="none" />

      <path d={`${curve} L360 196 L40 196 Z`} className="fill-[rgb(var(--c-accent)/0.1)]" stroke="none" />
      <path d={curve} className={ACCENT} strokeWidth={1.75} fill="none" strokeLinecap="round" />

      <circle cx="40" cy="178" r="4" className="fill-bg stroke-muted" strokeWidth={1.5} />
      <text x="50" y="172" className="font-mono text-[8px] fill-muted">86%</text>

      <circle cx="360" cy="44" r="4.5" className={ACCENT_FILL} />
      <circle cx="360" cy="44" r="9" className={cn("fill-none", "stroke-[rgb(var(--c-accent)/0.4)]")} strokeWidth={1} />
      <text x="352" y="32" textAnchor="end" className="font-mono text-[9px] fill-[rgb(var(--c-accent))]">94%</text>

      <g>
        <text x="40" y="222" className={LABEL}>Shap feature weight</text>
        {[
          { x: 168, w: 58 },
          { x: 234, w: 40 },
          { x: 282, w: 28 },
          { x: 318, w: 18 },
        ].map((bar, index) => (
          <rect key={bar.x} x={bar.x} y="212" width={bar.w} height="7" rx="3.5" className={index === 0 ? ALT_FILL : "fill-line"} />
        ))}
      </g>
    </svg>
  );
}

function MapVisual() {
  // A coarse dot field with a handful of "visited" countries lit up.
  const dots: Array<{ x: number; y: number }> = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 20; col += 1) {
      dots.push({ x: 28 + col * 17.5, y: 46 + row * 16 });
    }
  }
  const lit = new Map<number, string>([
    [25, "a"], [27, "b"], [46, "a"], [68, "c"], [71, "b"], [93, "a"],
    [104, "c"], [126, "b"], [131, "a"], [148, "c"], [152, "b"], [165, "a"],
  ]);

  const toneClass = (tone: string | undefined) =>
    tone === "a" ? ACCENT_FILL : tone === "b" ? ALT_FILL : "fill-muted";

  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label="A world map grid with each family member's visited countries highlighted in their own colour">
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={lit.has(index) ? 3.2 : 1.5}
          className={lit.has(index) ? toneClass(lit.get(index)) : "fill-line"}
        />
      ))}

      <g>
        {[
          { x: 28, label: "Ava", tone: "a" },
          { x: 96, label: "Ben", tone: "b" },
          { x: 164, label: "Cass", tone: "c" },
        ].map((legend) => (
          <g key={legend.label}>
            <circle cx={legend.x + 4} cy={216} r={3.5} className={toneClass(legend.tone)} />
            <text x={legend.x + 14} y={219} className="font-mono text-[8px] fill-muted">
              {legend.label}
            </text>
          </g>
        ))}
        <text x="286" y="219" className={LABEL}>Postgres</text>
      </g>
    </svg>
  );
}

function DroneVisual() {
  const joints = [
    { x: 58, y: 150 },
    { x: 76, y: 122 },
    { x: 70, y: 96 },
    { x: 94, y: 106 },
    { x: 100, y: 78 },
    { x: 116, y: 122 },
  ];

  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label="A recognised hand gesture sent over ROS2 and WebSockets to a Tello drone">
      <g>
        {joints.slice(1).map((joint, index) => (
          <path key={index} d={`M${joints[0].x} ${joints[0].y} L${joint.x} ${joint.y}`} className="stroke-line" strokeWidth={1} />
        ))}
        {joints.map((joint, index) => (
          <circle key={index} cx={joint.x} cy={joint.y} r={index === 0 ? 4 : 3} className={ACCENT_FILL} />
        ))}
        <text x="52" y="180" className={LABEL}>Keras</text>
      </g>

      <Flow d="M150 118 H236" />
      <text x="193" y="106" textAnchor="middle" className={LABEL_ON}>ros2 · ws</text>

      <g>
        <circle cx="316" cy="118" r="13" className="fill-elevated stroke-lineStrong" strokeWidth={1} />
        {[
          [286, 90],
          [346, 90],
          [286, 146],
          [346, 146],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <path d={`M316 118 L${cx} ${cy}`} className="stroke-lineStrong" strokeWidth={1.25} />
            <circle cx={cx} cy={cy} r="11" className={cn("fill-none", "stroke-[rgb(var(--c-accent-2)/0.7)]")} strokeWidth={1.25} />
            <circle cx={cx} cy={cy} r="3" className={ALT_FILL} />
          </g>
        ))}
        <text x="316" y="182" textAnchor="middle" className={LABEL}>Tello</text>
      </g>
    </svg>
  );
}

function IotVisual() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-label="A sensor event on a Raspberry Pi triggering an email alert through IFTTT">
      <rect x="34" y="86" width="86" height="68" rx="6" className="fill-elevated stroke-line" strokeWidth={1} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
        <rect key={index} x={42 + index * 9} y="92" width="4" height="9" rx="1" className="fill-lineStrong" />
      ))}
      <rect x="52" y="112" width="50" height="26" rx="3" className="fill-surface stroke-lineStrong" strokeWidth={0.75} />
      <text x="77" y="129" textAnchor="middle" className="font-mono text-[7px] fill-muted">Pi 4</text>
      <text x="34" y="172" className={LABEL}>Sensor loop</text>

      {[16, 28, 40].map((r, index) => (
        <circle
          key={r}
          cx="200"
          cy="120"
          r={r}
          className={cn("fill-none", ACCENT)}
          strokeWidth={1}
          opacity={0.5 - index * 0.13}
          // fill-box + centre origin makes the ring scale about its own centre
          // rather than the SVG's top-left corner.
          style={{
            animation: `ping 2.6s ease-out ${index * 0.5}s infinite`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      ))}
      <circle cx="200" cy="120" r="5" className={ACCENT_FILL} />

      <g>
        <rect x="288" y="98" width="80" height="52" rx="6" className="fill-elevated stroke-line" strokeWidth={1} />
        <path d="M288 104 L328 130 L368 104" className={cn("stroke-[rgb(var(--c-accent-2))]")} strokeWidth={1.25} fill="none" />
        <circle cx="366" cy="102" r="6" className={ALT_FILL} />
        <text x="288" y="172" className={LABEL}>Ifttt alert</text>
      </g>
    </svg>
  );
}

const variants: Record<Variant, () => React.ReactElement> = {
  api: ApiVisual,
  saas: SaasVisual,
  ml: MlVisual,
  map: MapVisual,
  drone: DroneVisual,
  iot: IotVisual,
};

export function ProjectVisual({ variant, className }: { variant: Variant; className?: string }) {
  const Visual = variants[variant];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-[radial-gradient(ellipse_at_50%_0%,rgb(var(--c-accent)/0.1),transparent_62%)]",
        className,
      )}
    >
      <Visual />
    </div>
  );
}
