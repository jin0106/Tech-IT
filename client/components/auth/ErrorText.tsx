interface ErrorTextProps {
	text: string;
}

export const ErrorText = ({ text }: ErrorTextProps) => (
	<span className="text-red-600" role="error-text">
		{text}
	</span>
);
