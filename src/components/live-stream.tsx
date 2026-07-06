import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Txn {
  id: number;
  ago: string;
  store: string;
  product: string;
  amount: number;
  commission: number;
}

const stores = ["朝阳旗舰店", "浦东旗舰店", "深圳南山店", "成都春熙店", "杭州西湖店", "广州天河店"];
const products = [
  "iPhone 16 Pro 256G",
  "MacBook Air M3",
  "AirPods Pro 2",
  "iPad Pro 11",
  "Watch Ultra 2",
  "Vision Pro",
  "Mac mini M4",
];

function makeTxn(id: number): Txn {
  const amount = Math.floor(1200 + Math.random() * 18000);
  return {
    id,
    ago: "刚刚",
    store: stores[Math.floor(Math.random() * stores.length)],
    product: products[Math.floor(Math.random() * products.length)],
    amount,
    commission: Math.floor(amount * (0.03 + Math.random() * 0.05)),
  };
}

export function LiveStream() {
  const [items, setItems] = useState<Txn[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      ...makeTxn(i),
      ago: `${(i + 1) * 8}秒前`,
    })),
  );

  useEffect(() => {
    let next = items.length;
    const interval = setInterval(() => {
      setItems((prev) => {
        const aged = prev.map((p, i) => ({
          ...p,
          ago: i === 0 ? "8秒前" : `${(i + 1) * 8}秒前`,
        }));
        return [{ ...makeTxn(next), ago: "刚刚" }, ...aged].slice(0, 7);
      });
      next += 1;
    }, 2800);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="glass-card flex h-full flex-col rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">实时销售流水</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            live transaction stream
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-[var(--accent-emerald)]/30 bg-[var(--accent-emerald-soft)] px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)] animate-live-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald">Streaming</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1 - i * 0.1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="mb-2 flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
            >
              <div className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {it.ago}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm">
                  <span className="text-muted-foreground">{it.store}</span>
                  <span className="mx-1.5 text-muted-foreground/40">·</span>
                  <span className="text-foreground">{it.product}</span>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  ¥{it.amount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span className="font-mono text-sm">¥{it.commission.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
