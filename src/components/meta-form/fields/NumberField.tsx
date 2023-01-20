import { Form, FormItemProps, InputNumber, Select } from "antd";
import { isNumber } from "lodash";
import { Mode, NodeCommonProps } from "../types";

type Unit =
  | "m²"
  | "%"
  | "$"
  | "￥"
  | "元"
  | "万元"
  | "currency-select"
  | (string & {});

export interface NumberWidgetProps {
  decimalsCount?: number;
  unit?: Unit;
}

export interface NumberFieldProps
  extends NodeCommonProps,
    NumberWidgetProps,
    FormItemProps {
  mode: Mode;
  value?: number;
  decimalsCount?: number;
}

const ViewMode = ({
  value,
  decimalsCount,
  unit,
}: Pick<NumberFieldProps, "value" | "decimalsCount" | "unit">) => {
  if (unit === "currency-select") {
    // TODO { currency, value }, 可选情况
    return <span>{isNumber(value) ? value.toFixed(decimalsCount) : "-"}</span>;
  }
  return (
    <span>
      {isNumber(value) ? value.toFixed(decimalsCount) : "-"} {unit}
    </span>
  );
};

const NumberField = ({
  mode,
  value,
  decimalsCount,
  prop,
  label,
  disabled,
  rules,
  fieldInTable,
  width = 220,
  dependencies,
  unit,
}: NumberFieldProps) => {
  const selectAfter = (
    <Select defaultValue="CNY" style={{ width: 60 }}>
      <Select.Option value="USD">$</Select.Option>
      <Select.Option value="EUR">€</Select.Option>
      <Select.Option value="GBP">£</Select.Option>
      <Select.Option value="CNY">¥</Select.Option>
    </Select>
  );

  return (
    <Form.Item
      rules={rules}
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      dependencies={dependencies}
    >
      {mode === "view" ? (
        <ViewMode decimalsCount={decimalsCount} unit={unit} />
      ) : (
        <InputNumber
          addonAfter={unit === "currency-select" ? selectAfter : unit}
          style={{ width }}
          className="w-full"
          disabled={disabled}
          value={value}
        ></InputNumber>
      )}
    </Form.Item>
  );
};

export default NumberField;
