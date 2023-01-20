import { Form, FormItemProps, Input } from "antd";
import { Mode, NodeCommonProps } from "../types";

export interface TextAreaWidgetProps {
  maxLength?: number;
  showCount?: boolean;
}

export interface TextAreaFieldProps
  extends NodeCommonProps,
    TextAreaWidgetProps,
    FormItemProps {
  mode: Mode;
  value?: string;
  disabled?: boolean;
}

const ViewMode = ({ value }: Pick<TextAreaFieldProps, "value">) => {
  // TODO 内容过多折叠处理
  return <span>{value || "-"}</span>;
};

const TextAreaField = ({
  mode,
  value,
  disabled,
  prop,
  label,
  rules,
  fieldInTable,
  maxLength,
  showCount = true,
  dependencies,
}: TextAreaFieldProps) => {
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
        <Input.TextArea
          disabled={disabled}
          maxLength={maxLength}
          showCount={showCount}
          autoSize={{
            minRows: 3,
            maxRows: 3,
          }}
          value={value}
        ></Input.TextArea>
      )}
    </Form.Item>
  );
};

export default TextAreaField;
