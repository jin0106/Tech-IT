import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "../pages/signup/index";
import { RecoilRoot } from "recoil";
beforeEach(() => {
	render(
		<RecoilRoot>
			<SignUpPage />
		</RecoilRoot>
	);
});
describe("SignUp Page", () => {
	describe("Layout", () => {
		it("has email input", () => {
			const input = screen.getByPlaceholderText("Email Address");
			expect(input).toBeInTheDocument();
		});

		it("has password input", () => {
			const password: HTMLInputElement = screen.getByPlaceholderText("Password");
			const confirmPassword: HTMLInputElement = screen.getByPlaceholderText("Confirm Password");
			expect(password).toBeInTheDocument();
			expect(confirmPassword).toBeInTheDocument();
			expect(password.type).toBe("password");
			expect(confirmPassword.type).toBe("password");
		});
		it("has phone number input", () => {
			const phone = screen.getByPlaceholderText("Phone Number");
			expect(phone).toBeInTheDocument();
		});

		it("has Name Input", () => {
			const name = screen.getByPlaceholderText("Full Name");
			expect(name).toBeInTheDocument();
		});
		it("has submit button", () => {
			const button = screen.getByRole("submit-button");
			expect(button).toBeInTheDocument();
		});
	});

	describe("interaction", () => {
		it("error messages will be showed up if you click Create an Account button", async () => {
			const Button = screen.getByRole("submit-button");
			userEvent.click(Button);
			await waitFor(() => {
				const errorMessages = screen.getAllByRole("error-message");
				expect(errorMessages).toHaveLength(5);
			});
		});

		it("nothing will be showed up if you click a button when all inputs are filled ", async () => {
			const Button = screen.getByRole("submit-button");
			const emailInput = screen.getByPlaceholderText("Email Address");
			const passwordInput = screen.getByPlaceholderText("Password");
			const passwordConfirmInput = screen.getByPlaceholderText("Confirm Password");
			const nameInput = screen.getByPlaceholderText("Full Name");
			const phoneInput = screen.getByPlaceholderText("Phone Number");
			await userEvent.type(emailInput, "test123@gmail.com");
			await userEvent.type(passwordInput, "test1234!");
			await userEvent.type(passwordConfirmInput, "test1234!@");
			await userEvent.type(nameInput, "test");
			await userEvent.type(phoneInput, "010-1234-1234");
			await waitFor(() => {
				expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
			});
			await userEvent.click(Button);

			await userEvent.clear(passwordConfirmInput);
			await userEvent.type(passwordConfirmInput, "test1234!");
			await waitFor(() => {
				const error = screen.queryAllByRole("error-message");
				expect(error).toHaveLength(0);
			});
		});
	});
});
