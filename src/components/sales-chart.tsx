import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "周一", sales: 128000, orders: 342 },
  { day: "周二", sales: 156000, orders: 401 },
  { day: "周三", sales: 142000, orders: 378 },
  { day: "周四", sales: 189000, orders: 512 },
  { day: "周五", sales: 234000, orders: 623 },
  { day: "周六", sales: 298000, orders: 782 },
  { day: "周日", sales: 267000, orders: 701 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: (typeof data)[number] }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-lg px-3 py-2.5 text-xs shadow-xl"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" />
        <span className="text-muted-foreground">销售额</span>
        <span className="font-mono text-foreground">¥{p.sales.toLocaleString()}</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="text-muted-foreground">订单数</span>
        <span className="font-mono text-foreground">{p.orders}</span>
      </div>
    </motion.div>
  );
}

export function SalesChart() {
  return (
    <div className="glass-card flex h-full flex-col rounded-xl p-5">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold">本周销售走势</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            weekly sales · realtime sync
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_8px_var(--accent-emerald)]" />
            <span className="text-muted-foreground">销售额</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="text-muted-foreground">订单数</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-emerald)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--grid-line)" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="var(--muted-foreground)"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip
              cursor={{ stroke: "var(--accent-emerald)", strokeWidth: 1, strokeDasharray: "4 4", strokeOpacity: 0.4 }}
              content={<ChartTooltip />}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="none"
              fill="url(#salesFill)"
              isAnimationActive
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Overlaid animated flow line */}
        <div className="pointer-events-none -mt-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--accent-emerald)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--background)", stroke: "var(--accent-emerald)", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "var(--accent-emerald)", stroke: "var(--background)", strokeWidth: 2 }}
                className="flow-line"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
