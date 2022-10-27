import { render, act, RenderResult } from '@testing-library/react';
import { ResolvedIntlConfig } from 'react-intl';
import { ReactIntlLocale } from './react-intl.locales';
import { ReactIntlControllerProvider } from './react-intl.provider';
describe('ReactIntlControllerProvider', () => {
  let loadLocalDataMock: (
    locale: ReactIntlLocale
  ) => Promise<ResolvedIntlConfig['messages']>;

  beforeEach(() => {
    loadLocalDataMock = jest.fn().mockResolvedValue({});
  });
  it('should render a component with child', async () => {
    let renderComponentResult: RenderResult;

    await act(() => {
      renderComponentResult = render(
        <ReactIntlControllerProvider loadLocaleData={loadLocalDataMock}>
          <div>Content</div>
        </ReactIntlControllerProvider>
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(renderComponentResult!.getByText('Content')).toBeTruthy();
  });
});
