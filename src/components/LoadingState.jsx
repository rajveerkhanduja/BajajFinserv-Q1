import { motion } from 'framer-motion';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 mb-4 border-4 border-t-primary-500 border-primary-200 rounded-full"
      />
      <h2 className="text-xl font-medium text-gray-700">Loading doctors...</h2>
      <p className="mt-2 text-gray-500">Please wait while we fetch the best doctors for you</p>
    </div>
  );
};

export default LoadingState;