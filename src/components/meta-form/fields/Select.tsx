import { Form, FormItemProps, Select } from "antd";
import { BaseValueType, Mode, NodeCommonProps } from "../types";
import { findLabelByValue } from "../utils";

interface Option {
  label: string;
  value: BaseValueType;
}

export interface SelectWidgetProps {
  allowClear?: boolean;
  maxTagCount?: number | "responsive";
  multiple?: boolean;
  options?: Option[];
}

export interface SelectFieldProps
  extends NodeCommonProps,
    SelectWidgetProps,
    FormItemProps {
  mode?: Mode;
  value?: BaseValueType | BaseValueType[];
  disabled?: boolean;
}

const ViewMode = ({
  value,
  multiple,
  options,
}: Pick<SelectFieldProps, "value" | "multiple" | "options">) => {
  const label = findLabelByValue(value, options || []);
  if (multiple && typeof label === "object") {
    return <span>{label ? label.join(",") : "-"}</span>;
  }
  return <span>{label || "-"}</span>;
};

const SelectField = ({
  mode,
  multiple,
  maxTagCount,
  allowClear,
  disabled,
  prop,
  label,
  rules,
  options,
  fieldInTable,
  dependencies,
  width = 220,
}: SelectFieldProps) => {
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      dependencies={dependencies}
    >
      {mode === "view" ? (
        <ViewMode options={options} />
      ) : (
        <Select
          mode={multiple ? "multiple" : undefined}
          disabled={disabled}
          maxTagCount={maxTagCount}
          allowClear={allowClear}
          options={options}
          style={{ width }}
        ></Select>
      )}
    </Form.Item>
  );
};

export default SelectField;
