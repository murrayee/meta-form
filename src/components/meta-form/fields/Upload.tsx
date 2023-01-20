import { InboxOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, UploadProps } from "antd";
import { Upload } from "antd";
import { uniqueId } from "lodash";
import { useCallback, useMemo } from "react";
import { NodeCommonProps } from "../types";

const { Dragger } = Upload;

export interface UploadWidgetProps extends UploadProps {}

export interface UploadPropsFieldProps
  extends NodeCommonProps,
    UploadWidgetProps,
    Omit<FormItemProps, "name" | "children"> {
  value?: string[];
}

const ViewMode = ({ value }: Pick<UploadPropsFieldProps, "value">) => {
  // TODO 自定义 预览模式样式
  const fileList = useMemo((): UploadProps["fileList"] => {
    return (value || []).map((href) => ({
      uid: uniqueId("__upload__"),
      name: `房屋设计稿${uniqueId("__upload__")}.png`,
      status: "done",
      url: href,
    }));
  }, [value]);
  return (
    <div className="flex flex-col">
      {fileList?.map((file) => (
        <div key={file.uid}>
          <Button type="link">
            <PaperClipOutlined /> {file.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

const UploadAdapter = ({
  name,
  multiple = true,
  action = "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  value,
  onChange,
  maxCount,
}: UploadProps & Pick<UploadPropsFieldProps, "value">) => {
  const onDrop = useCallback(() => {}, []);

  // TODO  implement upload by backend API.

  const fileList = useMemo((): UploadProps["fileList"] => {
    return (value || []).map((href) => ({
      uid: uniqueId("__upload__"),
      name: `房屋设计稿${uniqueId("__upload__")}.png`,
      status: "done",
      url: href,
    }));
  }, [value]);

  return (
    <Dragger
      name={name}
      multiple={multiple}
      action={action}
      fileList={fileList}
      onChange={onChange}
      onDrop={onDrop}
      maxCount={maxCount}
    >
      <p>
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Limit Size: 100M</p>
    </Dragger>
  );
};

const UploadField = ({
  prop,
  label,
  rules,
  mode,
  fieldInTable,
  dependencies,
  ...rest
}: UploadPropsFieldProps) => {  
  return (
    <Form.Item
      name={prop}
      label={!fieldInTable && label}
      validateFirst={true}
      rules={rules}
      dependencies={dependencies}
    >
      {mode === "view" ? <ViewMode /> : <UploadAdapter {...rest} />}
    </Form.Item>
  );
};

export default UploadField;
