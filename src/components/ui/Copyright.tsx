import {Link, Typography} from "@mui/material";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://autoparts-liard.vercel.app">
        Авто-магаз
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
