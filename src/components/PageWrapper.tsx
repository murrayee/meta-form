import { PropsWithChildren } from "react";
import PageTitle from "./PageTitle";

interface Props {
  onEdit?: () => void;
}
const PageWrapper = ({ children, onEdit }: PropsWithChildren & Props) => {
  return (
    <div className="p-10 max-w-7xl m-auto" style={{ minWidth: 1100 }}>
      <PageTitle onEdit={onEdit}></PageTitle>
      {children}
    </div>
  );
};

export default PageWrapper;
