import { cloneElement, Fragment, PropsWithChildren } from "react";

import { useTable } from "../context/table";
import { StoreValue } from "../types";

export interface SummaryRendererProps {
  formatter?: (dataSource: StoreValue[]) => string | number | JSX.Element;
  index?: number;
  dataSource?: StoreValue[];
}
const SummaryRenderer = ({
  children,
  formatter,
  dataSource = [],
}: SummaryRendererProps & PropsWithChildren) => {
  const { prop: parentProp, model } = useTable();

  // preset summary type or others format here.

  const tableSchema = model[parentProp];

  if (tableSchema.type !== "model[]") {
    throw Error("Field type must be defined!");
  }

  if (children) {
    return cloneElement(<Fragment>{children}</Fragment>);
  }

  return <Fragment>{formatter?.(dataSource)}</Fragment>;
};
export default SummaryRenderer;
