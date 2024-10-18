import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Appointment from "../../../utils/appointment";
import { lighten } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

// Define the TableCompProps type
type TableCompProps = {
  appointments: Appointment[];
  type: number;
};

const TableComp: React.FC<TableCompProps> = ({ appointments, type }) => {
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
    renderTopToolbar: ({ table }) => {
      const handleAccept = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("Accepted " + row.getValue("patientNameF"));
          return null;
        });
      };

      const handleDeny = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("denied " + row.getValue("patientNameF"));
          return null;
        });
      };

      const handleTakeIn = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("taking in " + row.getValue("patientNameF"));
          return null;
        });
      };

      const handleCancel = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("cancelling " + row.getValue("patientNameF"));
          return null;
        });
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              {type === 2 ? (
                <>
                  <Button
                    color="info"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleAccept}
                    variant="contained"
                  >
                    Accept{table.getIsSomeRowsSelected()}
                  </Button>
                  <Button
                    color="info"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleDeny}
                    variant="contained"
                  >
                    Deny
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="info"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleTakeIn}
                    variant="contained"
                  >
                    Take In
                  </Button>
                  <Button
                    color="info"
                    disabled={!table.getIsSomeRowsSelected()}
                    onClick={handleCancel}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      );
    },
    enableBottomToolbar: false,
    enableTopToolbar: true,
    enableRowSelection: true,
    enableSelectAll: false,
    enableFilters: false,
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
