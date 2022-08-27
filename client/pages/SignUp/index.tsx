import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Form, HeadMeta, Input, ErrorText } from "@components/index";

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
			<Form onSubmit={handleSubmit(onSubmitButton)}>
				<Input
					{...register("email", {
						required: "이메일을 입력해주세요",
						pattern: {
							value:
								/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
							message: "이메일 형식으로 입력해주세요",
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
						required: "비밀번호를 입력해주세요",
						minLength: { value: 8, message: "최소 8자 이상 입력해주세요" },
						maxLength: 20,
						pattern: {
							value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-])/,
							message:
								"비밀번호는 반드시 8~20자이며, 영문, 숫자, 특수문자를 포함해야 합니다.",
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
						required: "비밀번호를 다시 한번 입력해주세요",
						minLength: { value: 8, message: "최소 8자 이상 입력해주세요" },
						maxLength: 20,
						pattern: {
							value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-])/,
							message:
								"비밀번호는 반드시 8~20자이며, 영문, 숫자, 특수문자를 포함해야 합니다.",
						},
						validate: {
							confirmPassword: (value) => {
								const { password } = getValues();
								return password === value || "비밀번호가 일치하지 않습니다";
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
						required: "이름을 입력해주세요",
						minLength: { value: 2, message: "최소 2자이상 입력해주세요" },
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
						required: "휴대폰 번호를 입력해주세요",
						minLength: 10,
						maxLength: {
							value: 13,
							message: "휴대폰번호는 최대 13자리 입니다",
						},
						pattern: {
							value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
							message: "올바른 형식으로 입력해주세요",
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
		</>
	);
}

export default SignUpPage;
