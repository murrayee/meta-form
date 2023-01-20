import { Form, FormItemProps, Input } from "antd";
import { NodeCommonProps } from "../types";

export interface TextWidgetProps {
  maxLength?: number;
}

export interface TextFieldProps
  extends NodeCommonProps,
    TextWidgetProps,
    FormItemProps {
  value?: string;
}
const ViewMode = ({ value }: Pick<TextFieldProps, "value">) => {
  // TODO 内容过多省略号 tooltip
  return <span>{value || "-"}</span>;
};

const TextField = ({
  mode,
  prop,
  label,
  width = 220,
  maxLength,
  disabled,
  rules,
  fieldInTable,
  dependencies,
}: TextFieldProps) => {
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      dependencies={dependencies}
    >
      {mode === "view" ? (
        <ViewMode />
      ) : (
        <Input disabled={disabled} style={{ width }} maxLength={maxLength} />
      )}
    </Form.Item>
  );
};

export default TextField;
