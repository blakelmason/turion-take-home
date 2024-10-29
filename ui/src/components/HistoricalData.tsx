import {
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DateTime } from "luxon";
import { dataTableProperties } from "../constants";
import { useAppSelector } from "../hooks";
import {
  selectHistoricalDataById,
  selectHistoricalDataByIds,
} from "../slices/historical.slice";
import CustomTable from "./CustomTable";
import DateSelect from "./DateSelect";
import SatelliteSelect from "./SatelliteSelect";

export default function HistoricalData() {
  const data = useAppSelector(selectHistoricalDataByIds);

  return (
    <>
      <Stack
        gap={2}
        direction='row'
        justifyContent='center'
        alignItems='center'>
        <SatelliteSelect />
        <DateSelect />
      </Stack>
      <CustomTable>
        <TableHead>
          <TableRow>
            <TableCell>Satellite ID</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Battery Voltage</TableCell>
            <TableCell>Altitude</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((id) => (
            <HistoricalTableRow key={id} id={id} />
          ))}
        </TableBody>
      </CustomTable>
    </>
  );
}

function HistoricalTableRow({ id }: { id: string }) {
  const data = useAppSelector((state) => selectHistoricalDataById(state, id));

  const dataWithTimezone = {
    ...data,
    epoch_timestamp: DateTime.fromMillis(data.epoch_timestamp).toLocaleString(
      DateTime.DATETIME_FULL_WITH_SECONDS
    ),
  };
  return (
    <TableRow>
      {dataTableProperties.map((key) => (
        <TableCell key={key}>{dataWithTimezone[key]}</TableCell>
      ))}
    </TableRow>
  );
}
