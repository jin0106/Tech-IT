import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { addressState } from "recoil/addressState";
import useSignUp from "@hooks/query/useSignUp";
import authApi from "@apis/auth";
import SignUpType from "./SignUpType";
import { Form, HeadMeta, Input, ErrorText, Container, FindAddress } from "@components/index";
import useToastMessage from "@utils/useToast";
import toast, { Toaster } from "react-hot-toast";

function SignUpPage() {
	const [isExist, setIsExist] = useState(false);
	const router = useRouter();
	const address = useRecoilValue(addressState);
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
			username: "",
			phoneNumber: null,
		},
	});

	const { mutate: signUp } = useSignUp({
		onSuccess: () => {
			useToastMessage("Thank you. Your Registration has been completed successfully.", "success");
			router.push("/signin");
		},
		onError: () => {
			useToastMessage("Something is Wrong. Please try again", "error");
		},
	});
	const checkDuplicate = async () => {
		const { email } = getValues();
		const { result } = await authApi.isEmailExist(email);
		setIsExist(result);
	};
	const onSubmitButton = (data: Omit<SignUpType, "address" | "addressDetail">) => {
		const info = { ...data, ...address };
		signUp(info);
	};
	return (
		<>
			<HeadMeta title="Tech-IT: Create an account" description="SignUp Page" />
			<Container title="Sign Up">
				<Form
					handleSubmit={handleSubmit(onSubmitButton)}
					title="Create an Account"
					paragraph="Already have an account?"
					link="/signin"
					description="Sign In"
					buttonText="Create an Account"
				>
					<Input
						{...register("email", {
							required: "Please enter a email address",
							pattern: {
								value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
								message: "Please enter a valid email address",
							},
							onBlur: checkDuplicate,
						})}
						placeholder="Email Address"
					/>
					{isExist && <ErrorText message="This email address is already registerd" />}
					<ErrorMessage errors={errors} name="email" render={({ message }) => <ErrorText message={message} />} />
					<Input
						{...register("password", {
							required: "Please enter a password.",
							minLength: {
								value: 8,
								message: "Password should be at least 8 characters",
							},
							maxLength: 20,
							pattern: {
								value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-])/,
								message: "Please enter a strong password.",
							},
						})}
						type="password"
						placeholder="Password"
					/>
					<ErrorMessage errors={errors} name="password" render={({ message }) => <ErrorText message={message} />} />
					<Input
						{...register("passwordConfirm", {
							required: "Please reenter your password.",
							minLength: {
								value: 8,
								message: "Password should be at least 8 characters",
							},
							maxLength: 20,
							pattern: {
								value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-])/,
								message: "Please enter a strong password.",
							},
							validate: {
								confirmPassword: (value) => {
									const { password } = getValues();
									return password === value || "Passwords do not match.";
								},
							},
						})}
						type="password"
						placeholder="Confirm Password"
					/>
					<ErrorMessage errors={errors} name="passwordConfirm" render={({ message }) => <ErrorText message={message} />} />
					<Input
						{...register("username", {
							required: "Please enter a name",
							minLength: {
								value: 2,
								message: "Name should be at least 2 letters",
							},
							maxLength: 25,
						})}
						type="text"
						placeholder="Full Name"
					/>
					<ErrorMessage errors={errors} name="username" render={({ message }) => <ErrorText message={message} />} />
					<Input
						{...register("phoneNumber", {
							required: "Please enter a mobile phone Number",
							minLength: 10,
							maxLength: {
								value: 13,
								message: "Mobile phone number can't be exceed 13 digits",
							},
							pattern: {
								value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
								message: "Please enter a valid mobile phone number.",
							},
						})}
						type="tel"
						placeholder="Phone Number"
					/>
					<ErrorMessage errors={errors} name="phoneNumber" render={({ message }) => <ErrorText message={message} />} />
					<FindAddress />
				</Form>
			</Container>
		</>
	);
}

export default SignUpPage;
