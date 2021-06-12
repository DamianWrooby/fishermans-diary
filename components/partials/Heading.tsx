import { motion, AnimatePresence } from 'framer-motion';

type HeadingProps = {
	text: string;
	tag: string;
};

const Heading = ({ text, tag }: HeadingProps) => {
	const Tag = `${tag}` as keyof JSX.IntrinsicElements;
	let motionTag;

	const DynamicMotionTag = ({ tag, children, ...props }) => {
		switch (tag) {
			case 'h1':
				return <motion.h1 {...props}>{children}</motion.h1>;
				break;
			case 'h2':
				return <motion.h2 {...props}>{children}</motion.h2>;
				break;
			default:
				return <motion.h1 {...props}>{children}</motion.h1>;
		}
	};

	return (
		<AnimatePresence>
			<DynamicMotionTag
				tag={tag}
				initial={{ opacity: 0, x: 300, y: 0 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				exit={{ opacity: 0, x: 100, y: 0 }}
				className="text-md sm:text-xl text-center p-3"
			>
				{text}
			</DynamicMotionTag>
		</AnimatePresence>
	);
};

export default Heading;
