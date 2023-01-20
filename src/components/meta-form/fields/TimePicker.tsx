import { Form, FormItemProps, TimePicker } from "antd";
import dayjs from "dayjs";

import { Mode, NodeCommonProps } from "../types";

export interface TimePickerWidgetProps {
  format?: string;
}
export interface TimePickerFieldProps
  extends NodeCommonProps,
    TimePickerWidgetProps,
    FormItemProps {
  mode: Mode;
  value?: number;
}

const ViewMode = ({
  value,
  format,
}: Pick<TimePickerFieldProps, "value" | "format">) => {
  return <span>{value ? dayjs(value).format(format) : "-"}</span>;
};

const TimePickerField = ({
  mode,
  value,
  format = "HH:mm:ss",
  prop,
  label,
  rules,
  fieldInTable,
  dependencies,
  width = 220,
}: TimePickerFieldProps) => {
  if (mode === "view") {
    return <ViewMode value={value} format={format} />;
  }
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      dependencies={dependencies}
    >
      <TimePicker
        style={{ width }}
        format={format}
        mode="date"
        disabled={false}
        placeholder="请选择时间"
        value={dayjs(value)}
      ></TimePicker>
    </Form.Item>
  );
};

export default TimePickerField;
