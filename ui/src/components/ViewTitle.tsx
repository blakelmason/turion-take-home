import { Typography } from "@mui/material";
import { View, VIEW } from "../constants";
import { useAppSelector } from "../hooks";
import { selectCurrentView } from "../slices/view.slice";

const getViewTitle = (view: View) => {
  switch (view) {
    case VIEW.HISTORICAL:
      return "Historical Data";
    case VIEW.LIVE:
      return "Live Data";
    default:
      view satisfies never;
  }
};

export default function ViewTitle() {
  const view = useAppSelector(selectCurrentView);
  const title = getViewTitle(view);
  return <Typography variant='h4'>{title}</Typography>;
}
