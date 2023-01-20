import { PropsWithChildren } from "react";
import { isBoolean } from "lodash";
import type { NodeCommonProps } from "../types";
import { FIELD_MAPPER } from "../fields";
import { useMetaForm } from "../context/metaForm";
import ErrorField from "./Error";
import { generateFieldRules } from "../utils/validators";

export interface FieldRendererProps extends NodeCommonProps {
  span?: 1 | 2 | 3;
}

type Props = PropsWithChildren & FieldRendererProps;

const FieldRenderer = ({
  children,
  prop,
  required,
  disabled,
  mode,
  span = 1,
}: Props) => {
  const { model, mode: parentMode, required: parentRequired } = useMetaForm();
  // updated

  const schema = model[prop];

  if (!schema || !schema.widget) {
    console.error("Field widget must be defined!");
    return <ErrorField />;
  }

  const width = `${span * 0.3 * 100}%`;

  const rules = generateFieldRules(
    schema.validators,
    isBoolean(required) ? required : parentRequired
  );
  const inheritMode = mode || parentMode;

  const enhancedProps = {
    ...(schema.widgetProps || {}),
    mode: inheritMode,
    label: schema.label,
    dependencies: schema.dependencies,
    disabled: disabled,
    prop,
    rules: inheritMode === "edit" ? rules : [],
  };
  if (schema.type === "model") {
    // TODO format value. be used biz schema.
    const Widget = FIELD_MAPPER[schema.widget];

    return (
      <div className="mr-5" style={{ width }}>
        <Widget {...enhancedProps}>{{ children }}</Widget>
      </div>
    );
  }
  if (schema.type === "model[]") {
    // TODO Scenario?
    return null;
  }

  const Widget = FIELD_MAPPER[schema.widget];
  return (
    <div className="mr-5" style={{ width }}>
      <Widget {...enhancedProps}></Widget>
    </div>
  );
};

export default FieldRenderer;
