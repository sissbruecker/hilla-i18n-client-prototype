import {
  Select,
  SelectChangeEvent,
  SelectItem,
} from "@hilla/react-components/Select";
import { useI18n } from "Frontend/i18n";
import { useMemo } from "react";

export function LanguageSelect() {
  const { translate, language, setLanguage } = useI18n();

  // Using regular React hook to react to language changes
  const languageOptions: SelectItem[] = useMemo(() => {
    return [
      {
        label: translate("languageSelect.language.en"),
        value: "en",
      },
      {
        label: translate("languageSelect.language.de"),
        value: "de",
      },
    ];
  }, [language]);

  const handleChange = (e: SelectChangeEvent) => {
    // Switch language in i18n instance
    setLanguage(e.target.value);
  };

  return (
    <Select
      theme="small"
      label={translate("languageSelect.label")}
      items={languageOptions}
      value={language}
      onChange={handleChange}
    ></Select>
  );
}
