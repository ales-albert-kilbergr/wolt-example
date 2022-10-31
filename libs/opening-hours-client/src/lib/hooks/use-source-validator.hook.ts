import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import * as React from 'react';
import {
  ILoadOpeningHoursSourceSchema,
  IOpeningHoursInputSchema,
  useLoadOpeningHoursSourceSchema,
} from './use-load-source-schema.hook';

export interface IOpeningHoursSourceValidatorProps {
  schemaUrl: string;
}

export interface IOpeningHoursSourceValidator
  extends IOpeningHoursSourceValidatorState {
  validate: (input: unknown) => input is IOpeningHoursInputSchema;
  errors?: null | ErrorObject[];
  schema: ILoadOpeningHoursSourceSchema;
}

interface IOpeningHoursSourceValidatorState {
  ajvRef: Ajv;
  validator?: ValidateFunction;
  validationErrors?: null | ErrorObject[];
}

interface IOpeningHoursSourceValidatorCompiledAction {
  type: 'compiled';
  validator: ValidateFunction;
}

interface IOpeningHoursSourceValidatorSetErrorAction {
  type: 'error';
  validationErrors?: null | ErrorObject[];
}

type IOpeningHoursSourceValidatorReducer = React.Reducer<
  IOpeningHoursSourceValidatorState,
  | IOpeningHoursSourceValidatorCompiledAction
  | IOpeningHoursSourceValidatorSetErrorAction
>;

const openingHoursSourceValidatorReducer: IOpeningHoursSourceValidatorReducer =
  (prevState, action) => {
    switch (action.type) {
      case 'error':
        return { ...prevState, validationErrors: action.validationErrors };
      case 'compiled':
        return { ...prevState, validator: action.validator };
      default:
        return prevState;
    }
  };

export type IOpeningHoursSourceValidatorHook = (
  props: IOpeningHoursSourceValidatorProps
) => IOpeningHoursSourceValidator;

const INIT_STATE: IOpeningHoursSourceValidatorState = {
  ajvRef: new Ajv(),
};

export const useOpeningHoursSourceValidator: IOpeningHoursSourceValidatorHook =
  (props) => {
    const [state, dispatch] =
      React.useReducer<IOpeningHoursSourceValidatorReducer>(
        openingHoursSourceValidatorReducer,
        INIT_STATE
      );

    const onSchemaLoad = React.useCallback(
      (schema: IOpeningHoursInputSchema) => {
        const validator = state.ajvRef.compile(schema);

        dispatch({ type: 'compiled', validator });
      },
      [state.ajvRef, dispatch]
    );

    const schema = useLoadOpeningHoursSourceSchema({
      schemaUrl: props.schemaUrl,
      onSchemaLoad,
    });

    const validate = React.useCallback(
      (input: unknown): input is IOpeningHoursInputSchema => {
        if (!state.validator) {
          throw new Error('Validator function not ready yet!');
        }
        if (state.validator(input)) {
          return true;
        } else {
          dispatch({ type: 'error', validationErrors: state.validator.errors });
          return false;
        }
      },
      [state, dispatch]
    );

    return React.useMemo(
      () => ({ schema, validate, ...state }),
      [schema, state, validate]
    );
  };
