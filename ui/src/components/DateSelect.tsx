import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getHistoricalDataByDate } from "../listeners/dateSelect.listener";
import {
  selectDateSelect,
  setDateSelect,
  setSatelliteSelect,
} from "../slices/view.slice";

const maxDate = DateTime.now();

export default function DateSelect() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectDateSelect);

  const valueAsDateObject = value ? DateTime.fromMillis(value) : null;

  const onChange = (date: DateTime | null) => {
    if (date) {
      dispatch(setSatelliteSelect(""));
      dispatch(setDateSelect(date.toMillis()));
      dispatch(
        getHistoricalDataByDate({
          startDate: date.startOf("day").toMillis(),
          endDate: date.endOf("day").toMillis(),
        })
      );
    }
  };

  return (
    <DatePicker
      onChange={onChange}
      maxDate={maxDate}
      value={valueAsDateObject}
    />
  );
}
