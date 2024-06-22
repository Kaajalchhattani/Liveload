"use client";

import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";

function login() {
  const router = useRouter();
  // const queryClient=new QueryClient()
  const [error, setError] = useState("");
  const [email, setEmail] = useState("admin@liveload.com");

  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("User@123");
  const [errorPassword, setErrorPassword] = useState("");

  const [toggle, setToggle] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [open, setOpen] = useState(false);

  const verification = async () => {
    const payload = await fetch(
      "https://liveload-api.vercel.app/api/v1/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        redirect: "follow",
      }
    );

    let response = await payload.json();
    console.log(response.message);

    console.log(open);
    if (response.message != "success") {
      setOpen(true);
    } else router.push("/mainPage");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordToggle = () => {
    setToggle(!toggle);
  };

  const handleFocusEmail = () => {
    setEmailFocus(true);
  };
  useEffect(() => {
    if (emailFocus && email.length == 0) setError("Email is required");
  }, [emailFocus]);

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  useEffect(() => {
    if (passwordFocus && password.length == 0)
      setErrorPassword("Password  is required");
  }, [passwordFocus]);

  const emailChange = (e) => {
    let temp = e.target.value;
    setEmail(temp);
    if (temp > 0) setEmailFocus(false);
    temp = temp.toLowerCase();
    setEmail(temp);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    console.log(regex.test(temp), temp);

    if (temp.length == 0) setError("Email is required");
    else {
      if (!regex.test(temp)) {
        setError("Email must be valid");
      } else setError("");
    }
  };

  const passwordChange = (e) => {
    let pass = e.target.value;
    setPassword(pass);
    if (pass > 0) setPasswordFocus(false);

    if (pass.length == 0) setErrorPassword("Password is required");
    else setErrorPassword("");
  };

  return (
    // <QueryClientProvider>
    <Paper sx={{ margin: "auto", maxWidth: 370, padding: 2 }}>
      <Grid container spacing={5}>
        <Grid item xs spacing={5}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginBottom={2}
          >
            <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
              Login to Liveloads
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
              <Link href="/signUp" underline="none">
                Dont have a account?
              </Link>
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <InputLabel sx={{ fontSize: 13, color: "black" }}>
              Email Address
            </InputLabel>
            <TextField
              onChange={emailChange}
              sx={{
                marginBottom: 2,
                "& .MuiFormHelperText-root": { color: "red" },

                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: error ? "red" : "inherit",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: error ? "red" : "inherit",
                  },
                },
              }}
              value={email}
              id="email"
              helperText={error}
              onFocus={handleFocusEmail}
            />
            <InputLabel sx={{ fontSize: 13, color: "black" }}>
              Password
            </InputLabel>
            <TextField
              type={toggle ? "password" : "text"}
              onChange={passwordChange}
              value={password}
              onFocus={handlePasswordFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordToggle}
                      edge="end"
                    >
                      {toggle ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: 2,
                "& .MuiFormHelperText-root": { color: "red" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: errorPassword ? "red" : "inherit",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errorPassword ? "red" : "inherit",
                  },
                },
              }}
              helperText={errorPassword}
            />
            <Stack alignItems={"flex-end"} marginTop={2} marginBottom={4}>
              <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                <Link
                  href="/forgetPassword"
                  underline="none"
                  color={"black"}
                  sx={{ "&:hover": { color: "#1890ff" } }}
                >
                  Forget Password?
                </Link>
              </Typography>
            </Stack>
            <Button
              sx={{
                backgroundColor: "#1890ff",
                color: "whitesmoke",
                height: 40,
              }}
              onClick={!error && !errorPassword ? verification : null}
            >
              Login
            </Button>

            <Snackbar
              open={open}
              onClose={handleClose}
              autoHideDuration={1400}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              key={{ vertical: "top", horizontal: "right" }}
              // action={action}
            >
              <SnackbarContent
                sx={{ backgroundColor: "white", color: "black" }}
                message="Required email or password is wrong"
              />
            </Snackbar>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
    // </QueryCientProvider>
  );
}

export default login;
