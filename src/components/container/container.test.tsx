import { render } from '@testing-library/react';

import { Container } from './container';

describe('Components / Container', () => {
  it('should match snapshot', () => {
    const { container } = render(<Container />);
    expect(container).toMatchSnapshot();
  });
});
