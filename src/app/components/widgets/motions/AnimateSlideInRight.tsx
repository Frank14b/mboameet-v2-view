import { motion } from "framer-motion";

export default function AnimateSlideInRight({ children }: { children: any }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
      >
        {children}
      </motion.div>
    </>
  );
}