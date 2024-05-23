import { motion } from "framer-motion";

export default function AnimateHoverScale({
  children,
  index,
}: {
  children: any;
  index: number;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.2 + index / 10 }}
        whileHover={{ scale: 1.02 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        {children}
      </motion.div>
    </>
  );
}
