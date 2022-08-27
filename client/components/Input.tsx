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
    border-black
    ${(p: InputProps) => (p.$margin ? p.$margin : "my-2")}
    p-2
    h-10
    w-72
    focus:outline-blue
`;
