import React, {
	Children,
	cloneElement,
	useEffect,
	useRef,
	useState,
} from "react";

const Accordion = ({ expanded = false, children }) => {
	const [open, setOpen] = useState(expanded);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [parentHeight, setParentHeight] = useState(0);

	const ref = useRef(null);

	const toggle = () => {
		setOpen(!open);
	};

	useEffect(() => {
		let parent = ref.current;

		if (parent) {
			setHeaderHeight(parent.children[0].scrollHeight);
			setParentHeight(parent.offSetHeight);
		}
	}, [ref.current]);

	const modifiedChildren = Children.map(children, (child, ind) => {
		if (ind === 0) return cloneElement(child, { open, onClick: toggle });
		else return child;
	});

	return (
		<div
			className="faq-item"
			ref={ref}
			style={{ height: open ? parentHeight : headerHeight }}
		>
			{modifiedChildren}
		</div>
	);
};

export default Accordion;
