const errorCode = (code: string): string => {
	switch (code) {
		case "M01":
			return "This email already existed.";
		case "M02":
			return "This email doesn't exist.";
		case "M03":
			return "Please check your password.";
		default:
			return "Something is wrong. Please try again.";
	}
};

export default errorCode;
