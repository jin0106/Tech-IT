import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import SignUpType from "types/SignUpType";
import useToastMessage from "@utils/useToast";
import useSignIn from "@hooks/query/useSignIn";
import errorCode from "@utils/errorCode";
import { Container, ErrorText, Form, Input } from "@components/index";
import { HeadMeta } from "@components/HeadMeta";

function SignIn() {
	const router = useRouter();

	const { mutate: signIn } = useSignIn({
		onSuccess: () => {
			useToastMessage("Your sign in was successful", "success");
			router.push("/");
		},
		onError: (error) => {
			useToastMessage(errorCode(error.response?.data.error_code as string), "error");
		},
	});

	const handleSubmitFn = (data: Pick<SignUpType, "email" | "password">) => {
		signIn(data);
	};

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
				<Form handleSubmit={handleSubmit(handleSubmitFn)} title="Sign In to Tech-It" paragraph="Don't have an account?" link="/signup" description="Sign Up" buttonText="Sign In">
					<Input
						{...register("email", {
							required: "Please enter a email address",
							pattern: {
								value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
								message: "Please enter a valid email address",
							},
						})}
						placeholder="Email Address"
					/>
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
								message: "Password should include 1 number and 1 alpha character",
							},
						})}
						type="password"
						placeholder="Password"
					/>
					<ErrorMessage errors={errors} name="password" render={({ message }) => <ErrorText message={message} />} />
				</Form>
			</Container>
		</>
	);
}

export default SignIn;
