import React, { useState, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, Divider, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { GrLanguage } from "react-icons/gr";
import { CiDark } from "react-icons/ci";
import { PiSelectionBackground } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { cleanup } from "../auth/slice";
import { toggleLogout } from "../../components/Global/slice";
import { useNavigate } from "react-router-dom/dist";
import { routes } from "../../routes/router";
import Stream from "../../asset/video/stream.mp4";
import Vituar from "../../asset/video/vitual.mp4";
import Snow from "../../asset/video/snow.mp4";
import Flower from "../../asset/video/flower.mp4";

const DrawerAuth = ({ isOpen, onClose }) => {
	const dispatch = useDispatch();
 	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));

	const [openLanguage, setOpenLanguage] = useState(false);
	const [openBackground, setOpenBackground] = useState(false);
	const [backgroundVideo, setBackgroundVideo] = useState(() => {
		return localStorage.getItem("backgroundVideo") || null;
	});
	

	const handleLanguageClick = () => {
		setOpenLanguage(!openLanguage);
	};

	const handleBackgroundClick = () => {
		setOpenBackground(!openBackground);
	};

	const handleVideoClick = (video) => {
		// Save the selected video to local storage
		localStorage.setItem("backgroundVideo", video);
		setBackgroundVideo(video);
	};

	useEffect(() => {
		// Update the video background after the state has been set
		if (backgroundVideo) {
			const videoElement = document.getElementById("backgroundVideo");
			if (videoElement) {
				videoElement.src = backgroundVideo;
			}
		}
	}, [backgroundVideo]);

	const backgroundVideos = [Stream, Vituar, Snow, Flower];

	const hanldelogout = () => {
		dispatch(cleanup());
		dispatch(toggleLogout());
		navigate(routes.login.path);
	}

	return (
		<>
			<Drawer
				anchor="right"
				open={isOpen}
				onClose={onClose}
				transitionDuration={{ enter: 500, exit: 500 }}>
				<Box
					sx={{ width: 330 }}
					role="presentation"
					onClick={(e) => {
						e.stopPropagation();
					}}
					onKeyDown={onClose}>
					<List>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								height: "30px",
								margin: "30px",
							}}>
							<img className="image_avata" src={user && user.photoURL} alt="avata" />
							<div>
								<p style={{ fontSize: "20px" }}>{user && user.displayName}</p>
								<p style={{ fontSize: "14px", color: "#ccc" }}>
									{user && user.email}
								</p>
							</div>
						</Box>
					</List>
					<Divider />
					<List>
						<ListItem key="Ngôn ngữ" onClick={handleLanguageClick}>
							<ListItemButton>
								{openLanguage ? <ExpandLess /> : <ExpandMore />}
								<GrLanguage style={{ marginRight: "7px", width: "20px" }} /> Ngôn
								ngữ
							</ListItemButton>
						</ListItem>
						{/* ... (existing language code) */}
						{/* ... (existing theme code) */}
						<ListItem key="Hình nền" onClick={handleBackgroundClick}>
							<ListItemButton>
								{openBackground ? <ExpandLess /> : <ExpandMore />}
								<PiSelectionBackground
									style={{ marginRight: "7px", fontSize: "20px", width: "20px" }}
								/>
								Hình nền
							</ListItemButton>
						</ListItem>
						<Collapse
							className="draw_item_menu"
							in={openBackground}
							timeout="auto"
							unmountOnExit>
							<List component="div" disablePadding>
								{backgroundVideos.map((video, index) => (
									<ListItem key={video} onClick={() => handleVideoClick(video)}>
										<ListItemButton>
											<video
												autoPlay
												muted
												loop
												style={{ width: "100%", borderRadius: "5px" }}>
												<source src={video} type="video/mp4" />
											</video>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Collapse>
					</List>
					<Divider />
					<List>
						<ListItem style={{ margin: "0 25px" }} key="Đăng xuất">
							<ListItemButton onClick={hanldelogout}>
								<IoIosLogOut style={{ marginRight: "7px", fontSize: "20px" }} />
								Đăng xuất
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default DrawerAuth;
