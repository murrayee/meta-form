import { FormInstance } from "antd";
import { Mode } from "fs";
import { createContext, useContext, PropsWithChildren } from "react";
import { Model, StoreObjectValues, StoreValue } from "../types";

const defaultValues = {
  raw: undefined,
  model: {},
  mode: "edit",
  form: undefined,
  required: false,
  initialValues: null,
  loading: false,
};
export interface MetaFormContextValues {
  raw: StoreObjectValues | undefined;
  model: Model;
  mode?: Mode;
  form: FormInstance | undefined;
  required?: boolean;
  initialValues?: StoreValue;
  loading?: boolean;
}
export const MetaFormContext =
  createContext<MetaFormContextValues>(defaultValues);

const MetaFormProvider = ({
  children,
  ...values
}: PropsWithChildren & MetaFormContextValues) => {
  return (
    <MetaFormContext.Provider value={{ ...values }}>
      {children}
    </MetaFormContext.Provider>
  );
};

const useMetaForm = (
  options: {
    onFieldsChange: (values: StoreValue) => void;
  } | null = null
) => {
  const values = useContext(MetaFormContext);

  return {
    ...values,
  };
};

export { useMetaForm, MetaFormProvider };
