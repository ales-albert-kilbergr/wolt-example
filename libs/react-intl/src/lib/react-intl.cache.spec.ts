import {
  IReactIntlLocaleCache,
  ReactIntlLocaleStorage,
} from './react-intl.cache';
import { ReactIntlLocale } from './react-intl.locales';

describe('ReactIntlLocaleStorage', () => {
  describe('fromLocalStorage()', () => {
    it('should create a cache with local storage', () => {
      const storage = ReactIntlLocaleStorage.fromLocalStorage();

      expect(storage.getDriver()).toBe(localStorage);
    });
  });

  describe('fromSessionStorage()', () => {
    it('should create a cache with session storage', () => {
      const storage = ReactIntlLocaleStorage.fromSessionStorage();

      expect(storage.getDriver()).toBe(sessionStorage);
    });
  });

  describe('fromOption()', () => {
    it('should create a cache with session storage', () => {
      const storage: ReactIntlLocaleStorage = ReactIntlLocaleStorage.fromOption(
        'sessionStorage'
      ) as ReactIntlLocaleStorage;

      expect(storage.getDriver()).toBe(sessionStorage);
    });

    it('should create a cache with local storage', () => {
      const storage: ReactIntlLocaleStorage = ReactIntlLocaleStorage.fromOption(
        'localStorage'
      ) as ReactIntlLocaleStorage;

      expect(storage.getDriver()).toBe(localStorage);
    });

    it('should create from own storage', () => {
      const ownStorage = {} as any as IReactIntlLocaleCache;
      const storage = ReactIntlLocaleStorage.fromOption(
        ownStorage
      ) as ReactIntlLocaleStorage;

      expect(storage).toBe(ownStorage);
    });

    it('should return null if no storage is required', () => {
      const storage = ReactIntlLocaleStorage.fromOption();

      expect(storage).toBeNull();
    });
  });

  describe('get() and set()', () => {
    it('should store locale', async () => {
      const storage = ReactIntlLocaleStorage.fromSessionStorage();

      await expect(storage.get()).resolves.toBeUndefined();
      await storage.set(ReactIntlLocale.FR_FR);
      await expect(storage.get()).resolves.toBe(ReactIntlLocale.FR_FR);
    });

    it('should clear locale', async () => {
      const storage = ReactIntlLocaleStorage.fromSessionStorage();

      await storage.set(ReactIntlLocale.FR_FR);
      await expect(storage.get()).resolves.toBe(ReactIntlLocale.FR_FR);
      await storage.set(undefined);
      await expect(storage.get()).resolves.toBeUndefined();
    });
  });
});
