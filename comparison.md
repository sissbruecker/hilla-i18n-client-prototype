# API Usage Examples

## Configuration

**Signals / Hook**

```tsx
import { i18n } from "@vaadin/i18n";

// Load initial translations
// Uses either last selected language or browser language by default
i18n.configure();

// Alternatively specify explicit language, e.g. from user profile
const profile = await UserEndpoint().getProfile();
i18n.configure({ language: profile?.language });
```

## Block app rendering

**Signals**

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
```

**Hook**

```tsx
import {i18n, useI18n} from "@vaadin/i18n";

// Block app rendering with top-level await
await i18n.configure();

// Or render placeholder using initialized value
i18n.configure();

function App() {
    const {initialized} = useI18n();
    return initialized
        ? <RouterProvider/>
        : <Loading/>
}

// Or use suspense, make hook suspend until initialized
function App() {
    return (
      <Suspense fallback={<Loading/>}>
        <RouterProvider/>
      </Suspense>
    );
}
```

## Translate Components

**Signals**

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

**Hook**

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

## Change language

**Signals**

```tsx
import { i18n } from "@vaadin/i18n";

// Get current language
// Should be read-only signal or just a getter
const currentLanguage = i18n.language.value;

// Change language
i18n.setLanguage("de");
```

**Hook**

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

## Global side effects

**Signals**

```tsx
import { translate } from "@vaadin/i18n";

// Need to use signal effect to react to language changes
effect(() => {
  document.title = translate("app.name");
});

// Or just keep these in app-level React components, and use useEffect
// with current language signal as seen above
```

**Hook**

```tsx
import { i18n } from "@vaadin/i18n";

// I18n instance is an event target
i18n.addEventListener("language-changed", () => {
    document.title = i18n.translate("app.name");
});

// Or just keep these in app-level React components, and use useEffect
// with current language as seen above
```

## Pros / Cons

**Signals**

- Implementation with global I18n state is straightforward
- Less verbose, no hooks calls
- Requires learning new concepts / signals API
- Support for suspense is unclear

**Hook**

- Integrating global I18n state with hooks requires a bit more effort
- Use of `useI18n` hook is slightly more verbose
- No new concepts / APIs to learn
- Aligns better with existing API like `useForm`
- Should be easy to support suspense
