import { Button } from "antd";
import { useCallback } from "react";
import { useMetaForm } from "../../context/metaForm";
import { serialize } from "../../utils";

export interface SubmitButtonProps {
  text?: string;
  onSubmit?: () => {};
}

const Submit = ({ onSubmit, text = "提交" }: SubmitButtonProps) => {
  // 含有业务逻辑的提交

  const { form, model, raw = {} } = useMetaForm();

  const submit = useCallback(() => {
    form
      ?.validateFields()
      .then((values) => serialize(model, values, raw))
      .then((finalValues) => {
        console.log(finalValues);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  return (
    <Button type="primary" onClick={submit}>
      {text}
    </Button>
  );
};

export default Submit;
