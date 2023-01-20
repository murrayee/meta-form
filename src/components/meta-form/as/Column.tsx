import { StoreValue } from "antd/es/form/interface";
import { FC, PropsWithChildren } from "react";
import { useMetaForm } from "../context/metaForm";
import { useTable } from "../context/table";
import { BaseFieldType, BASE_FIELD_MAPPER } from "../fields";
import { Mode, NodeCommonProps } from "../types";
import { generateFieldRules } from "../utils/validators";
import ErrorField from "./Error";

export interface ColumnRendererProps extends NodeCommonProps {
  mode?: Mode;
  formatter?: () => void;
  width?: number;
  row?: StoreValue;
  text?: StoreValue;
  index?: number;
}
const ColumnRenderer: FC<ColumnRendererProps & PropsWithChildren> = ({
  prop,
  mode,
  disabled,
  required,
  formatter,
  showOnly,
  width = 180,
  children,
  row,
}) => {
  const { prop: parentProp, model } = useTable();
  const { mode: parentMode, required: parentRequired } = useMetaForm();

  const tableSchema = model[parentProp];

  if (tableSchema.type !== "model[]") {
    throw Error("Field type must be defined!");
  }
  if (showOnly) {
    if (children) {
      return <div style={{ width }}>{children}</div>;
    }
    return <ErrorField />;
  }
  const schema = tableSchema.model[prop as string];

  const rules = generateFieldRules(
    schema.validators,
    required || parentRequired
  );

  const enhancedColumnProp = [row?.name, prop];
  const enhancedProps = {
    ...(schema.widgetProps || {}),
    mode: mode || parentMode,
    label: schema.label,
    dependencies: schema.dependencies,
    disabled: disabled,
    rules,
    fieldInTable: true,
    width,
    prop: enhancedColumnProp,
  };

  if (!schema) {
    return <ErrorField />;
  }
  const Widget = BASE_FIELD_MAPPER[schema.widget as BaseFieldType];

  return <Widget {...enhancedProps}></Widget>;
};
export default ColumnRenderer;
