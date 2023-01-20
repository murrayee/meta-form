import { FC, PropsWithChildren, useEffect } from "react";
import { Form } from "antd";
import { Model, Mode, StoreObjectValues, StoreValue } from "../types";
import { MetaFormProvider } from "../context/metaForm";
import { deserialize, genInitialValues } from "../utils/index";

export interface ContainerRendererProps {
  model: Model;
  mode?: Mode;
  colon?: boolean;
  raw: StoreObjectValues | undefined;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  labelWrap?: boolean;
  scrollToFirstError?: boolean;
  size?: "small" | "middle" | "large";
  validateMessages?: {};
  onFieldsChange?: (
    changedFields: StoreValue[],
    allFields: StoreValue[]
  ) => void;
  onValuesChange?: (changedValues: StoreValue[], values: StoreValue[]) => void;
  onFinish?: (values: StoreValue) => void;
  onFinishFailed?: (errorInfo: StoreValue) => void;
}

const ContainerRenderer: FC<PropsWithChildren & ContainerRendererProps> = ({
  model,
  children,
  raw,
  mode,
  colon = true,
  labelWrap = true,
  name,
  disabled,
  required,
  loading,
  scrollToFirstError = true,
  validateMessages,
  onFinish,
  onFinishFailed,
  onValuesChange,
  onFieldsChange,
}) => {
  const [form] = Form.useForm();

  const initialValues = genInitialValues(model);

  useEffect(() => {
    if (raw) {
      form.setFieldsValue(deserialize(model, raw));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, raw]);

  const contextValues = {
    model,
    raw,
    mode,
    form,
    required,
    disabled,
    initialValues,
    loading,
  };

  return (
    <div className="bg-white p-5 rounded-md pb-24">
      <MetaFormProvider {...contextValues}>
        <Form
          name={name}
          form={form}
          colon={colon}
          disabled={disabled}
          initialValues={initialValues}
          labelWrap={labelWrap}
          labelAlign={"left"}
          validateMessages={validateMessages}
          scrollToFirstError={scrollToFirstError}
          onFieldsChange={onFieldsChange}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {children}
        </Form>
      </MetaFormProvider>
    </div>
  );
};

export default ContainerRenderer;
