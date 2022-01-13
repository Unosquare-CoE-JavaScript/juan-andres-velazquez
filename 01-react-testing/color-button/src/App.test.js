import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("checkbox is clicked", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("Disabled button has gray background and reverts to red", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  //re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //change button to blue
  fireEvent.click(button);

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  //re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
