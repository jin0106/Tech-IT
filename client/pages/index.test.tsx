import { render, screen } from "@testing-library/react";
import Home from "./index";

beforeEach(() => {
	render(<Home />);
});
it("renders homepage unchanged", () => {
	screen.getByText("hi");
});
