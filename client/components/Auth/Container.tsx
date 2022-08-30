import tw from "tailwind-styled-components";

interface ContainerProps {
	title: string;
	children: React.ReactNode;
}

export const Container = (props: ContainerProps) => (
	<ContainerBox>{props.children}</ContainerBox>
);

const ContainerBox = tw.div`
  flex
  flex-col
  justify-center
  items-center
  border
  w-100
  h-screen
  bg-slate-50
`;
