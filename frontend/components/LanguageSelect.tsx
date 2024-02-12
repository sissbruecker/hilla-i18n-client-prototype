import {
  Select,
  SelectChangeEvent,
  SelectItem,
} from "@hilla/react-components/Select";
import { i18n, translate } from "Frontend/i18n";
import { useMemo } from "react";

export function LanguageSelect() {
  const currentLanguage = i18n.language.value;

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
  }, [currentLanguage]);

  const handleChange = (e: SelectChangeEvent) => {
    // Switch language in i18n instance
    i18n.setLanguage(e.target.value);
  };

  return (
    <Select
      theme="small"
      label={translate("languageSelect.label")}
      items={languageOptions}
      value={currentLanguage}
      onChange={handleChange}
    ></Select>
  );
}
