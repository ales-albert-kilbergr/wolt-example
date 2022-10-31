import * as React from 'react';
import { WoltUiProvider } from '@wolt/ui';
import {
  IReactIntlControllerProviderProps,
  ReactIntlControllerProvider,
} from '@wolt/react-intl';
import {
  IOpeningHoursMainViewProps,
  OpeningHoursMainView,
} from './opening-hours.view.component';

export interface IOpeningHoursAppProps extends IOpeningHoursMainViewProps {
  loadLocaleData: IReactIntlControllerProviderProps['loadLocaleData'];
  defaultLocale: IReactIntlControllerProviderProps['defaultLocale'];
}

export type OpeningHoursAppComponent = React.FC<IOpeningHoursAppProps>;

export const OpeningHoursApp: OpeningHoursAppComponent = ({
  loadLocaleData,
  defaultLocale,
  ...props
}) => {
  return (
    <WoltUiProvider>
      <ReactIntlControllerProvider
        loadLocaleData={loadLocaleData}
        defaultLocale={defaultLocale}
      >
        <OpeningHoursMainView {...props} />
      </ReactIntlControllerProvider>
    </WoltUiProvider>
  );
};

OpeningHoursApp.displayName = 'OpeningHoursApp';

OpeningHoursApp.defaultProps = {};
