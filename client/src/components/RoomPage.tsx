import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import YouTubeIcon from "@material-ui/icons/YouTube";

import ReactPlayer from "react-player";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { RoomEvent } from "../../../common/RoomEvent";
import CopyrightComponent from "./CopyrightComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    position: "relative",
    flexGrow: 0,
  },
  YouTubeIcon: {
    marginRight: theme.spacing(2),
  },
  ExitToAppIcon: {
    marginLeft: "auto",
    marginRight: 0,
    cursor: "pointer",
  },
  playerWrapper: {
    position: "relative",
    flexGrow: 1,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
  reactPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  footer: {
    flexGrow: 0,
    padding: theme.spacing(3, 2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

type RoomPageProps = {
  keycode: string;
  clearKeycode: Function;
  setError: Function;
};

type RoomStateRequest = {
  uuid: string;
  id: string;
};

type PlayerState = {
  url: string | null;
  position: string | null;
};

type RoomStateReply = {
  uuid: string;
  state: PlayerState;
};

export default function RoomPage(props: RoomPageProps) {
  const classes = useStyles();
  const socket = io(window.location.href.split("?")[0]);
  let state: PlayerState | null = null;
  let request: RoomStateRequest | null = null;

  socket.on(RoomEvent.Error, (err: string) => {
    props.setError(err);
    socket.disconnect();
  });

  socket.on("connect", () => {
    socket.emit(RoomEvent.JoinRoom, props.keycode);
  });

  socket.on(RoomEvent.JoinedRoom, () => {
    request = {
      uuid: uuidv4(),
      id: socket.id,
    };
    socket.emit(RoomEvent.RoomStateRequest, request);
  });

  socket.on(RoomEvent.RoomStateRequest, (request: RoomStateRequest) => {
    if (state === null) {
      return;
    }
    // TODO: おくる
    const reply: RoomStateReply = {
      uuid: request.uuid,
      state: state,
    };
    socket.emit(RoomEvent.RoomStateReply, reply);
  });

  socket.on(RoomEvent.RoomStateReply, (reply: RoomStateReply) => {
    if (request !== null && reply.uuid === request.uuid) {
      state = reply.state;
      request = null;
    }
  });

  socket.on("disconnect", () => {
    state = null;
    request = null;
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.header}>
        <Toolbar>
          <YouTubeIcon className={classes.YouTubeIcon} />
          <Typography variant="h6" color="inherit" noWrap>
            Room Keycode: {props.keycode}
          </Typography>
          <ExitToAppIcon
            className={classes.ExitToAppIcon}
            onClick={(): void => props.clearKeycode()}
          />
        </Toolbar>
      </AppBar>
      <main className={classes.playerWrapper}>
        <ReactPlayer
          className={classes.reactPlayer}
          height="100%"
          width="100%"
          url="https://www.youtube.com/watch?v=bOv9FH9TRvY"
        />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <CopyrightComponent />
        </Container>
      </footer>
      {/* End footer */}
    </div>
  );
}
