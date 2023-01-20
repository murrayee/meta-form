import {
  useMemo,
  ReactNode,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useCallback,
} from "react";
import { FC } from "react";
import { Button, Form, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useMetaForm } from "../context/metaForm";
import { Mode, NodeCommonProps, StoreValue } from "../types";
import { TableProvider } from "../context/table";
import { ColumnRendererProps } from "./Column";
import { isArray, isNil } from "lodash";

// TODO 自定义列表key
export const __CUSTOM_UNSAFE_UNIQUE_KEY__ = "__CUSTOM_UNSAFE_UNIQUE_KEY__";

export type TableWidgetProps = {
  rowKey?: string;
  maxCount?: number;
};

export interface TableRendererProps extends NodeCommonProps {
  prop: string;
  mode?: Mode;
  addable?: boolean;
  summary?: (data: readonly StoreValue[]) => ReactNode;
}
const TableRenderer: FC<
  TableRendererProps & TableWidgetProps & PropsWithChildren
> = ({
  prop,
  mode,
  rowKey,
  addable = true,
  children,
  maxCount = 5,
  summary,
}) => {
  const { mode: parentMode, model, required: parentRequired } = useMetaForm();

  const isEditable = (mode || parentMode) === "edit";

  const tableSchema = model[prop];
  if (!children || !isArray(children)) {
    throw Error("Node table must be define column children.");
  }

  if (tableSchema.type !== "model[]") {
    throw Error("Table filed must be specified type as model[].");
  }

  const editableDefaultRow = useMemo(() => {
    const tableModel = tableSchema.model;
    return Object.keys(tableModel).reduce((prev, next) => {
      prev[next] = tableModel[next].default || undefined;
      // prev[__CUSTOM_UNSAFE_UNIQUE_KEY__] = uniqueId("_table_");
      return prev;
    }, {} as StoreValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO  more row & enhance cell props.
  const renderSummary = (dataSource: readonly StoreValue[]) => {
    if (!summary) return null;
    const { children: cellRenderer } = (summary?.(dataSource) as ReactElement)
      .props;
    const Cells = (cellRenderer as ReactElement[]).map((SummaryCell, index) => {
      const { index: cellIndex } = SummaryCell.props;
      return (
        <Table.Summary.Cell index={!isNil(cellIndex) ? cellIndex : index}>
          {cloneElement(SummaryCell, { dataSource })}
        </Table.Summary.Cell>
      );
    });
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>{Cells}</Table.Summary.Row>
      </Table.Summary>
    );
  };
  const getColumns = useCallback(
    (remove: (index: number | number[]) => void): ColumnsType<StoreValue> => {
      const enhancedColumns: ColumnsType = (children as ReactElement[]).map(
        (ColumnRender) => {
          const {
            width,
            formatter,
            fixed,
            ellipsis,
            prop: columnProp,
            showOnly,
            label = "",
            required,
          } = ColumnRender.props as ColumnRendererProps;

          const columnSchema = tableSchema.model[columnProp];
          const inheritRequired = required || parentRequired;
          const inheritLabel = label || columnSchema.label;

          const Title = (
            <span>
              {inheritRequired && isEditable && (
                <span style={{ color: "#ff4d4f" }} className="pr-1">
                  *
                </span>
              )}
              {inheritLabel}
            </span>
          );

          return {
            dataIndex: columnProp,
            formatter,
            fixed,
            ellipsis,
            align: "left",
            width,
            title: showOnly ? label : Title,
            render: (text, row, index) =>
              cloneElement(ColumnRender, { text, row, index }),
          };
        }
      );
      if (addable && isEditable) {
        enhancedColumns.push({
          title: "操作",
          width: 80,
          align: "center",
          dataIndex: "operation",
          fixed: "right",
          render: (_, __, index) => (
            <Button type="link" onClick={() => remove(index)}>
              删除
            </Button>
          ),
        });
      }
      return enhancedColumns;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addable, parentRequired, tableSchema.model, parentMode]
  );

  return (
    <Form.List
      name={prop}
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 1) {
              return Promise.reject(new Error("至少需要添加一个"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <TableProvider model={model} value={fields} prop={prop}>
          {isEditable && (
            <Button
              type="primary"
              ghost
              className="mb-3"
              onClick={() => add(editableDefaultRow)}
              disabled={fields.length === maxCount}
            >
              <PlusOutlined /> 新增
            </Button>
          )}
          <Table
            rowKey={rowKey || "key"}
            columns={getColumns(remove)}
            pagination={false}
            scroll={{ x: true }}
            dataSource={fields}
            summary={renderSummary}
          ></Table>

          <Form.ErrorList
            errors={errors.map((error) => (
              <span style={{ color: "red" }}>{error}</span>
            ))}
          ></Form.ErrorList>
        </TableProvider>
      )}
    </Form.List>
  );
};

export default TableRenderer;
