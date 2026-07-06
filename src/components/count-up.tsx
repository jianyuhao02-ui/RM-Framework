import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({ value, duration = 1.6, prefix = "", suffix = "", decimals = 0 }: Props) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => {
    const n = decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toString();
    // Thousand separators
    const [int, dec] = n.split(".");
    return `${prefix}${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${dec ? "." + dec : ""}${suffix}`;
  });
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, duration, mv, rounded]);

  return <motion.span className="font-mono tabular-nums">{text}</motion.span>;
}
