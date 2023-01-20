import { createContext, PropsWithChildren, useContext } from "react";
import { Model } from "../types";

const defaultValues = {
  model: {},
  value: [],
  prop: "",
};

interface TableContextValues {
  model: Model;
  value: any[];
  prop: string;
}
export const TableContext = createContext<TableContextValues>(defaultValues);

const TableProvider = ({
  model,
  value,
  prop,
  children,
}: PropsWithChildren & TableContextValues) => {
  return (
    <TableContext.Provider
      value={{
        model,
        value,
        prop,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTable = () => {
  return useContext(TableContext);
};

export { useTable, TableProvider };
