import React from "react";
import Appointment from "components/Appointment";
import { render } from "@testing-library/react";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
