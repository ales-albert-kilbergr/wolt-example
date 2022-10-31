import * as React from 'react';
import { IOpeningHoursSourceParser } from './use-source-parser.hook';
import { IOpeningHoursSourceValidator } from './use-source-validator.hook';

export interface ILoadOpeningHoursDataProps {
  rootUrl?: string;
  validator: IOpeningHoursSourceValidator;
  parser: IOpeningHoursSourceParser;
}

export interface ILoadOpeningHoursDataState {
  fileName?: string;
  error?: unknown | null;
}

interface IOpeningHoursDataDataAction {
  type: 'data';
  fileName?: string;
}

type IOpeningHoursDataReducer = React.Reducer<
  ILoadOpeningHoursDataState,
  IOpeningHoursDataDataAction
>;

const opeingHoursDataReducer: IOpeningHoursDataReducer = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'data':
      return { ...prevState, fileName: action.fileName };
    default:
      return prevState;
  }
};

export interface ILoadOpeningHoursData extends ILoadOpeningHoursDataState {
  load: (filePath: string) => Promise<void>;
  parser: IOpeningHoursSourceParser;
  data: IOpeningHoursSourceParser['data'];
}

export type ILoadOpeningHoursSourceDataHook = (
  props: ILoadOpeningHoursDataProps
) => ILoadOpeningHoursData;

export const useLoadOpeningHoursSourceData: ILoadOpeningHoursSourceDataHook = ({
  rootUrl,
  validator,
  parser,
}) => {
  const [state, dispatch] = React.useReducer<IOpeningHoursDataReducer>(
    opeingHoursDataReducer,
    {}
  );

  const load = React.useCallback(
    async (filePath: string) => {
      if (!rootUrl) {
        throw new Error('RootUrl not yet set!');
      }
      const fileUrl = `${rootUrl}/${filePath}`;

      const response = await fetch(fileUrl);
      const data = await response.json();

      if (validator.validate(data)) {
        parser.parse(data);
        dispatch({ type: 'data', fileName: filePath });
      }
    },
    [rootUrl, validator, parser]
  );

  return React.useMemo(
    () => ({
      load,
      parser,
      data: parser.data,
      ...state,
    }),
    [load, state, parser]
  );
};
