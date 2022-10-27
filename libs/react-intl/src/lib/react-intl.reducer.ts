import { ResolvedIntlConfig } from 'react-intl';
import { ReactIntlProviderError } from './react-intl.error';
import { ReactIntlLocale } from './react-intl.locales';

/**
 * List of state changing acctions, which occurs in the hook.
 */
export enum ReactIntlStateAction {
  SET_INTL_MESSAGE = 'SET_INTL_MESSAGE',
  SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE',
  SET_ERROR = 'SET_ERROR',
}

export interface ISetCurrentLocaleAction {
  type: ReactIntlStateAction.SET_CURRENT_LOCALE;
  payload: ReactIntlLocale | undefined;
}

export interface ISetIntlMessageAction {
  type: ReactIntlStateAction.SET_INTL_MESSAGE;
  payload: ResolvedIntlConfig['messages'] | null;
}

export interface ISetIntlErrorAction {
  type: ReactIntlStateAction.SET_ERROR;
  error: ReactIntlProviderError;
}

export type IReactIntlReducer = React.Reducer<
  IReactIntlState,
  ISetIntlMessageAction | ISetCurrentLocaleAction | ISetIntlErrorAction
>;

/**
 * Describes hook state.
 */
export interface IReactIntlState {
  /**
   * The `intlMessages` means currently loaded dictionary.
   */
  intlMessages: ResolvedIntlConfig['messages'] | null;
  /**
   * The `currentLocale` is currently used locale.
   */
  currentLocale?: ReactIntlLocale;

  error?: ReactIntlProviderError;
}

/**
 * Default implementation of the hook state management.
 */
export const reactIntlReducer: IReactIntlReducer = (state, action) => {
  switch (action.type) {
    case ReactIntlStateAction.SET_CURRENT_LOCALE:
      return { ...state, currentLocale: action.payload };
    case ReactIntlStateAction.SET_INTL_MESSAGE:
      return { ...state, intlMessages: action.payload };
    case ReactIntlStateAction.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
