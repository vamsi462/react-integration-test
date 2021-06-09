import { render } from "@testing-library/react";
import React from "react";
import { LoginModule } from "./Index";

describe("LoginModule", () => {
  it("matches snapshot", () => {
    const { container } = render(<LoginModule />);
    expect(container.cloneNode(true)).toMatchSnapshot();
  });
});
