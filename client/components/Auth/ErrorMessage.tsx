interface ErrorTextProps {
	message: string;
}

export const ErrorText = ({ message }: ErrorTextProps) => (
	<span className="text-red-600" role="error-message">
		{message}
	</span>
);
