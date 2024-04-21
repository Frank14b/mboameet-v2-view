import { motion } from "framer-motion";

export default function AnimateSlideInLeft({
  children,
  speed,
  once,
}: {
  children: any;
  speed?: number;
  once?: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginLeft: "100%" }}
        animate={{ opacity: 1, marginLeft: 0 }}
        transition={{ duration: speed ?? 0.7 }}
      >
        {children}
      </motion.div>
    </>
  );
}
