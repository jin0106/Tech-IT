import Form from "@components/Form";
import HeadMeta from "@components/HeadMeta";
import Input from "@components/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
interface InputProps {
	email: string;
	password: string;
	passwordConfrim: string;
	name: string;
	phoneNumber: number;
}

function SignUpPage() {
	const onSubmitButton = (data: InputProps) => {
		console.log(data);
	};
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<InputProps>({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			passwordConfrim: "",
			name: "",
			phoneNumber: 0,
		},
	});
	return (
		<>
			<HeadMeta title="Tech-IT: Create an account" description="SignUp Page" />
			<Form onSubmit={handleSubmit(onSubmitButton)}>
				<Input
					{...register("email", {
						required: "Please type your email",
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
					render={({ message }) => <p>{message}</p>}
				/>
				<Input
					{...(register("password"),
					{
						required: true,
						minLength: 8,
						maxLength: 20,
						pattern:
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
					})}
					type="password"
					placeholder="Password"
				/>

				<Input
					{...(register("passwordConfrim"),
					{
						required: true,
						minLength: 8,
						maxLength: 20,
						pattern:
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
					})}
					type="password"
					placeholder="Confrim Password"
				/>
				<Input
					{...register("name", {
						required: true,
						minLength: { value: 3, message: "thisis" },
						maxLength: 25,
					})}
					type="text"
					placeholder="Full Name"
				/>
				<ErrorMessage
					errors={errors}
					name="password"
					render={({ message }) => <p>{message}</p>}
				/>
				<Input
					{...(register("phoneNumber"),
					{
						required: { value: true, message: "dafsdf" },
						minLength: 10,
						maxLength: 11,
						pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
					})}
					type="text"
					placeholder="Phone Number"
				/>
				<input type="submit" />
			</Form>
		</>
	);
}

export default SignUpPage;
