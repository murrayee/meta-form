import { Checkbox, Col, Form, FormItemProps, Row } from "antd";
import { Mode, NodeCommonProps } from "../types";
import { findLabelByValue } from "../utils";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxWidgetProps {
  options: Option[];
}

export interface CheckboxFieldProps
  extends NodeCommonProps,
    CheckboxWidgetProps,
    FormItemProps {
  mode: Mode;
  value?: string[];
  disabled?: boolean;
  onChange?: () => void;
}

const ViewMode = ({
  value,
  options,
}: Pick<CheckboxFieldProps, "value" | "options">) => {
  const labels = findLabelByValue(value, options) as string[];
  return <span>{labels ? labels.join(",") : "-"}</span>;
};
const CheckboxGroupAdapter = ({
  onChange,
  disabled,
  value,
  options,
}: Pick<CheckboxFieldProps, "onChange" | "disabled" | "value" | "options">) => {
  return (
    <Checkbox.Group
      disabled={disabled}
      onChange={onChange}
      value={value}
      className="flex flex-wrap items-start"
    >
      <Row gutter={[20, 5]}>
        {options.map((option) => (
          <Col span={4} key={option.value}>
            <Checkbox disabled={option.disabled} value={option.value}>
              {option.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

const CheckboxField = ({
  mode,
  value,
  prop,
  label,
  rules,
  fieldInTable,
  dependencies,
  ...rest
}: CheckboxFieldProps) => {
  const isEditable = mode === "edit";
  return (
    <Form.Item
      name={prop}
      validateFirst={true}
      label={!fieldInTable && label}
      rules={rules}
      dependencies={dependencies}
    >
      {!isEditable ? (
        <ViewMode options={rest.options} />
      ) : (
        <CheckboxGroupAdapter {...rest} />
      )}
    </Form.Item>
  );
};

export default CheckboxField;
