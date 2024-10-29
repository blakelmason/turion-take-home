import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getSatelliteDataAction } from "../listeners/getSatellitesData.listener";
import { getHistoricalDataBySatellite } from "../listeners/satelliteSelect.listener";
import { selectSatelliteDataByIds } from "../slices/satellite.slice";
import {
  selectSatelliteSelect,
  setDateSelect,
  setSatelliteSelect,
} from "../slices/view.slice";

const satelliteSelectLabel = "satellite-select-label";
const satelliteInputLabel = "Satellite";

export default function SatelliteSelect() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSatelliteDataByIds);
  const selected = useAppSelector(selectSatelliteSelect);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getSatelliteDataAction());
    }
  }, [dispatch, data]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setDateSelect(undefined));
    dispatch(setSatelliteSelect(event.target.value));
    dispatch(getHistoricalDataBySatellite(event.target.value));
  };

  return (
    <Box minWidth={200}>
      <FormControl fullWidth>
        <InputLabel id={satelliteSelectLabel}>{satelliteInputLabel}</InputLabel>
        <Select
          onChange={handleChange}
          value={selected}
          labelId={satelliteSelectLabel}
          label={satelliteInputLabel}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {data.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
