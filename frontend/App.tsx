import router from "Frontend/routes.js";
import { RouterProvider } from "react-router-dom";
import { i18n } from "Frontend/i18n";

// Use blocking top level await to initialize i18n before rendering the app
await i18n.configure({
  // Specify an explicit language instead of using auto-detection or last used language
  // language: "de",
  // Disable client-side caching
  // cache: false,
});

export default function App() {
  return <RouterProvider router={router} />;
}

// Alternatively don't block and show a placeholder until i18n is initialized
/*
i18n.configure({
 cache: false,
});

export default function App() {
  if (!i18n.initialized.value) {
    return <Placeholder />;
  }

  return <RouterProvider router={router} />;
}
*/
