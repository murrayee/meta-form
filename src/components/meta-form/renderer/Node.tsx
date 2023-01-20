import { PropsWithChildren } from "react";
import {
  NodeType,
  ContainerRendererProps,
  FieldRendererProps,
  BizFieldRendererProps,
  ColumnRendererProps,
  GroupRendererProps,
  SectionRendererProps,
  TableRendererProps,
  SubmitButtonProps,
  CancelButtonProps,
  ResetButtonProps,
  DeleteButtonProps,
  Submit,
  Cancel,
  Reset,
  Delete,
  FieldRenderer,
  BizFieldRenderer,
  GroupRenderer,
  TableRenderer,
  ColumnRenderer,
  SectionRenderer,
  ContainerRenderer,
  ErrorRenderer,
  SummaryRendererProps,
  SummaryRenderer,
} from "../as";

interface CommonProps<T extends NodeType> {
  as: T;
}

export type GenerateProps<T extends NodeType> = T extends "table"
  ? TableRendererProps
  : T extends "column"
  ? ColumnRendererProps
  : T extends "summary"
  ? SummaryRendererProps
  : T extends "container"
  ? ContainerRendererProps
  : T extends "field"
  ? FieldRendererProps
  : T extends "biz-field"
  ? BizFieldRendererProps
  : T extends "group"
  ? GroupRendererProps
  : T extends "section"
  ? SectionRendererProps
  : T extends "submit"
  ? SubmitButtonProps
  : T extends "cancel"
  ? CancelButtonProps
  : T extends "reset"
  ? ResetButtonProps
  : T extends "delete"
  ? DeleteButtonProps
  : unknown;

export type NodeProps =
  | (TableRendererProps & CommonProps<"table">)
  | (ColumnRendererProps & CommonProps<"column">)
  | (SummaryRendererProps & CommonProps<"summary">)
  | (ContainerRendererProps & CommonProps<"container">)
  | (FieldRendererProps & CommonProps<"field">)
  | (BizFieldRendererProps & CommonProps<"biz-field">)
  | (GroupRendererProps & CommonProps<"group">)
  | (SectionRendererProps & CommonProps<"section">)
  | (SubmitButtonProps & CommonProps<"submit">)
  | (CancelButtonProps & CommonProps<"cancel">)
  | (ResetButtonProps & CommonProps<"reset">)
  | (DeleteButtonProps & CommonProps<"delete">);

const Node = (props: NodeProps & PropsWithChildren) => {
  const { as, children, ...restProps } = props;

  if (!as) {
    throw Error("Node type must be specified!");
  }

  if (as === "submit") {
    const submitProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <Submit {...submitProps} />;
  }

  if (as === "cancel") {
    const cancelProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <Cancel {...cancelProps} />;
  }
  if (as === "reset") {
    const resetProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <Reset {...resetProps} />;
  }
  if (as === "delete") {
    const deleteProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <Delete {...deleteProps} />;
  }

  if (as === "table") {
    const tableProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <TableRenderer {...tableProps}>{children}</TableRenderer>;
  }

  if (as === "column") {
    const columnProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <ColumnRenderer {...columnProps}>{children}</ColumnRenderer>;
  }

  if (as === "summary") {
    const columnProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <SummaryRenderer {...columnProps}>{children}</SummaryRenderer>;
  }

  if (as === "container") {
    const tableProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <ContainerRenderer {...tableProps}>{children}</ContainerRenderer>;
  }

  if (as === "section") {
    const sectionProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <SectionRenderer {...sectionProps}>{children}</SectionRenderer>;
  }

  if (as === "group") {
    const groupProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <GroupRenderer {...groupProps}>{children}</GroupRenderer>;
  }

  if (as === "field") {
    const fieldProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <FieldRenderer {...fieldProps}>{children}</FieldRenderer>;
  }

  if (as === "biz-field") {
    const fieldProps = {
      ...restProps,
    } as GenerateProps<typeof as>;
    return <BizFieldRenderer {...fieldProps}>{children}</BizFieldRenderer>;
  }

  return <ErrorRenderer />;
};

export default Node;
