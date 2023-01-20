import { Cascader, Form, FormItemProps } from "antd";
import { StoreValue } from "antd/es/form/interface";
import { useQuery } from "react-query";
import { fetchRegions } from "../../../api/common";
import { NodeCommonProps } from "../types";

const emptyOptionsFunc = () => Promise.resolve([] as Option[]);

const CASCADER_PRESET_API: Record<RemoteCascaderType, CascaderRemoteApiType> = {
  region: fetchRegions,
  "": emptyOptionsFunc,
};

type CascaderRemoteApiType = () => Promise<Option[]>;

export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

type RemoteCascaderType = "region" | (string & {});

export interface CascaderWidgetProps {
  allowClear?: boolean;
  multiple?: boolean;
  options?: Option[];
  remote?: RemoteCascaderType;
  loading?: boolean;
}

export interface CascaderFieldProps
  extends NodeCommonProps,
    CascaderWidgetProps,
    FormItemProps {
  value?: string[];
  onChange?: (value: StoreValue) => void;
}

const ViewMode = ({
  value,
  multiple,
}: Pick<CascaderFieldProps, "value" | "multiple" | "options">) => {
  // const labels =
  if (multiple && typeof value === "object") {
    return <span>{value.join(",")}</span>;
  }
  return <span>{value || "-"}</span>;
};

const CascaderAdapter = ({
  multiple,
  disabled,
  allowClear,
  loading,
  options,
  width,
  value,
  onChange,
}: Pick<
  CascaderFieldProps,
  | "multiple"
  | "disabled"
  | "allowClear"
  | "options"
  | "width"
  | "value"
  | "onChange"
  | "loading"
>) => {
  return (
    <Cascader
      value={value}
      multiple={multiple}
      disabled={disabled}
      allowClear={allowClear}
      loading={loading}
      onChange={onChange}
      options={options}
      style={{ width }}
    ></Cascader>
  );
};

const CascaderField = ({
  mode,
  value,
  prop,
  label,
  rules,
  options,
  fieldInTable,
  dependencies,
  remote = "",
  ...rest
}: CascaderFieldProps) => {
  const { data: remoteOptions = [], isLoading } = useQuery(
    remote,
    CASCADER_PRESET_API[remote],
    {
      enabled: !!remote,
    }
  );

  const isEditable = mode === "edit";

  return (
    <Form.Item
      validateFirst={true}
      name={prop}
      label={!fieldInTable && label}
      dependencies={dependencies}
      rules={rules}
    >
      {!isEditable ? (
        <ViewMode
          value={value}
          multiple={rest.multiple}
          options={remoteOptions || options}
        />
      ) : (
        <CascaderAdapter
          {...rest}
          loading={isLoading}
          options={remoteOptions || options}
        />
      )}
    </Form.Item>
  );
};

export default CascaderField;
