import { ReactIntlLocale } from '@wolt/react-intl';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { OpeningHoursApp } from './app/opening-hours-app.component';
import { environment } from './environments/environment';

function loadLocaleData(locale: ReactIntlLocale) {
  const normalizedLocale = locale.toLocaleLowerCase();

  return import(`./assets/compiled-intl/${normalizedLocale}.json`);
}

function main() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <StrictMode>
      <OpeningHoursApp
        loadLocaleData={loadLocaleData}
        defaultLocale={environment.defaultLocale}
        sourceIndexUrl={environment.openingHoursSourceIndexUrl}
        sourceSchemaUrl={environment.openingHoursSourceSchemaUrl}
      />
    </StrictMode>
  );
}

try {
  main();
} catch (error) {
  // Last (top) error handler
  console.error(error);
}
