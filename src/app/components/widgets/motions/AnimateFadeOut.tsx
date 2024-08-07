import { motion } from "framer-motion";

export type AnimateFadeOutProps = {
  children: any;
  speed?: number;
  once?: boolean;
};

export default function AnimateFadeOut({
  children,
  speed,
  once,
}: AnimateFadeOutProps) {
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
