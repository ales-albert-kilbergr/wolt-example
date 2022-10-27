import {
  enabledLocaleToArray,
  isValidLocale,
  ReactIntlLocale,
} from './react-intl.locales';
describe('enabledLocaleToArray()', () => {
  it('should return an array of enabled locales', () => {
    const locales = enabledLocaleToArray();

    expect(locales).toEqual(['de-DE', 'en-US', 'fr-FR']);
  });
});

describe('isValidLocale()', () => {
  it('should fail if invalid locale is provided', () => {
    expect(isValidLocale('nonsense')).toBeFalsy();
  });

  it('should succeed if correct locale is provided', () => {
    expect(isValidLocale(ReactIntlLocale.EN_US)).toBeTruthy();
  });
});
