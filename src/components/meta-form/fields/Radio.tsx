import { Form, FormItemProps, Radio } from "antd";
import { Mode, NodeCommonProps } from "../types";
import { findLabelByValue } from "../utils";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface RadioWidgetProps {
  options: Option[];
}

export interface RadioFieldProps
  extends NodeCommonProps,
    RadioWidgetProps,
    FormItemProps {
  mode: Mode;
  value?: string | number;
  disabled?: boolean;
}

const ViewMode = ({
  value,
  options,
}: Pick<RadioFieldProps, "value" | "options">) => {
  const label = findLabelByValue(value, options);
  return <span>{label || "-"}</span>;
};

const RadioField = ({
  mode,
  value,
  options,
  disabled,
  prop,
  label,
  rules,
  fieldInTable,
  dependencies,
}: RadioFieldProps) => {
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      dependencies={dependencies}
    >
      {mode === "view" ? (
        <ViewMode value={value} options={options} />
      ) : (
        <Radio.Group
          value={value}
          disabled={disabled}
          options={options}
        ></Radio.Group>
      )}
    </Form.Item>
  );
};

export default RadioField;
