// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { ReactIntlLocale } from '@wolt/react-intl';

export const environment = {
  production: false,
  defaultLocale: ReactIntlLocale.EN_US,
  openingHoursSourceIndexUrl: '/assets/source-data/index.json',
  openingHoursSourceSchemaUrl: '/assets/opening-hours.schema.json',
};
