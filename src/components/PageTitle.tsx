import { Button, Card, Tag } from "antd";
import { Fragment } from "react";

const PageTitle = ({ onEdit }: { onEdit?: () => void }) => {
  const renderRight = () => {
    return (
      <Button type="link" onClick={onEdit}>
        编辑
      </Button>
    );
  };
  return (
    <Card
      title={
        <Fragment>
          <div>
            <span className=" mr-3">三栋三单元1楼装修申请单</span>
            <Tag color="green">待提交</Tag>
          </div>
          <div className="font-normal">单号: 1234567</div>
        </Fragment>
      }
      extra={renderRight()}
      className=" mb-5"
    >
      <span className=" pr-4">创建人：大飞 </span>
      <span className=" pr-4"> 创建时间：2020-11-02 19:40 </span>
      <span className=" pr-4">更新人：大飞 </span>
      <span className=" pr-4"> 更新时间：2020-11-02 19:40 </span>
    </Card>
  );
};

export default PageTitle;
