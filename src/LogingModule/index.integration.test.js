import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginModule } from "./Index";
describe("LoginModule", () => {
  test("initial state", () => {
    render(<LoginModule />);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    expect(emailField).toHaveValue("");
    const passwordField = screen.getByLabelText("Password");
    expect(passwordField).toHaveValue("");

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("Submit");
  });
  test("Login success", async () => {
    jest
      .spyOn(window, "fetch")
      .mockResolvedValue({ json: () => ({ token: "123" }) });
    render(<LoginModule />);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordFiled = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    fireEvent.change(emailField, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordFiled, { target: { value: "password" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading");

    await waitFor(() => {
      //it hides the form element when user signed in
      expect(button).not.toBeInTheDocument();
      expect(emailField).not.toBeInTheDocument();
      expect(passwordFiled).not.toBeInTheDocument();

      const loginText = screen.getByText("Logged in as");
      expect(loginText).toBeInTheDocument();
      const emailAddressText = screen.getByText("test@gmail.com");
      expect(emailAddressText).toBeInTheDocument();
    });
  });

  test("error login", async () => {
    jest
      .spyOn(window, "fetch")
      .mockResolvedValue({ json: () => ({ error: "invalid password" }) });

    render(<LoginModule />);
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    fireEvent.change(emailField, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordField, { target: { value: "password" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading");

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent("Submit");

      const errorText = screen.getByText("Error:");
      expect(errorText).toBeInTheDocument();
      const errorMessageText = screen.getByText("invalid password");
      expect(errorMessageText).toBeInTheDocument();
    });
  });
});
