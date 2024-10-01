import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
            <motion.div
                className="w-16 h-16 border-4 border-t-transparent border-purple-600 rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                }}
            />
        </div>
    );
};

export default Loading;