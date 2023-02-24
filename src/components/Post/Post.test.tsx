// React imports
import { render, cleanup, screen } from '@testing-library/react';
// Component imports
import { Post, sumFunction } from './Post';
// Utils imports
import '@testing-library/jest-dom';
import { getByText } from '@testing-library/dom';

afterEach(cleanup);

let container: HTMLElement;

describe('Post component suites tests', () => {
  beforeEach(() => {
    const component = render(<Post title="Hello world" body="Lorem ipsum" />);
    container = component.container;
  });
  test('Verify displayed', () => {
    expect(sumFunction(1, 2)).toEqual(3);
    expect(container).toBeInTheDocument();
    expect(getByText(container, 'Lorem ipsum')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Hello world !/i })).toBeInTheDocument();
  });
});
