import { translate } from "Frontend/i18n";
import { FormLayout } from "@hilla/react-components/FormLayout";
import { TextField } from "@hilla/react-components/TextField.js";
import { EmailField } from "@hilla/react-components/EmailField";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import { Button } from "@hilla/react-components/Button";
import {
  DatePicker,
  DatePickerElement,
  DatePickerI18n,
} from "@hilla/react-components/DatePicker";
import { computed, Signal } from "@preact/signals-react";

// Compute signal for DatePicker I18N
export const datePickerI18n: Signal<DatePickerI18n> = computed(() => {
  const defaultI18n = new DatePickerElement().i18n;
  const monthNames = translate("vaadin.datePicker.monthNames").split(",");
  const weekdays = translate("vaadin.datePicker.weekdays").split(",");
  const weekdaysShort = translate("vaadin.datePicker.weekdaysShort").split(",");
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
});

// Could also be a React hook using language signal as dependency
/*
const useDatePickerI18n = () => {
  return useMemo(() => {
    const monthNames = translate("vaadin.datePicker.monthNames").split(",");
    ...
  }, [i18n.language.value]);
};
*/

export function FormView() {
  return (
    <div className="p-l flex flex-col gap-m">
      <h2>{translate("formView.header")}</h2>
      <FormLayout>
        <TextField label={translate("formView.name")} />
        <DatePicker
          label={translate("formView.dob")}
          i18n={datePickerI18n.value}
        />
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
