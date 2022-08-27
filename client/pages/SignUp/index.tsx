import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import {
	Form,
	HeadMeta,
	Input,
	ErrorText,
	Container,
	Title,
} from "@components/index";

interface InputProps {
	email: string;
	password: string;
	passwordConfirm: string;
	name: string;
	phoneNumber: number | null;
}

function SignUpPage() {
	const onSubmitButton = (data: InputProps) => {
		console.log(data);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm<InputProps>({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
			name: "",
			phoneNumber: null,
		},
	});

	return (
		<>
			<HeadMeta title="Tech-IT: Create an account" description="SignUp Page" />
			<Container title="Sign Up">
				<Form onSubmit={handleSubmit(onSubmitButton)}>
					<Title>Create an account</Title>
					<Input
						{...register("email", {
							required: "Please enter a email address",
							pattern: {
								value:
									/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
								message: "Please enter a valid email address",
							},
						})}
						placeholder="Email Address"
					/>
					<ErrorMessage
						errors={errors}
						name="email"
						render={({ message }) => <ErrorText>{message}</ErrorText>}
					/>
					<Input
						{...register("password", {
							required: "Please enter a password.",
							minLength: { value: 8, message: "최소 8자 이상 입력해주세요" },
							maxLength: 20,
							pattern: {
								value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-])/,
								message: "Please enter a strong password.",
							},
						})}
						type="password"
						placeholder="Password"
					/>
					<ErrorMessage
						errors={errors}
						name="password"
						render={({ message }) => <ErrorText>{message}</ErrorText>}
					/>
					<Input
						{...register("passwordConfirm", {
							required: "Please reenter your password.",
							minLength: { value: 8, message: "최소 8자 이상 입력해주세요" },
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
					<ErrorMessage
						errors={errors}
						name="passwordConfirm"
						render={({ message }) => <ErrorText>{message}</ErrorText>}
					/>
					<Input
						{...register("name", {
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
					<ErrorMessage
						errors={errors}
						name="name"
						render={({ message }) => <ErrorText>{message}</ErrorText>}
					/>
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
						type="text"
						placeholder="Phone Number"
					/>
					<ErrorMessage
						errors={errors}
						name="phoneNumber"
						render={({ message }) => <ErrorText>{message}</ErrorText>}
					/>
					<input type="submit" />
				</Form>
			</Container>
		</>
	);
}

export default SignUpPage;
