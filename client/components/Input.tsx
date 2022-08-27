import tw from "tailwind-styled-components";

interface InputProps {
	$margin?: string;
	$padding?: string;
	$width?: string;
	$height?: string;
}

export const Input = tw.input`
    border
    text-xs
    rounded
    ${(p: InputProps) => (p.$margin ? p.$margin : "mt-6")}
    p-2
    h-10
    w-72
    focus:outline-blue
    border-neutral-300	
`;
