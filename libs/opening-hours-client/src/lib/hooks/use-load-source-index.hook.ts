import * as React from 'react';

export interface IOpeningHoursSourceIndexProps {
  indexUrl: string;
}

export interface IOpeningHoursSourceIndexState {
  files?: string[];
  pending?: boolean;
  path?: string;
  error?: unknown;
}

export interface IOpeningHoursSourceIndex
  extends IOpeningHoursSourceIndexState {
  reloadData: (abortController: AbortController) => Promise<void>;
}

export type OpeningHourseSourceIndexHook = (
  props: IOpeningHoursSourceIndexProps
) => IOpeningHoursSourceIndex;

interface IOpeningHoursSourceIndexErrorAction {
  type: 'error';
  error: unknown;
}

interface IOpeningHoursSourceIndexDataAction {
  type: 'data';
  files: string[];
  path: string;
}

interface IOpeningHoursSourceIndexLoadAction {
  type: 'load';
}

const openingHoursSourceIndexReducer: React.Reducer<
  IOpeningHoursSourceIndexState,
  | IOpeningHoursSourceIndexErrorAction
  | IOpeningHoursSourceIndexDataAction
  | IOpeningHoursSourceIndexLoadAction
> = (prevState, action) => {
  switch (action.type) {
    case 'error':
      return {
        ...prevState,
        error: action.error,
        pending: false,
      };
    case 'data':
      return {
        ...prevState,
        files: action.files,
        path: action.path,
        pending: false,
      };
    case 'load':
      return { ...prevState, error: null, pending: true };
    default:
      return prevState;
  }
};

export const useOpeningHoursSourceIndex: OpeningHourseSourceIndexHook = ({
  indexUrl,
}) => {
  const [state, dispatch] = React.useReducer(
    openingHoursSourceIndexReducer,
    {}
  );
  const loadData = React.useCallback(
    async (abortController: AbortController) => {
      try {
        dispatch({ type: 'load' });
        const response = await fetch(indexUrl, {
          signal: abortController.signal,
        });

        const data = await response.json();

        if (!abortController.signal.aborted) {
          dispatch({ type: 'data', files: data.files, path: data.path });
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          dispatch({ type: 'error', error });
        }
      }
    },
    [indexUrl]
  );

  React.useEffect(() => {
    const abort = new AbortController();

    loadData(abort);

    return () => abort.abort();
  }, [loadData]);

  return React.useMemo<IOpeningHoursSourceIndex>(
    () => ({
      ...state,
      reloadData: loadData,
    }),
    [state, loadData]
  );
};
