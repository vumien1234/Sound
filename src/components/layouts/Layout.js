import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../modules/auth/slice";
import { routes } from "../../routes/router";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customs/Header";

const pageHideHeader = [routes.login.path];

const LayoutPage = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Define backgroundVideo state
  const [backgroundVideo, setBackgroundVideo] = useState(() => {
    return localStorage.getItem("backgroundVideo") || null;
  });

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const isAuthenticated = !!localStorage.getItem("token");

      // Redirect to login if not authenticated and not on the login page
      if (!isAuthenticated && location.pathname !== routes.login.path) {
        navigate(routes.login.path);
      }

      // Redirect to home on successful login or if authenticated and on the login page
      if (isAuthenticated && location.pathname === routes.login.path) {
        navigate(routes.home.path);
      }

      dispatch(setAuthenticated(isAuthenticated));
    };

    checkTokenAndRedirect();
  }, [dispatch, location.pathname, navigate]);

  const shouldHideHeader = pageHideHeader.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <video
        id="backgroundVideo"
        autoPlay
        muted
        loop
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%", 
          objectFit: "cover",
          zIndex: -1000,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1000,
        }}
      ></div>
      <div className="container">
        <main
          className={`container_item ${shouldHideHeader ? "hide-header" : ""}`}
        >
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
