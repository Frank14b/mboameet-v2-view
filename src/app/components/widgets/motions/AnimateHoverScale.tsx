import { motion } from "framer-motion";

export type AnimateHoverScaleProps = {
  children: any;
  index?: number;
  active?: boolean;
  duration?: number;
};

export default function AnimateHoverScale({
  children,
  index = 0,
  active = true,
  duration = 0.7,
}: AnimateHoverScaleProps) {
  return active ? (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      transition={{ duration: duration ?? 0.2 + index / 10 }}
      whileHover={{ scale: 1.02 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  ) : (
    <>{children}</>
  );
}
