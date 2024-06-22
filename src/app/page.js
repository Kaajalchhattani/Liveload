import React from "react";
import Login from "@/components/login";
import { Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <div className="div">
      <Grid
        container
        sx={{ height: "100vh" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <Login />
        </Grid>
      </Grid>
    </div>
  );
}
