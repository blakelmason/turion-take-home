import { VIEW } from "../constants";
import { useAppSelector } from "../hooks";
import { selectCurrentView } from "../slices/view.slice";
import HistoricalData from "./HistoricalData";
import LiveData from "./LiveData";

export default function RenderView() {
  const current = useAppSelector(selectCurrentView);

  switch (current) {
    case VIEW.HISTORICAL:
      return <HistoricalData />;
    case VIEW.LIVE:
      return <LiveData />;
    default:
      current satisfies never;
  }
}
