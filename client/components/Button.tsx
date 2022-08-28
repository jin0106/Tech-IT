import tw from "tailwind-styled-components";

interface ButtonProps {
	$width?: string;
	$color?: string;
}

export const Button = tw.button<ButtonProps>`
  ${(p: ButtonProps) => (p.$width ? p.$width : "w-72")}
  h-10
  rounded
  ${(p: ButtonProps) => (p.$color ? p.$color : "bg-sky-500")}
  text-white
  font-medium
  my-4
`;
