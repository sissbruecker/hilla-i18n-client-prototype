import { Translations } from "Frontend/i18n/types";

export interface I18nBackend {
  loadTranslations(language: string): Promise<Translations>;
}

export class MockBackend implements I18nBackend {
  async loadTranslations(language: string): Promise<Translations> {
    if (!["en", "de"].includes(language)) {
      language = "en";
    }

    // Fake network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const module = await import(`./translations/${language}.json`);
    return module.default;
  }
}
