import { Button } from "antd";

export interface CancelButtonProps {
  text?: string;
  onCancel?: () => void;
}

const Cancel = ({ onCancel, text = "取消" }: CancelButtonProps) => {
  return (
    <Button type="default" onClick={onCancel}>
      {text}
    </Button>
  );
};

export default Cancel;
