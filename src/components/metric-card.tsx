import { motion } from "framer-motion";
import { CountUp } from "./count-up";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
  hint?: string;
  index?: number;
}

export function MetricCard({
  label,
  value,
  prefix,
  suffix,
  decimals,
  delta,
  deltaPositive = true,
  icon: Icon,
  hint,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="glass-card group relative overflow-hidden rounded-xl p-5"
    >
      {/* scan sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-sweep" />
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-75 animate-live-pulse" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald">Live</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-emerald-soft)] text-emerald">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{hint}</span>
        <span
          className={[
            "font-mono",
            deltaPositive ? "text-emerald" : "text-destructive",
          ].join(" ")}
        >
          {deltaPositive ? "▲" : "▼"} {delta}
        </span>
      </div>
    </motion.div>
  );
}
