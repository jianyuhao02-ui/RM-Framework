import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  Boxes,
  Wallet,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";

const items = [
  { title: "销售总览", url: "/", icon: LayoutDashboard, enabled: true },
  { title: "门店销售", url: "/stores", icon: Store, enabled: false },
  { title: "库存周转", url: "/inventory", icon: Boxes, enabled: false },
  { title: "提成统计", url: "/commission", icon: Wallet, enabled: false },
  { title: "账号权限", url: "/access", icon: ShieldCheck, enabled: false },
  { title: "计算引擎配置", url: "/engine", icon: Cpu, enabled: false },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="fixed inset-y-4 left-4 z-30 hidden w-60 md:block">
      <div className="glass-card flex h-full flex-col rounded-2xl p-4">
        {/* Brand */}
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-emerald-soft)] text-emerald">
            <Terminal className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--accent-emerald)] animate-live-pulse" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">RetailOps</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              v1.4.0 · private
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const active = item.enabled && pathname === item.url;
            const Icon = item.icon;
            const content = (
              <motion.div
                whileHover={item.enabled ? { x: 2 } : undefined}
                className={[
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-[var(--accent-emerald-soft)] text-foreground"
                    : item.enabled
                      ? "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      : "cursor-not-allowed text-muted-foreground/50",
                ].join(" ")}
              >
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-[var(--accent-emerald)]"
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{item.title}</span>
                {!item.enabled && (
                  <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
                    待配置
                  </span>
                )}
              </motion.div>
            );
            return item.enabled ? (
              <Link key={item.title} to={item.url}>
                {content}
              </Link>
            ) : (
              <div key={item.title} aria-disabled>
                {content}
              </div>
            );
          })}
        </nav>

        {/* Footer status */}
        <div className="mt-4 rounded-lg border border-white/5 bg-black/20 p-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-mono">节点状态</span>
            <span className="flex items-center gap-1.5 text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] animate-live-pulse" />
              在线
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[11px]">
            <span className="text-muted-foreground">延迟</span>
            <span className="text-foreground">12ms</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
