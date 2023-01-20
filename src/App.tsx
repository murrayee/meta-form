import { Fragment, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Node, NodeProvider } from "./components/meta-form";
import PageFooter from "./components/PageFooter";
import PageWrapper from "./components/PageWrapper";
import { fetchDecorationApplication } from "./api/test";
import { QUERY_DATA_KEY } from "./store/query";
import model from "./model";
import { Mode } from "./components/meta-form/types";
import { Divider } from "antd";

function calculateTotal(dataSource: any[]) {
  return "60000￥";
}

function App() {
  const [mode, setMode] = useState<Mode>("view");

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    QUERY_DATA_KEY.USER_DECORATION,
    fetchDecorationApplication
  );

  return (
    <PageWrapper
      onEdit={() => {
        setMode("edit");
      }}
    >
      {/* // FormRenderer  */}

      <Node
        as="container"
        name="decoration-application"
        model={model}
        mode={mode}
        raw={data}
        required
        loading={isLoading}
        onFieldsChange={() => {
          // console.log(fields);
        }}
        onValuesChange={() => {
          // console.log(values);
        }}
      >
        <Node as="section" title="房屋信息">
          <Node as="group">
            <Node as="field" prop="residenceName"></Node>
            <Node as="field" prop="region"></Node>
            <Node as="field" prop="area"></Node>
            <Node as="field" prop="currentStyle" span={2}></Node>
            <Node as="field" prop="address" span={2}></Node>
            <NodeProvider name="currentStyle">
              {({ value: currentStyleValue }) => (
                <Node
                  as="field"
                  prop="plan"
                  span={2}
                  required={currentStyleValue === "pure"}
                ></Node>
              )}
            </NodeProvider>
          </Node>
        </Node>
        <Node as="section" title="房主信息">
          <Node as="group">
            <Node as="field" prop="ownerName"></Node>
            <Node as="field" prop="phone"></Node>
            <Node as="field" prop="card"></Node>
          </Node>
        </Node>
        <Node as="section" title="装修信息">
          <Node as="group">
            <Node as="field" prop="decorationPeriod"></Node>
            <Node as="field" prop="decorationStartTime"></Node>
            <Node as="field" prop="decorationEndTime"></Node>
            <Node as="field" prop="decorationTotalAmount"></Node>
            <Node as="field" prop="decorationDeposit"></Node>
            <Node as="field" prop="decorationStyle" span={3}></Node>
          </Node>
        </Node>

        <Node as="section" title="工人信息">
          <Node as="table" prop="workers">
            <Node as="column" prop="workerName" width={200}></Node>
            <Node as="column" prop="workerPhone" width={200}></Node>
            <Node as="column" prop="workerRole" width={200}></Node>
            <Node as="column" prop="workDays" width={200}></Node>
            <Node as="column" prop="expenses" width={200}></Node>
          </Node>
        </Node>
        <Node as="section" title="报价清单">
          <Node
            as="table"
            prop="priceList"
            summary={() => (
              <>
                <Node as="summary" index={0}>
                  合计金额
                </Node>
                <Node as="summary" index={1}></Node>
                <Node as="summary" index={2}></Node>
                <Node as="summary" index={3}></Node>
                <Node as="summary" index={4} formatter={calculateTotal}></Node>
              </>
            )}
          >
            <Node as="column" prop="project" width={200} fixed="left"></Node>
            <Node as="column" prop="brand" width={200}></Node>
            <Node as="column" prop="price" width={200}></Node>
            <Node as="column" prop="discount" width={200}></Node>
            <Node as="column" prop="_" showOnly width={100} label="实际价格">
              <span>20000￥</span>
            </Node>
          </Node>
        </Node>
        <Node as="section" title="审批信息">
          <Node as="biz-field" prop="approveInfo"></Node>
        </Node>

        <PageFooter extra={<span>谨慎操作！</span>}>
          <Node as="delete"></Node>
          <Node
            as="cancel"
            onCancel={() => {
              setMode("view");
            }}
          ></Node>
          <Node as="reset"></Node>
          <Node as="submit"></Node>
        </PageFooter>
      </Node>
    </PageWrapper>
  );
}

export default App;
