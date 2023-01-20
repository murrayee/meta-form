import { FC, PropsWithChildren } from "react";
import { Collapse, Skeleton } from "antd";
import { Mode } from "../types";
import { useMetaForm } from "../context/metaForm";

const { Panel } = Collapse;

export type SectionRendererProps = {
  mode?: Mode;
  inline?: boolean;
  title: string;
};

const Section: FC<SectionRendererProps & PropsWithChildren> = ({
  children,
  title,
}) => {
  const { loading } = useMetaForm();

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      defaultActiveKey={"1"}
      collapsible={"icon"}
    >
      <Panel header={<span className="font-medium">{title}</span>} key="1">
        {loading ? <Skeleton /> : children}
      </Panel>
    </Collapse>
  );
};

export default Section;
