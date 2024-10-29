import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { api } from "./api";
import RenderView from "./components/RenderView";
import ViewButton from "./components/ViewButton";
import ViewTitle from "./components/ViewTitle";
import { VIEW } from "./constants";
import { useAppDispatch } from "./hooks";
import { setAllLive } from "./slices/live.slice";
import { socket } from "./websocket";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get("/telemetry-packet/live").then((response) => {
      dispatch(setAllLive(response.data));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Container maxWidth='xl'>
      <Box my={3} textAlign='center'>
        <Paper elevation={1}>
          <Box p={3}>
            <Stack direction='column' spacing={2}>
              <Typography variant='h2'>Telemetry Data</Typography>
              <Stack
                spacing={2}
                direction={{ xs: "column", md: "row" }}
                justifyContent='center'
                alignItems='center'>
                <ViewButton view={VIEW.LIVE} />
                <ViewButton view={VIEW.HISTORICAL} />
              </Stack>
              <ViewTitle />
              <RenderView />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
