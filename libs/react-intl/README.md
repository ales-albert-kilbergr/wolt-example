<p align="center">
  <a href="https://wolt.com/" target="blank"><img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://restia.cz/wp-content/uploads/2020/06/Sticker_Wolt_Logo_RGB_.png" width="200" alt="Ebot7 Logo" /></a>
</p>
<p align="center">
  <a href="http://nx.dev/" target="blank">
    <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="32" alt="Nx"/>
  </a>
  <span>&nbsp;</span>
  <a href="https://www.typescriptlang.org/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1920px-Typescript_logo_2020.svg.png" height="32" alt="Typescript"/>
  </a>
  <span>&nbsp;</span>
  <a href="http://react.com/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="32" alt="Nest Logo" />
  </a>
</p>

# React INTL

- [React INTL](#react-intl)
  - [Usage](#usage)
  - [Testing](#testing)
  - [React Intl Controller](#react-intl-controller)
    - [Properties](#properties)
    - [Methods](#methods)
  - [React Intl Provider Error](#react-intl-provider-error)
    - [Error codes](#error-codes)

Library wraps `react-intl` and provide locale state management and an option to change locale during the application runtime.

## Usage

```tsx
import { ReactIntlControllerProvider, ReactIntlLocale } from '@wolt/react-intl';

function loadLocaleData(locale: ReactIntlLocale) {
  const normalizedLocale = locale.toLocaleLowerCase();

  return import(`./assets/compiled-intl/${normalizedLocale}.json`);
}

export const MyComponent = () => {
  return (
    <ReactIntlControllerProvider
      defaultLocale={ReactIntlLocale.EN_US}
      loadLocaleData={loadLocaleData}
    >
      {/* Exposes react intl controller to all children via context*/}
      ...
    </ReactIntlControllerProvider>
  );
};
```

## Testing

Run `yarn nx test react-intl`

## React Intl Controller

Controller exposes state and allow its manipulation to all child components.
| | | |
|---|---|---|
| a | b | c |

### Properties

| name               | type                                     | description                                                                          |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| **intlMessages**   | `ResolvedIntlConfig['messages'] \| null` | The `intlMessages` exposes currently used dictionary correspondig to current locale. |
| **defaultLocale**  | `ReactIntlLocale`                        | The `defaultLocale` expose what locale had been set as default                       |
| **enabledLocales** | `ReactIntlLocale[]`                      | The `enabledLocales` lists all available locales for application.                    |
| **currentLocale**  | `ReactIntlLocale`                        | The `currentLocale` is the currently applied locale                                  |

### Methods

| name                     | type                                             | description                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **setLocale**            | `(locale: ReactIntlLocale) => Promise<void>`     | The `setLocale` allows to change a current locale in application, which will result into rerender of all Formatted components and will load a dictionary according to provided locale.                                                                                                         |
| **handleSetLocaleClick** | `(event: React.MouseEvent<HTMLElement>) => void` | The `handleSetLocaleClick` is a helper method to be binded on an active element, which is meant to change the locale by mouse click, like a button. There is one requirement, the element MUST hold an attribute `data-locale` with a value which is supposed to be from ReactIntlLocale list. |

## React Intl Provider Error

Defines all well known errors which may occure inside of the hook. The typed error can be easily cached and procesed in error boudary compoments.

### Error codes

Error codes are listed as an enum `ReactIntlProviderErrorCode`

| Code                      | meaining                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `ERR_MISSING_DATA_LOCALE` | There is no data-locale attribute on element, which initiated a click event in order to set new current locale.                        |
| `ERR_INVALID_LOCALE`      | The locale provided to set the current or default locale is not in the list of enabled locales.                                        |
| `ERR_FETCH_CACHE_FAILED`  | An attempt to fetch current locale from cache failed. This error may occure specialy with custom current locale cache implementations. |
