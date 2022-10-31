import * as React from 'react';
import { IOpeningHoursInputSchema } from '../types';

export interface ILoadOpeningHoursSourceSchemaProps {
  schemaUrl: string;
  onSchemaLoad?: (schema: IOpeningHoursInputSchema) => void;
}

interface ILoadOpeningHoursSourceSchemaState {
  schema?: IOpeningHoursInputSchema | null;
  schemaUrl?: string;
  pending: boolean;
  error?: unknown | null;
}

export interface ILoadOpeningHoursSourceSchema
  extends ILoadOpeningHoursSourceSchemaState {
  reload: (schemaUrl?: string) => void;
}

interface ILoadOpeningHoursSourceSchemaLoadAction {
  type: 'load';
  schemaUrl: string;
}

interface ILoadOpeningHoursSourceSchemaDataAction {
  type: 'data';
  data: IOpeningHoursInputSchema;
}

interface ILoadOpeningHoursSourceSchemaErrorAction {
  type: 'error';
  error: unknown | null;
}

type ILoadOpeningHoursSourceSchemaReducer = React.Reducer<
  ILoadOpeningHoursSourceSchemaState,
  | ILoadOpeningHoursSourceSchemaLoadAction
  | ILoadOpeningHoursSourceSchemaDataAction
  | ILoadOpeningHoursSourceSchemaErrorAction
>;

const loadOpenigHoursSourceSchemaReducer: ILoadOpeningHoursSourceSchemaReducer =
  (prevState, action) => {
    switch (action.type) {
      case 'data':
        return { ...prevState, pending: false, schema: action.data };
      case 'error':
        return { ...prevState, pending: false, error: action.error };
      case 'load':
        return {
          ...prevState,
          pending: true,
          schema: null,
          error: null,
          schemaUrl: action.schemaUrl,
        };
      default:
        return prevState;
    }
  };

export type ILoadOpeningHoursSourceSchemaHook = (
  props: ILoadOpeningHoursSourceSchemaProps
) => ILoadOpeningHoursSourceSchema;

export const useLoadOpeningHoursSourceSchema: ILoadOpeningHoursSourceSchemaHook =
  (props) => {
    const [state, dispatch] =
      React.useReducer<ILoadOpeningHoursSourceSchemaReducer>(
        loadOpenigHoursSourceSchemaReducer,
        { pending: false }
      );

    const load = React.useCallback(
      async (schemaUrl?: string) => {
        const normalizedSchemaUrl = schemaUrl || props.schemaUrl;
        dispatch({ type: 'load', schemaUrl: normalizedSchemaUrl });
        try {
          const response = await fetch(normalizedSchemaUrl);
          const schema = await response.json();
          dispatch({ type: 'data', data: schema });
          if (props.onSchemaLoad) {
            props.onSchemaLoad(schema);
          }
        } catch (error) {
          dispatch({ type: 'error', error: error });
        }
      },
      [props.schemaUrl, dispatch, props.onSchemaLoad]
    );

    React.useEffect(
      () => {
        load();
      },
      [
        /* run on init*/
      ]
    );

    return React.useMemo(
      () => ({
        ...state,
        reload: load,
      }),
      [state, load]
    );
  };
