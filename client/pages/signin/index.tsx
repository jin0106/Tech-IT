import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import SignUpType from "@pages/signup/SignUpType";
import { HeadMeta } from "@components/HeadMeta";
import {
	Button,
	Container,
	ErrorText,
	Form,
	Input,
	MovePage,
	Title,
} from "@components/index";

function SignIn() {
	const onSubmit = () => {};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pick<SignUpType, "email" | "password">>({
		mode: "onBlur",
		defaultValues: { email: "", password: "" },
	});

	return (
		<>
			<HeadMeta title="Tech-IT: Sign In to Tech-IT" description="SignIn Page" />
			<Container title="Sign In">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Title>Sign In to Tech-IT</Title>
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
						render={({ message }) => <ErrorText message={message} />}
					/>
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
								message:
									"Password should include 1 number and 1 alpha character",
							},
						})}
						type="password"
						placeholder="Password"
					/>
					<ErrorMessage
						errors={errors}
						name="password"
						render={({ message }) => <ErrorText message={message} />}
					/>
					<Button>Sign In</Button>
					<MovePage
						paragraph="Don't have an account?"
						link="/signup"
						description="Sign Up"
					/>
				</Form>
			</Container>
		</>
	);
}

export default SignIn;
