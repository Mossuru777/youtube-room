import React from "react";

import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import CopyrightComponent from "./CopyrightComponent";

type WelcomePageProps = {
  setKeycode: Function;
  error: string | null;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  enter: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function WelcomePage(props: WelcomePageProps) {
  const classes = useStyles();
  const keycodeRegExp = /^\d{4}$/;
  const errorMessage =
    props.error !== null ? (
      <Alert severity="error"> + props.error + </Alert>
    ) : null;

  let textKeycode = "";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MeetingRoomOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter to Youtube Room
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (keycodeRegExp.test(textKeycode)) {
              props.setKeycode(textKeycode);
            }
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Keycode"
            helperText="Input 4-digit Keycode."
            autoComplete="false"
            autoFocus
            onChange={(event) => {
              textKeycode = event.target.value;
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.enter}
          >
            Enter
          </Button>
        </form>
        {errorMessage}
      </div>
      <Box mt={8}>
        <CopyrightComponent />
      </Box>
    </Container>
  );
}
