import { FC, PropsWithChildren } from "react";

import { Mode } from "../types";

export type GroupRendererProps = {
  mode?: Mode;
  inline?: boolean;
};

const GroupRenderer: FC<GroupRendererProps & PropsWithChildren> = ({
  children,
}) => {
  return <div className="flex flex-wrap mb-4">{children}</div>;
};

export default GroupRenderer;
