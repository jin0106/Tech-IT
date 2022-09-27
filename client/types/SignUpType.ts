interface SignUpType {
	email: string;
	password: string;
	passwordConfirm: string;
	username: string;
	phoneNumber: number | null;
	address: string;
	addressDetail?: string;
}

export default SignUpType;
