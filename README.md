# hilla-i18n-prototype

Prototype implementation for a client-side I18n solution for Hilla.

- Based on a global `i18n` singleton and a `useI18n` hook
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
import { i18n, useI18n } from "@vaadin/i18n";

// Block app rendering with top-level await
await i18n.configure();

// Or render placeholder using initialized value
i18n.configure();

function App() {
  const { initialized } = useI18n();  
  return initialized 
    ? <RouterProvider />
    : <Loading />
}
```

**Translate Components**
```tsx
// Import useI18n hook to access translate function
// When language changes, hook updates internal state to trigger re-renders
import { useI18n } from "@vaadin/i18n";

function Form() {
  const { translate } = useI18n();
  return <>
    <TextField label={translate("form.name.label")} />
    ...
  </>
}

// Side effects or memoizations can use current language as dependency
import { useI18n } from "@vaadin/i18n";

const { translate, language } = useI18n();

useEffect(() => {
  document.title = translate("routes.form.pageTitle");
}, [language]);

const datePickerI18n = useMemo(() => {
  const monthNames = translate("vaadin.datePicker.monthNames");
  ...
}, [language]);
```

**Change language**
```tsx
import { i18n, useI18n } from "@vaadin/i18n";

// Get current language globally
const currentLanguage = i18n.language;

// Change language globally
i18n.setLanguage("de");

// Get current language from component
const { language } = useI18n();

// Change language from component
const { setLanguage } = useI18n();
setLanguage("de");
```

**Global side effects**
```tsx
import { i18n } from "@vaadin/i18n";

// I18n instance is an event target
i18n.addEventListener("language-changed", () => {
    document.title = i18n.translate("app.name");
});

// Or just keep these in app-level React components, and use useEffect
// with current language as seen above
```
