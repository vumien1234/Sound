import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomButton from "../../components/common/Button";
import { auth, provider } from "./GoogleSignIn";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "../home/Home";
import { toggleLoadingStatus } from "../../components/Global/slice";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginGoogle = async () => {
    try {
      dispatch(toggleLoadingStatus());
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user))
      navigate("/");
      console.log(result.user);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      dispatch(toggleLoadingStatus());
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
  };

  return (
    <>
      {!user ? (
        <form className="login-container" onSubmit={handleFormSubmit}>
          <Box className="form-login">
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>Login Form</h1>
            <Box sx={{ mt: 5, mb: 4 }}>
              <TextField
                sx={{ pb: 4 }}
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                fullWidth
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <p style={{ float: "right", cursor: "pointer", fontSize: "14px" }}>
                Quên mật khẩu ?
              </p>
            </Box>
            <CustomButton
              item="Login"
              type="primary"
              size="large"
              style={{ width: "100%", margin: "3rem 0" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="button"
                onClick={handleLoginGoogle}
                className="login_method_orther google"
              >
                <FcGoogle className="icon_login" /> LOGIN WITH GOOGLE
              </Button>
              <Button type="button" className="login_method_orther facebook">
                <FaFacebook className="icon_login" />
                LOGIN WITH FACEBOOK
              </Button>
            </div>
          </Box>
        </form>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Login;
