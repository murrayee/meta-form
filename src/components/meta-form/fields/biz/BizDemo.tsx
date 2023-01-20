// biz field 的rules 需自己定义 透传进来的会ignore

import { Form, Select, Steps } from "antd";
import { Mode, NodeCommonProps, StoreValue } from "../../types";

interface CustomFieldCommonProps {
  value?: StoreValue;
  onChange?: (value: StoreValue) => void;
}

export interface BizDemoWidgetProps {}

export interface BizDemoFieldProps
  extends NodeCommonProps,
    BizDemoWidgetProps {}

interface ApproveInfoProps extends CustomFieldCommonProps {
  mode?: Mode;
}

const ApproveInfo = ({ value, onChange, mode }: ApproveInfoProps) => {
  // console.log(value);
  return (
    <Steps
      direction="vertical"
      size="small"
      current={2}
      items={[
        { title: "销售（王德发）已提交", description: "" },
        {
          title: "组长审批",
          description: "审批意见： 同意！",
        },
        {
          title: "店长处理中",
          description:
            mode === "edit" ? (
              <Select placeholder="请选择店长" allowClear>
                <Select.Option value="1">张三</Select.Option>
                <Select.Option value="2">李四</Select.Option>
                <Select.Option value="3">王五</Select.Option>
              </Select>
            ) : null,
        },
        {
          title: "区域总经理",
        },
      ]}
    />
  );
};

const BizDemo = ({ prop, mode }: BizDemoFieldProps) => {
  return (
    <Form.Item name={prop}>
      <ApproveInfo mode={mode} />
    </Form.Item>
  );
};

export default BizDemo;
