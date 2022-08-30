import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SignIn page", () => {
	describe("layout", () => {
		it("has email input", () => {
			const email = screen.getByPlaceholderText("Email Address");
			expect(email).toBeInTheDocument();
		});

		it("has password input", () => {
			const password: HTMLInputElement =
				screen.getByPlaceholderText("Password");
			expect(password).toBeInTheDocument();
			expect(password.type).toBe("password");
		});

		it("has a button", () => {
			const button = screen.getByText("Sign In");
			expect(button).toBeInTheDocument();
		});
	});

	describe("interaction", () => {
		it("error messages will be show up if you click a button", async () => {
			const button = screen.getByText("Sign In");
			userEvent.click(button);
			await waitFor(() => {
				const errorMessages = screen.getAllByRole("error-message");
				expect(errorMessages).toHaveLength(2);
			});
		});

		it("check whether validation is working or not", async () => {
			const email = screen.getByPlaceholderText("Email Address");
			const password = screen.getByPlaceholderText("Password");
			userEvent.click(email);
			userEvent.click(password);
			userEvent.click(email);
			await waitFor(() => {
				const errorMessages = screen.getAllByRole("error-message");
				expect(errorMessages).toHaveLength(2);
			});
		});

		it("nothing will be show up when all inputs are filled", async () => {
			const email = screen.getByPlaceholderText("Email Address");
			const password = screen.getByPlaceholderText("Password");
			await userEvent.type(email, "test1234@gmail.com");
			await userEvent.type(password, "test1234!!");
			await waitFor(() => {
				const error = screen.queryAllByRole("error-message");
				expect(error).toHaveLength(0);
			});
		});
	});
});
