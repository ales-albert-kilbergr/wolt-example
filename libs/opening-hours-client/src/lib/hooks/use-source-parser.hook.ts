import * as React from 'react';
import { parseOpeningHoursSource } from '../helpers';
import { IOpeningHoursData, IOpeningHoursInputSchema } from '../types';

export interface IOpeningHoursSourceParser
  extends IOpeningHoursSourceParserState {
  parse: (input: IOpeningHoursInputSchema) => void;
  clear: () => void;
}

export interface IOpeningHoursSourceParserProps {}

export type IOpeningHoursSourceParserHook = (
  props: IOpeningHoursSourceParserProps
) => IOpeningHoursSourceParser;

interface IOpeningHoursSourceParserState {
  data?: IOpeningHoursData[] | null;
  error?: unknown | null;
}

interface IOpeningHoursSourceParserDataAction {
  type: 'data';
  data: IOpeningHoursData[] | null;
}

interface IOpeningHoursSourceParserErrorAction {
  type: 'error';
  error?: unknown | null;
}

export type IOpeningHoursSourceParserReducer = React.Reducer<
  IOpeningHoursSourceParserState,
  IOpeningHoursSourceParserDataAction | IOpeningHoursSourceParserErrorAction
>;

const openingHoursSourceParserReducer: IOpeningHoursSourceParserReducer = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'data':
      return { ...prevState, error: null, data: action.data };
    case 'error':
      return { ...prevState, error: action.error, data: null };
    default:
      return prevState;
  }
};

export const useOpeningHoursSourceParser: IOpeningHoursSourceParserHook =
  () => {
    const [state, dispatch] =
      React.useReducer<IOpeningHoursSourceParserReducer>(
        openingHoursSourceParserReducer,
        {}
      );

    const parseClb = React.useCallback((input: IOpeningHoursInputSchema) => {
      try {
        const data = parseOpeningHoursSource(input);

        dispatch({ type: 'data', data });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    }, []);

    const clearClb = React.useCallback(() => {
      dispatch({ type: 'data', data: null });
    }, []);

    return React.useMemo(
      () => ({ parse: parseClb, clear: clearClb, ...state }),
      [parseClb, state, clearClb]
    );
  };
