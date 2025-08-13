import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "@/components/AuthForm";

vi.mock("@/lib/actions/user.actions", () => ({
  signIn: vi.fn(async ({ email, password }) => {
    if (email === "good_user@gooduser.com" && password === "good_user") {
      return { $id: "demo-user-id", firstName: "Good", lastName: "User" };
    }
    return { $id: "user-id", firstName: "Jane", lastName: "Doe" };
  }),
  signUp: vi.fn(),
}));

describe("AuthForm", () => {
  it("displays loading state and calls sign in on submit", async () => {
    render(<AuthForm type="sign-in" />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(email, { target: { value: "jane@example.com" } });
    fireEvent.change(password, { target: { value: "password123" } });

    fireEvent.click(submit);

    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent(/loading/i);

    await waitFor(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  it("handles demo sign-in flow and shows loading demo state", async () => {
    render(<AuthForm type="sign-in" />);

    const demoBtn = screen.getByRole("button", { name: /try demo account/i });
    fireEvent.click(demoBtn);

    expect(demoBtn).toBeDisabled();
    expect(demoBtn).toHaveTextContent(/loading demo/i);

    await waitFor(() => {
      expect(demoBtn).not.toBeDisabled();
    });
  });
});
