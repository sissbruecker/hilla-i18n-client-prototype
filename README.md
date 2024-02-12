# hilla-i18n-prototype

Prototype implementation for a client-side I18n solution for Hilla.

- Based on signals
- Simple API using only an imported `translate` function
- Allows to change language on the fly
- Loads initial translations for browser language, last used language or explicitly configured language
- Caches translations for last used language to improve time to render, updates translations and cache asynchronously after


**Configuration**
```tsx
import { i18n } from "@vaadin/i18n";

// Load initial translations
// Uses either last selected language or browser language by default
i18n.configure();

// Alternatively specify explicit language, e.g. from user profile
const profile = await UserEndpoint().getProfile();
i18n.configure({ language: profile?.language });
```

**Block app rendering**
```tsx
import { i18n } from "@vaadin/i18n";

// Block app rendering with top-level await
await i18n.configure();

// Or render placeholder using initialized signal
i18n.configure();

function App() {
  return i18n.initialized.value 
    ? <RouterProvider />
    : <Loading />
}

// Could also be a provider? Only syntax sugar as there is no state involved
import { I18nProvider } from "@vaadin/i18n";

function App() {
  return (
    <I18nProvider fallback={<Loading/>}>
      <RouterProvider />
    <I18nProvider />
  );
}
```

**Translate Components**
```tsx
// Import translate function, then use it
// translate accesses signal internally, causing components to 
// re-render if language changes
import { translate } from "@vaadin/i18n";

function Form() {
  return <>
    <TextField label={translate("form.name.label")} />
    ...
  </>
}

// Side effects or memoizations can use signal specific hooks
useSignalEffect(() => {
  document.title = translate("routes.form.pageTitle");
});

const datePickerI18n = useComputed(() => {
  const monthNames = translate("vaadin.datePicker.monthNames");
  ...
});

// Or use regular hooks with current language signal as dependency
import { i18n } from "@vaadin/i18n";

useEffect(() => {
  document.title = translate("routes.form.pageTitle");
}, [i18n.language.value]);

const datePickerI18n = useMemo(() => {
  const monthNames = translate("vaadin.datePicker.monthNames");
  ...
}, [i18n.language.value]);
```

**Change language**
```tsx
import { i18n } from "@vaadin/i18n";

// Get current language
// Should be read-only signal or just a getter
const currentLanguage = i18n.language.value;

// Change language
i18n.setLanguage("de");
```

**Global side effects**
```tsx
import { translate } from "@vaadin/i18n";

// Need to use signal effect to react to language changes
effect(() => {
  document.title = translate("app.name");
});

// Or just keep these in app-level React components, and use useEffect
// with current language signal as seen above
```
