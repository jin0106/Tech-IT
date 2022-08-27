import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./index";

beforeEach(() => {
	render(<SignUpPage />);
});
describe("SignUp Page", () => {
	describe("Layout", () => {
		it("has email input", () => {
			const input = screen.getByPlaceholderText("Email Address");
			expect(input).toBeInTheDocument();
		});

		it("has password input", () => {
			const password: HTMLInputElement =
				screen.getByPlaceholderText("Password");
			const confirmPassword: HTMLInputElement =
				screen.getByPlaceholderText("Confirm Password");
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
			const button = screen.getByText("Sign Up");
			expect(button).toBeInTheDocument();
		});

		it("check if button is disabled initially", () => {
			const button = screen.getByText("Sign Up");
			expect(button).toBeDisabled();
		});
	});

	describe("interaction", () => {
		it("enables the button when email and both password input are filled", () => {
			const emailInput = screen.getByPlaceholderText("Email");
			const passwordInput = screen.getByPlaceholderText("Password");
			const confrimPasswordInput =
				screen.getByPlaceholderText("Confirm Password");
			const Button = screen.getByText("Sign Up");
			userEvent.type(emailInput, "wjinh@naver.com");
			userEvent.type(passwordInput, "test1234!");
			userEvent.type(confrimPasswordInput, "test1234!");
			expect(Button).toBeEnabled();
		});
	});
});
