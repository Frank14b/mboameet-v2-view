import { motion } from "framer-motion";
import React from "react";

export type AnimateSlideInRightProps = {
  children: React.ReactNode;
  duration?: number;
};

export default function AnimateSlideInRight({
  children,
  duration = 0.7,
}: AnimateSlideInRightProps) {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          marginLeft: "-20%",
          width: 0,
          visibility: "hidden",
        }}
        animate={{
          opacity: 1,
          marginLeft: 0,
          width: "100%",
          visibility: "visible",
        }}
        transition={{ duration: duration }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </>
  );
}
