import { Button } from "antd";
import { useMetaForm } from "../../context/metaForm";

export interface ResetButtonProps {
  text?: string;
  onReset?: () => {};
}

const Reset = ({ onReset, text = "重置" }: ResetButtonProps) => {
  const { form } = useMetaForm();
  return (
    <Button
      type="primary"
      ghost
      onClick={() => {
        form?.resetFields();
      }}
    >
      {text}
    </Button>
  );
};

export default Reset;
