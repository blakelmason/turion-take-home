import { Button } from "@mui/material";
import { View } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCurrentView, setCurrentView } from "../slices/view.slice";

interface ViewButtonProps {
  view: View;
}

export default function ViewButton({ view }: ViewButtonProps) {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrentView);
  const isSelected = current === view;

  return (
    <Button
      size='large'
      onClick={() => dispatch(setCurrentView(view))}
      sx={{ maxWidth: 400 }}
      fullWidth
      variant={isSelected ? "contained" : "outlined"}
      disabled={isSelected}>
      {view}
    </Button>
  );
}
