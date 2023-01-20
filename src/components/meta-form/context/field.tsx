import { createContext, PropsWithChildren, useContext } from "react";
import { Model } from "../types";

const defaultValues = {
  model: {},
  onChange: () => {},
};

interface FieldContextValues {
  model: Model;
  onChange: () => void;
}
export const FieldContext = createContext<FieldContextValues>(defaultValues);

const FieldProvider = ({
  model,
  children,
  onChange,
}: PropsWithChildren & FieldContextValues) => {
  return (
    <FieldContext.Provider
      value={{
        model,
        onChange,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};

const useField = ({ prop }: { prop: string }) => {
  const { model, onChange } = useContext(FieldContext);
  const schema = model[prop];
  return {
    model,
    onChange,
    schema,
    prop,
  };
};

export { useField, FieldProvider };
