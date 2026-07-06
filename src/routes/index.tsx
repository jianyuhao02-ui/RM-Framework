import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Wallet, Users } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { MetricCard } from "@/components/metric-card";
import { LiveStream } from "@/components/live-stream";
import { SalesChart } from "@/components/sales-chart";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const now = new Date();
  const timeStr = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative min-h-screen bg-grid">
      <AppSidebar />

      <main className="min-h-screen px-6 pb-10 pt-6 md:pl-72">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">
              <span className="h-1 w-8 bg-[var(--accent-emerald)]" />
              dashboard / overview
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">销售总览</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              全渠道实时数据聚合 · 提成引擎正在自动计算
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground">
              <span className="text-emerald">SYS_TIME</span>
              <span className="mx-2 text-white/20">|</span>
              {timeStr}
            </div>
            <div className="glass-card flex items-center gap-2 rounded-lg px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-emerald-soft)] text-emerald text-xs font-semibold">
                Z
              </div>
              <div className="leading-tight">
                <div className="text-xs">Zhang Wei</div>
                <div className="font-mono text-[10px] text-muted-foreground">经销商 · 总部</div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Metrics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Sales"
            value={2874650}
            prefix="¥"
            delta="18.6%"
            deltaPositive
            icon={DollarSign}
            hint="较上周"
            index={0}
          />
          <MetricCard
            label="Today Orders"
            value={1284}
            delta="12.3%"
            deltaPositive
            icon={ShoppingCart}
            hint="较昨日"
            index={1}
          />
          <MetricCard
            label="Realtime Commission"
            value={186420}
            prefix="¥"
            delta="8.9%"
            deltaPositive
            icon={Wallet}
            hint="本月累计"
            index={2}
          />
          <MetricCard
            label="Active Stores"
            value={42}
            suffix=" / 48"
            delta="2 家离线"
            deltaPositive={false}
            icon={Users}
            hint="节点在线率"
            index={3}
          />
        </section>

        {/* Chart + stream */}
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="xl:col-span-2"
          >
            <SalesChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <LiveStream />
          </motion.div>
        </section>

        {/* Footer strip */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 bg-black/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
        >
          <span>© retailops · private deployment</span>
          <div className="flex items-center gap-4">
            <span>build: 2026.07.06</span>
            <span className="flex items-center gap-1.5 text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] animate-live-pulse" />
              engine online
            </span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
