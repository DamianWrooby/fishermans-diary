import { motion, AnimatePresence } from 'framer-motion';

type HeadingProps = {
	text: string;
};

const Heading = ({ text }: HeadingProps) => {
	return (
		<AnimatePresence>
			<motion.h2
				initial={{ opacity: 0, x: 300, y: 0 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				exit={{ opacity: 0, x: 100, y: 0 }}
				className="text-md sm:text-xl text-center p-3"
			>
				{text}
			</motion.h2>
		</AnimatePresence>
	);
};

export default Heading;
