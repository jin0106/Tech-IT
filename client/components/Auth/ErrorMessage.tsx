interface ErrorTextProps {
	message: string;
}

export const ErrorText = ({ message }: ErrorTextProps) => (
	<span className="text-red-600 text-sm text-center" role="error-message">
		{message}
	</span>
);
