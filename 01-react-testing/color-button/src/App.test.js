import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App/>);
  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});

  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

  //expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});


test('checkbox is clicked', ()=> {
 render(<App/>);

 const checkbox = screen.getByRole('checkbox', {name: 'Disable Button'});
 const button = screen.getByRole('button', {name: 'Change to blue'});

 fireEvent.click(checkbox);
 expect(button).toBeDisabled();

 fireEvent.click(checkbox);
 expect(button).toBeEnabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App/>)

  const checkbox = screen.getByRole('checkbox', {name: 'Disable Button'});
  const button = screen.getByRole('button', {name: 'Change to blue'});

  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  //re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'red'});;
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App/>)

  const checkbox = screen.getByRole('checkbox', {name: 'Disable Button'});
  const button = screen.getByRole('button', {name: 'Change to blue'});

  //change button to blue
  fireEvent.click(button);
  
  //disable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  //re-enable button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'blue'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  });
});