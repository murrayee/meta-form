import { Form } from "antd";
import { useMetaForm } from "../context/metaForm";
import { NamePath, Schema, StoreValue } from "../types";

interface NodeProviderProps {
  name: string | NamePath;
  children?: ({ value }: { value: StoreValue; schema?: Schema }) => JSX.Element;
}

// TODO 兼容 数组 和 model. 当前字段的rules  if needed?
const NodeProvider = ({ name, children }: NodeProviderProps) => {
  const { form, model } = useMetaForm();

  const value = Form.useWatch(name, form);
  if (!children || typeof children !== "function") {
    throw Error("children must be  a function");
  }

  return children?.({
    value,
    schema: model[name as string],
  });
};

export default NodeProvider;
