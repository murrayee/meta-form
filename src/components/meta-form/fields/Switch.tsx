import { Form, FormItemProps, Switch, SwitchProps } from "antd";
import { Mode, NodeCommonProps } from "../types";

export interface SwitchWidgetProps extends SwitchProps {}

export interface SwitchFieldProps
  extends NodeCommonProps,
    SwitchWidgetProps,
    FormItemProps {
  mode: Mode;
  checked?: boolean;
  disabled?: boolean;
}

const ViewMode = ({ checked }: Pick<SwitchFieldProps, "checked">) => {
  return <span>{checked ? "是" : "否"}</span>;
};

const SwitchField = ({
  mode,
  disabled,
  prop,
  label,
  rules,
  fieldInTable,
  checkedChildren,
  unCheckedChildren,
  dependencies,
}: SwitchFieldProps) => {
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      valuePropName="checked"
      dependencies={dependencies}
    >
      {mode === "view" ? (
        <ViewMode />
      ) : (
        <Switch
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          disabled={disabled}
        ></Switch>
      )}
    </Form.Item>
  );
};

export default SwitchField;
