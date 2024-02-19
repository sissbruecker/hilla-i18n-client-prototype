import { FormLayout } from "@hilla/react-components/FormLayout";
import { TextField } from "@hilla/react-components/TextField.js";
import { EmailField } from "@hilla/react-components/EmailField";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import { Button } from "@hilla/react-components/Button";
import {
  DatePicker,
  DatePickerElement,
} from "@hilla/react-components/DatePicker";
import { useI18n } from "Frontend/i18n";
import { useMemo } from "react";

const useDatePickerI18n = () => {
  const { translate, language } = useI18n();

  return useMemo(() => {
    const defaultI18n = new DatePickerElement().i18n;
    const monthNames = translate("vaadin.datePicker.monthNames").split(",");
    const weekdays = translate("vaadin.datePicker.weekdays").split(",");
    const weekdaysShort = translate("vaadin.datePicker.weekdaysShort").split(
      ",",
    );
    const firstDayOfWeek = parseInt(
      translate("vaadin.datePicker.firstDayOfWeek"),
    );
    const today = translate("vaadin.datePicker.today");
    const cancel = translate("vaadin.datePicker.cancel");

    return {
      ...defaultI18n,
      monthNames,
      weekdays,
      weekdaysShort,
      firstDayOfWeek,
      today,
      cancel,
    };
  }, [language]);
};

export function FormView() {
  const { translate } = useI18n();
  const datePickerI18n = useDatePickerI18n();

  return (
    <div className="p-l flex flex-col gap-m">
      <h2>{translate("formView.header")}</h2>
      <FormLayout>
        <TextField label={translate("formView.name")} />
        <DatePicker label={translate("formView.dob")} i18n={datePickerI18n} />
        <EmailField label={translate("formView.email")} />
        <TextField label={translate("formView.street")} />
        <TextField label={translate("formView.city")} />
        <TextField label={translate("formView.country")} />
      </FormLayout>
      <HorizontalLayout>
        <Button theme="primary">{translate("formView.submit")}</Button>
      </HorizontalLayout>
    </div>
  );
}
