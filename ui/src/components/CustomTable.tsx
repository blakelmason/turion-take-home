import { Paper, Table, TableContainer } from "@mui/material";
import { PropsWithChildren } from "react";

export default function CustomTable({ children }: PropsWithChildren) {
  return (
    <TableContainer elevation={3} component={Paper}>
      <Table>{children}</Table>
    </TableContainer>
  );
}
