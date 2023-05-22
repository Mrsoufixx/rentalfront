import { motion } from "framer-motion";
import  logo from "../assets/logo.svg";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen dark:bg-primary-dark bg-primary-light">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{
          type: "ease-in-out",
          stiffness: 60,
          damping: 30,
          duration: 1, // Adjust the duration to control the speed
          repeat: 0, // Set repeat to 0 to disable animation repetition
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-24"
        />
      </motion.div>
    </div>
  );
};

export default Spinner;
