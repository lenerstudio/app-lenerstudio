import React from "react";
import { motion } from "framer-motion";

export interface WelcomeMessageProps {}

const WelcomeMessage: React.FC<WelcomeMessageProps> = () => {
  return (
    <motion.p
      className="text-sm text-white leading-5 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Write in the chat what you want to create.
    </motion.p>
  );
};

export default WelcomeMessage;
