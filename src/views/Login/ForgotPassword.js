import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import lion_img from "../../images/lion-face.png";
import login_bg from "../../images/login-cartoon.png";
import logo from "../../images/mybids-biglogo.png";
import shape from "../../images/shape1.png";
import { AuthContext } from "../../CommonMethods/Authentication";
import { useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
const APIForgotPwd = APIURL() + "forgotpassword";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 9999,
		color: '#fff',
	},
}));
export default function ForgotPassword(props) {
	const initialForgotmailState = {
		authenticate_key: "abcd123XYZ",
		email: ""
	}
	const classes = useStyles();
	const [forgottenmail, setForgottenmail] = useState(initialForgotmailState);
	const [openWarning, setOpenWarning] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenWarning(false);
		setOpenError(false);
		setOpenSuccess(false);
	};
	const handleEmailChange = event => {
		const { name, value } = event.target;
		setForgottenmail({ ...forgottenmail, [name]: value });
	};
	const sendForgotMail = (data) => {
		if (data.email === "") {
			setMessage("Please enter email id");
			setOpenError(true);
		}
		else {
			setOpen(true);
			postRecord(APIForgotPwd, data)
				.then(res => {
					if (res.data[0].response.status === "success") {
						setMessage(res.data[0].response.message);
						setOpenSuccess(true);
					}
					else {
						setMessage(res.data[0].response.message);
						setOpenError(true);
					}
					setOpen(false);
				})
				.catch(err => {

				});
		}

	}
	return (
		<div>
			<body class="loginpage" style={{ backgroundImage: `url(${login_bg})` }}>
				<div class="login">
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-6 loginright align-self-center text-center">
								<img src={lion_img} alt="" />
							</div>
							<div class="col-md-6 loginleft pr-0" style={{ backgroundImage: `url(${shape})` }}>
								<div class="row h-100">
									<div class="col-lg-7 align-self-center col-md-10 mx-auto loginpagemain">
										<div class="login_logo"> <Link to={APIPath()}><img src={logo} alt="" /></Link></div>
										<form
											onSubmit={event => {
												event.preventDefault();
												//if (user.password !== user.conf_password) return;
												sendForgotMail(forgottenmail);
											}}>
											<ul>
												<li>
													<div class="input-login"><i class="fas fa-user"></i>
														<input type="text" name="email" value={forgottenmail.email} onChange={handleEmailChange} placeholder="Enter YourEmail Address" class="form-control" />
													</div>
												</li>
												<li>
													<div class="row align-items-center">
														<div class="col-6 chkboxmain">
															<button type="submit" class="btn-style-one">Send Link</button>
														</div>
													</div>
												</li>

											</ul>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openWarning} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="warning">
					{message}
				</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					{message}
				</Alert>
			</Snackbar>
			<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					{message}
				</Alert>
			</Snackbar>
			<Backdrop className={classes.backdrop} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div >
		// <div>
		// 	<section class="drivex_register" style={{ backgroundImage: `url(${header_img})` }}>
		// 		<div class="container">
		// 			<div class="row">
		// 				<div class="col-lg-10 mx-auto">
		// 					<div class="drivex_register_main">
		// 						<div class="drivex_register_left" style={{ backgroundImage: `url(${driver_login})` }}>
		// 						</div>
		// 						<div class="drivex_register_right_main">
		// 							<div class="drivex_register_right">
		// 								<div class="drivex_register_right_logo_sign">
		// 									<Link to={APIPath()}>
		// 										<img src={Logo} />
		// 									</Link>
		// 								</div>
		// 								<form
		// 									onSubmit={event => {
		// 										event.preventDefault();
		// 										//if (user.password !== user.conf_password) return;
		// 										sendForgotMail(forgottenmail);
		// 									}}>
		// 									{/* <h6>Forgot Your Password ?</h6> */}
		// 									<div class="drivex_register_right_cont_input">
		// 										<div class="drivex_register_right_cont_form_input">
		// 											<input type="text" name="email" value={forgottenmail.email} onChange={handleEmailChange} placeholder="Enter YourEmail Address" />
		// 										</div>
		// 									</div>
		// 									<div class="drivex_register_right_cont_form_btn">
		// 										<button style={{ border: "none" }} type="submit">Send Link</button>
		// 									</div>
		// 								</form>

		// 								<div class="drivex_form_have_account">
		// 									<Link to={APIPath() + "login"}><p>Login</p></Link>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>
		// 	<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openWarning} autoHideDuration={3000} onClose={handleClose}>
		// 		<Alert onClose={handleClose} severity="warning">
		// 			{message}
		// 		</Alert>
		// 	</Snackbar>
		// 	<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
		// 		<Alert onClose={handleClose} severity="error">
		// 			{message}
		// 		</Alert>
		// 	</Snackbar>
		// 	<Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
		// 		<Alert onClose={handleClose} severity="success">
		// 			{message}
		// 		</Alert>
		// 	</Snackbar>
		// 	<Backdrop className={classes.backdrop} open={open}>
		//         <CircularProgress color="inherit" />
		//     </Backdrop>
		// </div>
	);
};