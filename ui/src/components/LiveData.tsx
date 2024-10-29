import { Dangerous, Warning } from "@mui/icons-material";
import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { TelemetryPacket } from "../../../types/TelemetryPacket";
import { dataTableProperties, DataTableProperty } from "../constants";
import { useAppSelector } from "../hooks";
import { selectLiveDataById, selectLiveDataByIds } from "../slices/live.slice";
import { checkDangerRanges } from "../utils";
import CustomTable from "./CustomTable";

export default function LiveData() {
  const data = useAppSelector(selectLiveDataByIds);

  return (
    <CustomTable>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Satellite ID</TableCell>
          <TableCell />
          <TableCell>Temperature</TableCell>
          <TableCell />
          <TableCell>Battery Voltage</TableCell>
          <TableCell />
          <TableCell>Altitude</TableCell>
          <TableCell />
          <TableCell>Timestamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((id) => (
          <LiveDataRow key={id} id={id} />
        ))}
      </TableBody>
    </CustomTable>
  );
}

function LiveDataRow({ id }: { id: string }) {
  const data = useAppSelector((state) => selectLiveDataById(state, id));

  return (
    <TableRow>
      {dataTableProperties.map((key) => (
        <LiveDataCell key={key} property={key} packet={data} />
      ))}
    </TableRow>
  );
}

function LiveDataCell({
  property,
  packet,
}: {
  property: DataTableProperty;
  packet: TelemetryPacket;
}) {
  const DangerType = checkDangerRanges(packet, property);
  let value;

  if (property === "epoch_timestamp") {
    value = DateTime.fromMillis(packet[property]).toLocaleString(
      DateTime.DATETIME_FULL_WITH_SECONDS
    );
  } else {
    value = packet[property];
  }

  let Icon;
  let color: "error" | "warning" | "inherit" = "inherit";

  switch (DangerType) {
    case "DANGER":
      Icon = Dangerous;
      color = "error";
      break;
    case "WARNING":
      Icon = Warning;
      color = "warning";
      break;
  }

  return (
    <>
      <TableCell
        sx={{
          pr: 0,
        }}>
        {Icon && (
          <Box display='flex' alignItems='center'>
            <Icon fontSize='small' color={color} />
          </Box>
        )}
      </TableCell>
      <TableCell>
        <Typography variant='inherit' color={color}>
          {value}
        </Typography>
      </TableCell>
    </>
  );
}
