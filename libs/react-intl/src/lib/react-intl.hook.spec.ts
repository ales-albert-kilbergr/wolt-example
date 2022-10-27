import { renderHook, act, RenderHookResult } from '@testing-library/react';
import { ResolvedIntlConfig } from 'react-intl';
import { IReactIntlController } from './react-intl.controller';
import {
  ReactIntlProviderError,
  ReactIntlProviderErrorCode,
} from './react-intl.error';
import {
  IReactIntlControllerHookProps,
  useReactIntlControllerProvider,
} from './react-intl.hook';
import { ReactIntlLocale } from './react-intl.locales';

describe('useReactIntlControllerProvider', () => {
  let loadLocaleDataMock: (
    locale: ReactIntlLocale
  ) => Promise<ResolvedIntlConfig['messages']>;

  beforeEach(() => {
    loadLocaleDataMock = jest.fn().mockResolvedValue({});
  });

  it('should return a react intl controller', async () => {
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
        })
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controller = renderHookResult!.result.current;

    expect(controller).toHaveProperty('setLocale');
    expect(controller).toHaveProperty('intlMessages');
    expect(controller).toHaveProperty('defaultLocale');
    expect(controller).toHaveProperty('enabledLocales');
    expect(controller).toHaveProperty('currentLocale');
    expect(controller).toHaveProperty('handleSetLocaleClick');
  });

  it('should create a react intl with selected default locale', async () => {
    const expectedLocale = ReactIntlLocale.FR_FR;
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: expectedLocale,
        })
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controller = renderHookResult!.result.current;

    expect(controller).toHaveProperty('defaultLocale', expectedLocale);
    expect(controller).toHaveProperty('currentLocale', expectedLocale);
  });

  it('should set new locale', async () => {
    const initLocale = ReactIntlLocale.FR_FR;
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: initLocale,
        })
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let controller = renderHookResult!.result.current;

    expect(controller).toHaveProperty('defaultLocale', initLocale);
    expect(controller).toHaveProperty('currentLocale', initLocale);

    await act(async () => {
      await controller.setLocale(ReactIntlLocale.DE_DE);
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    controller = renderHookResult!.result.current;

    expect(controller).toHaveProperty('currentLocale', ReactIntlLocale.DE_DE);
  });

  it('should store default locale into cache if present', async () => {
    let expectedLocale: ReactIntlLocale;
    const mockCache = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      get: jest.fn().mockResolvedValue(expectedLocale!),
      set: jest.fn().mockImplementation((locale) => {
        expectedLocale = locale;
        return Promise.resolve();
      }),
    };

    const initLocale = ReactIntlLocale.FR_FR;

    await act(async () => {
      renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: initLocale,
          localeCache: mockCache,
        })
      );
    });
    expect(mockCache.set).toBeCalledWith(initLocale);
  });

  it('should store changed locale into cache if present', async () => {
    let expectedLocale: ReactIntlLocale;
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;

    const mockCache = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      get: jest.fn().mockResolvedValue(expectedLocale!),
      set: jest.fn().mockImplementation((locale) => {
        expectedLocale = locale;
        return Promise.resolve();
      }),
    };

    const initLocale = ReactIntlLocale.FR_FR;

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: initLocale,
          localeCache: mockCache,
        })
      );
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controller = renderHookResult!.result.current;

    await act(async () => {
      controller.setLocale(ReactIntlLocale.DE_DE);
    });
    expect(mockCache.set).toBeCalledWith(ReactIntlLocale.DE_DE);
  });

  it('should catch an error if cache fetching failes', async () => {
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;
    const mockCache = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      get: jest.fn().mockImplementation(async () => {
        return Promise.reject(new Error('Sometghing went wrong with cache!'));
      }),
      set: jest.fn().mockResolvedValue(null),
    };

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: ReactIntlLocale.FR_FR,
          localeCache: mockCache,
        })
      );
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controller = renderHookResult!.result.current;

    expect(controller.error).toHaveProperty(
      'code',
      ReactIntlProviderErrorCode.FETCH_CACHE_FAILED
    );

    expect(controller.error).toBeInstanceOf(ReactIntlProviderError);
  });

  it('should react on a click to change a locale', async () => {
    let renderHookResult: RenderHookResult<
      IReactIntlController,
      IReactIntlControllerHookProps
    >;

    await act(async () => {
      renderHookResult = renderHook(() =>
        useReactIntlControllerProvider({
          loadLocaleData: loadLocaleDataMock,
          defaultLocale: ReactIntlLocale.FR_FR,
        })
      );
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let controller = renderHookResult!.result.current;

    const reactMouseMockEvent = {
      currentTarget: {
        dataset: {
          locale: ReactIntlLocale.DE_DE,
        },
      },
    } as any as React.MouseEvent<HTMLElement>;

    await act(async () => {
      await controller.handleSetLocaleClick(reactMouseMockEvent);
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    controller = renderHookResult!.result.current;

    expect(controller.currentLocale).toBe(ReactIntlLocale.DE_DE);
  });
});
