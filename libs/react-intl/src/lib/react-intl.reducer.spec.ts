import { ReactIntlProviderError } from './react-intl.error';
import { ReactIntlLocale } from './react-intl.locales';
import {
  IReactIntlState,
  reactIntlReducer,
  ReactIntlStateAction,
} from './react-intl.reducer';
describe('reactIntlReducer', () => {
  let initState: IReactIntlState;

  beforeEach(() => {
    initState = {
      intlMessages: {},
      currentLocale: undefined,
    };
  });

  it('It should change current locale', () => {
    const newLocale = ReactIntlLocale.DE_DE;
    expect(initState.currentLocale).toBeUndefined();

    const newState = reactIntlReducer(initState, {
      payload: newLocale,
      type: ReactIntlStateAction.SET_CURRENT_LOCALE,
    });

    expect(newState.currentLocale).toBe(newLocale);
  });

  it('It should change messages', () => {
    expect(initState.intlMessages).toEqual({});

    const newState = reactIntlReducer(initState, {
      payload: null,
      type: ReactIntlStateAction.SET_INTL_MESSAGE,
    });

    expect(newState.intlMessages).toBeNull();
  });

  it('It return state unchanges', () => {
    const newState = reactIntlReducer(initState, {
      payload: null,
      type: 'unknown',
    } as any);

    expect(newState).toBe(initState);
  });

  it('State should be immutable', () => {
    const newState = reactIntlReducer(initState, {
      payload: null,
      type: ReactIntlStateAction.SET_INTL_MESSAGE,
    });

    expect(newState).not.toBe(initState);
  });

  it('It should set an error', () => {
    const newState = reactIntlReducer(initState, {
      error: ReactIntlProviderError.InvalidLocale('invalid locale'),
      type: ReactIntlStateAction.SET_ERROR,
    } as any);

    expect(newState.error).toBeInstanceOf(ReactIntlProviderError);
  });
});
