import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Appointment from "../../utils/appointment";
import { makeStyles } from "@mui/material/styles";

// Define the TableCompProps type
type TableCompProps = {
  appointments: Appointment[];
};

//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below

const TableComp: React.FC<TableCompProps> = ({ appointments }) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      {
        accessorKey: "patientNameF", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "patientNameL",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "date", //normal accessorKey
        header: "Date",
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        size: 200,
      },
      {
        accessorKey: "reason",
        header: "Reason",
        size: 200,
      },
    ],
    []
  );

  const data: Appointment[] = appointments;

  const table = useMaterialReactTable({
    columns,
    data,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableRowSelection: true,
    enableSelectAll: false,
    enableMultiRowSelection: false,
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "rgba(1,1,1,0.3)",
        borderTopColor: "rgba(1,1,1,0.3)",
        borderColor: "rgba(1,1,1,0.3)",
      },
    },
    muiTableHeadCellProps: {
      sx: (theme) => ({
        background: "rgba(255, 255, 255, 1)",
        color: "rgba(1, 1, 1, 0.8)",
      }),
    },
  });

  return <MaterialReactTable table={table} />;
};

export default TableComp;
