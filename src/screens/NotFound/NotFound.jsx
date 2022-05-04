import React from "react";
// import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { Link } from "@mui/material";

import "./_NotFound.scss";

const NotFound = () => (
  <div className="d-flex justify-content-center align-items-center" id="main">
    <div className="inline-block align-middle">
      <h2 className="font-weight-bold lead" id="desc">
        The page you are looking for isn’t here.
      </h2>
      <p className="font-weight-normal lead">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation, or simply{" "}
        <Link to="/">let's go home</Link>
      </p>
      <img
        alt="not found"
        src="/assets/images/undraw_page_not_found_su7k.svg"
        style={{
          marginTop: 50,
          display: "inline-block",
          maxWidth: "100%",
          width: 560,
        }}
      />
    </div>
  </div>
  // <Box
  // 	sx={{
  // 		backgroundColor: "background.default",
  // 		display: "flex",
  // 		flexDirection: "column",
  // 		height: "100%",
  // 		justifyContent: "center"
  // 	}}
  // >
  // 	<Container maxWidth="md">
  // 		<Typography align="center" color="textPrimary" variant="h3">
  // 			OH OH! The page you are looking for isn’t here
  // 		</Typography>
  // 		<Typography align="center" color="textPrimary" variant="subtitle2">
  // 			You either tried some shady route or you came here by mistake. Whichever
  // 			it is, try using the navigation, or simply{" "}
  // 			<Link underline="none" component={RouterLink} to="/">
  // 				let's go home
  // 			</Link>
  // 		</Typography>
  // 		<Box sx={{ textAlign: "center" }}>
  // 			<img
  // 				alt="Under development"
  // 				src="/assets/images/undraw_page_not_found_su7k.svg"
  // 				style={{
  // 					marginTop: 50,
  // 					display: "inline-block",
  // 					maxWidth: "100%",
  // 					width: 560
  // 				}}
  // 			/>
  // 		</Box>
  // 	</Container>
  // </Box>
);

export default NotFound;
