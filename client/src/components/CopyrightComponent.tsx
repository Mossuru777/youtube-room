import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function CopyrightComponent(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://twitter.com/Mossuru777">
        @Mossuru777
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
