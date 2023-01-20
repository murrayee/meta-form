import { Button } from "antd";

export interface DeleteButtonProps {
  text?: string;
  onDelete?: () => {};
}

const Delete = ({ onDelete, text = "删除" }: DeleteButtonProps) => {
  return (
    <Button type="default" danger onClick={onDelete}>
      {text}
    </Button>
  );
};

export default Delete;
