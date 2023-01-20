import { PropsWithChildren, ReactNode } from "react";
import { Card } from "antd";

interface PageFooterProps {
  extra?: ReactNode;
}

const PageFooter = ({
  children,
  extra,
}: PageFooterProps & PropsWithChildren) => {
  return (
    <Card
      bordered={false}
      className="fixed bottom-0 h-20 left-0 right-0 p-0 z-50"
    >
      <div className="flex flex-row justify-center">
        {extra && <div className="absolute left-5">{extra}</div>}
        <div className="grid grid-cols-4 gap-4">{children}</div>
      </div>
    </Card>
  );
};

export default PageFooter;
