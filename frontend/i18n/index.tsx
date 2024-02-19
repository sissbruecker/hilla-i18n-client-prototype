import { I18nBackend, MockBackend } from "./backend";
import { I18nStorage } from "./storage";
import type { I18nOptions, Translations } from "./types";
import { useEffect, useMemo, useState } from "react";

export class I18n extends EventTarget {
  private backend: I18nBackend = new MockBackend();
  private storage: I18nStorage = new I18nStorage();

  private _translations: Translations = {};
  private _language: string | undefined = undefined;
  private _initialized = false;

  async configure(options?: I18nOptions) {
    const initialLanguage = this.determineInitialLanguage(options);

    // Resolve with cached translations if the language is the same
    if (options?.cache !== false) {
      const cachedTranslations = this.storage.getCachedTranslations();
      if (cachedTranslations?.language === initialLanguage) {
        console.debug("I18N: Using cached translations");
        this._translations = cachedTranslations.translations;
        // Refresh translations asynchronously
        this.loadTranslations(initialLanguage).then(() => {
          console.debug("I18N: Done refreshing translations from backend");
        });
        this._language = initialLanguage;
        this._initialized = true;
        this.dispatchChange();
        return;
      }
    }

    // Otherwise load translations synchronously
    console.debug("I18N: Loading translations from backend");
    await this.loadTranslations(initialLanguage);
    this._language = initialLanguage;
    this._initialized = true;
    this.dispatchChange();
  }

  private determineInitialLanguage(options?: I18nOptions): string {
    // Start with explicitly set language
    let initialLanguage = options?.language;
    if (initialLanguage) {
      console.debug("I18N: Using explicitly set language:", initialLanguage);
      return initialLanguage;
    }

    // Fallback to last set language
    initialLanguage = this.storage.getLastUsedLanguage() || undefined;
    if (initialLanguage) {
      console.debug("I18N: Using last used language:", initialLanguage);
      return initialLanguage;
    }

    // Fallback to browser language
    initialLanguage = navigator.language;
    console.debug("I18N: Using browser language:", initialLanguage);

    return initialLanguage;
  }

  get language() {
    return this._language;
  }

  get initialized() {
    return this._initialized;
  }

  private async loadTranslations(newLanguage: string) {
    try {
      const newTranslations = await this.backend.loadTranslations(newLanguage);
      this._translations = newTranslations;
      this.storage.setCachedTranslations(newLanguage, newTranslations);
      this.dispatchChange();
    } catch (e) {
      // TODO proper error handling, maybe allow developer to hook into this
      console.error("Failed to load translations", e);
    }
  }

  async setLanguage(newLanguage: string) {
    // Skip if the language didn't change
    if (newLanguage === this._language) {
      return;
    }
    await this.loadTranslations(newLanguage);
    this._language = newLanguage;
    this.storage.setLastUsedLanguage(newLanguage);
    this.dispatchChange();
  }

  translate(key: string) {
    return this._translations[key] || key;
  }

  private dispatchChange() {
    this.dispatchEvent(new Event("change"));
  }
}

export const i18n = new I18n();

export function useI18n() {
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const handleChange = () => {
      setUpdate((prev) => prev + 1);
    };
    i18n.addEventListener("change", handleChange);
    return () => {
      i18n.removeEventListener("change", handleChange);
    };
  }, [i18n]);

  return useMemo(() => {
    return {
      translate: i18n.translate.bind(i18n),
      setLanguage: i18n.setLanguage.bind(i18n),
      language: i18n.language,
      initialized: i18n.initialized,
    };
  }, [update]);
}
