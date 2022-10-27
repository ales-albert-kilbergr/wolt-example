import { ReactIntlLocale } from './react-intl.locales';
import { getLocaleFromClickEvent } from './react-intl.helpers';
import {
  ReactIntlProviderError,
  ReactIntlProviderErrorCode,
} from './react-intl.error';

describe('getLocaleFromClickEvent', () => {
  it('should read a locale from element dataset', () => {
    const expectedLocale = ReactIntlLocale.EN_US;
    const reactMouseMockEvent = {
      currentTarget: {
        dataset: {
          locale: expectedLocale,
        },
      },
    } as any as React.MouseEvent<HTMLElement>;

    expect(getLocaleFromClickEvent(reactMouseMockEvent)).toBe(expectedLocale);
  });

  it('should throw an error if locale is missing', () => {
    const reactMouseMockEvent = {
      currentTarget: {
        dataset: {},
      },
    } as any as React.MouseEvent<HTMLElement>;

    expect(() => getLocaleFromClickEvent(reactMouseMockEvent)).toThrowError(
      ReactIntlProviderError
    );

    expect(() => getLocaleFromClickEvent(reactMouseMockEvent)).toThrow(
      expect.objectContaining({
        code: ReactIntlProviderErrorCode.MISSING_DATA_LOCALE,
      })
    );
  });

  it('should throw an error if locale is invalid', () => {
    const reactMouseMockEvent = {
      currentTarget: {
        dataset: {
          locale: 'invalid locale',
        },
      },
    } as any as React.MouseEvent<HTMLElement>;

    expect(() => getLocaleFromClickEvent(reactMouseMockEvent)).toThrowError(
      ReactIntlProviderError
    );

    expect(() => getLocaleFromClickEvent(reactMouseMockEvent)).toThrow(
      expect.objectContaining({
        code: ReactIntlProviderErrorCode.INVALID_LOCALE,
      })
    );
  });
});
