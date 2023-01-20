import { DatePicker, Form, FormItemProps } from "antd";
import { StoreValue } from "antd/es/form/interface";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { NodeCommonProps } from "../types";

export interface DatePickerWidgetProps {
  format?: string;
  disabledDate?: (currentDate: StoreValue) => boolean;
}

export interface DatePickerFieldProps
  extends NodeCommonProps,
    DatePickerWidgetProps,
    FormItemProps {
  value?: number | Dayjs;
}

const ViewMode = ({
  value,
  format,
}: Pick<DatePickerFieldProps, "value" | "format">) => {
  return <span>{value ? dayjs(value).format(format) : "-"}</span>;
};

const DatePickerAdapter = ({
  value,
  onChange,
  format = "YYYY-MM-DD",
  disabled,
  width = 220,
  disabledDate,
}: {
  onChange?: (value: number) => void;
} & Pick<
  DatePickerFieldProps,
  "value" | "disabled" | "width" | "format" | "disabledDate"
>) => {
  const [currentValue, setValue] = useState<Dayjs | null>(null);

  const handleChange = useCallback(
    (date: StoreValue | null, dateString: string) => {
      const timestamp = dayjs(dateString).valueOf();
      setValue(date);
      onChange?.(timestamp);
    },
    [onChange]
  );
  const formattedValue = value ? dayjs(value) : null;

  return (
    <DatePicker
      style={{ width }}
      format={format}
      mode="date"
      value={currentValue || formattedValue}
      disabledDate={disabledDate}
      className="w-full"
      disabled={disabled}
      placeholder="请选择日期"
      onChange={handleChange}
    ></DatePicker>
  );
};

const DatePickerField = ({
  mode,
  format = "YYYY-MM-DD",
  prop,
  label,
  disabled,
  rules = [],
  fieldInTable,
  width = 220,
  dependencies,
  disabledDate,
}: DatePickerFieldProps) => {
  const isEditable = mode === "edit";

  return (
    <Form.Item
      name={prop}
      validateFirst={true}
      rules={isEditable ? rules : []}
      label={!fieldInTable && label}
      dependencies={dependencies}
    >
      {!isEditable ? (
        <ViewMode format={format} />
      ) : (
        <DatePickerAdapter
          format={format}
          disabledDate={disabledDate}
          disabled={disabled}
          width={width}
        ></DatePickerAdapter>
      )}
    </Form.Item>
  );
};

export default DatePickerField;
