import { motion } from "framer-motion";

export default function AnimateFadeOut({
  children,
  speed,
  once
}: {
  children: any;
  speed?: number;
  once?: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: speed ?? 0.7 }}
      >
        {children}
      </motion.div>
    </>
  );
}
