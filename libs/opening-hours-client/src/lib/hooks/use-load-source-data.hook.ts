import * as React from 'react';
import {
  IOpeningHoursData,
  IOpeningHoursSourceParser,
} from './use-source-parser.hook';
import { IOpeningHoursSourceValidator } from './use-source-validator.hook';

export interface ILoadOpeningHoursDataProps {
  rootUrl?: string;
  validator: IOpeningHoursSourceValidator;
  parser: IOpeningHoursSourceParser;
}

export interface ILoadOpeningHoursDataState {
  data?: IOpeningHoursData[] | null;
  error?: unknown | null;
}

interface IOpeningHoursDataDataAction {
  type: 'data';
  data: IOpeningHoursData[] | null;
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
      return { ...prevState, data: action.data };
    default:
      return prevState;
  }
};

export interface ILoadOpeningHoursData {
  load: (filePath: string) => Promise<void>;
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
        /*
        console.log(parsedData);
        dispatch({ type: 'data', data: parsedData });
        */
      }
    },
    [rootUrl, validator, parser]
  );

  return React.useMemo(
    () => ({
      load,
    }),
    [load]
  );
};
