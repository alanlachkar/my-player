// React imports
import { render, cleanup, screen } from '@testing-library/react';
// Component imports
import CardList from './CardList';
// Utils imports
import '@testing-library/jest-dom';

afterEach(cleanup);

let container: HTMLElement;

describe('Post component suites tests', () => {
  beforeEach(() => {
    const component = render(<CardList onClickCard={() => {}} />);
    container = component.container;
  });
  test('Verify displayed', () => {
    expect(container).toBeInTheDocument();
    expect(screen.getAllByTestId('cardList').length).toEqual(1);
    expect(screen.getByText('Big Buck Bunny')).toBeVisible();
    expect(screen.getByText('In the movie VS In real life !')).toBeVisible();
  });
});
