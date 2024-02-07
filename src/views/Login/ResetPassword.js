import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import $ from "jquery";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordChecklist from "react-password-checklist";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from "@material-ui/core/Tooltip";
import Footer from "../../components/Footer/Footer";
import Logo from "../../images/vtc-logo.png";
import banner from "../../images/broker-banner.jpg";
import Typography from "@material-ui/core/Typography";
import { APIURL, APIPath } from "../../CommonMethods/Fetch";
import { postRecord, putRecord } from "../../CommonMethods/Save";
import Footer1 from "../../components/Footer/Footer1";
// const APIResetPwd = APIURL() + "reset-password/";
const APIResetPwd = APIURL() + "changepassword";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 9999,
		color: '#fff',
	},
	bullet: {
		display: "inline-block",
		margin: "2px",
		transform: "scale(2)",
		color: "red !important",
		fontWeight: "bold"
	},
	btn_pwd: {
        float: "right",
        top: "-50px"
    }
}));
const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid #dadde9"
	}
}))(Tooltip);
export default function ResetPassword(props) {
	//const user_id = props.match.params.userid;
	const initiallState = {
		authenticate_key: "abcd123XYZ",
		// userid: props.match.params.userid,
		userid: props.match.params.id,
		new_pwd: "",
		confirm_pwd: ""
	}
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	const [userdata, setUserData] = useState(initiallState);
	const [openWarning, setOpenWarning] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [exist, setExist] = useState(false);
	const [pwdtooltip, setPwdtooltip] = useState(false);
	const [pwd, setPwd] = useState(false);
	const [validPwd, setValidPwd] = useState("");
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenWarning(false);
		setOpenError(false);
		setOpenSuccess(false);
	};
	const handleScroll = () => {
		window.scrollTo(0, 0);
	};
	const handleInputChange = event => {
		const { name, value } = event.target;
		setUserData({ ...userdata, [name]: value });
	};
	const handleInputChangeforPassword = event => {
		const { name, value } = event.target;
		setUserData({ ...userdata, [name]: value });
		var passwordChk = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9](?!.*\s).{7,20})$/;
		if (value.length >= 8 && passwordChk.test(value)) {
			setPwd(true);
			setPwdtooltip(false);
		} else {
			setPwdtooltip(true);
			setPwd(false);
		}
	};
	const resetPassword = (data) => {
		if (data.new_pwd === "") {
			setMessage("Please enter new password");
			setOpenError(true);
		}
		else if (data.confirm_pwd === "") {
			setMessage("Please enter confirm password");
			setOpenError(true);
		}
		else if (validPwd === false) {
			setMessage("Password policy does not match");
			setOpenError(true);
		}
		else {
			setOpen(true);
			postRecord(APIResetPwd, data)
				.then(res => {
					if (res.data[0].response.status === "success") {
						setMessage(res.data[0].response.message);
						setOpenSuccess(true);
						setUserData(initiallState);
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
	const openBox = () => {
		if (!$("#mob_btn").hasClass('active')) {
			$("#mob_btn").addClass('active');
			$("#mobilemenu").addClass('active');
			return $('body').css('overflow', 'hidden');
		} else {
			$("#mob_btn").removeClass('active');
			$("#mobilemenu").removeClass('active');
			return $('body').css('overflow', 'auto');
		}
	}
	const handleClickShowPassword = () => {
        setUserData({ ...userdata, showPassword: !userdata.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
	return (
		<div>
			<section class="home_page">
				{/* <div class="mobile_on mobile_slide">
					<div class="mob_head">
						<div class="hm_logo">
							<Link to={APIPath()}>
								<img src={Logo} alt="Logo" title="Logo" />
							</Link>
						</div>
						<div class="">
							<div class="gee_mobile">
								<button class="gee_hamburger">&#9776;</button>
								<button class="gee_cross">&#735;</button>
							</div>
						</div>
					</div>
					<div class="gee_menu">
						<ul>
							<li>
								<Link to={APIPath() + "login"}>Login</Link>
							</li>
							<li>
								<Link to={APIPath() + "register"}>Register</Link>
							</li>
							<li class="">
								<Link to={APIPath()}>Home</Link>
							</li>
							<li>
								<Link to={APIPath() + "features"}>Features</Link>
							</li>
							<li>
								<Link to={APIPath() + "agent"}>Agents</Link>
							</li>
							<li>
								<Link to={APIPath() + "broker"}>Brokers</Link>
							</li>
							<li>
								<Link to={APIPath() + "association"}>Associations</Link>
							</li>
							<li>
								<Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
							</li>
							<li>
								<Link to={APIPath() + "about-us"}>About</Link>
							</li>
							<li>
								<Link to={APIPath() + "example"}>Example</Link>
							</li>
							<li>
								<Link to={APIPath() + "pricing"}>Pricing</Link>
							</li>
						</ul>
					</div>
				</div> */}
				<div class="mobile_on mobile_slide">
					<div class="mob_head">
						<div class="hm_logo">
						<Link to={APIPath()}>
                                <img src={Logo} alt="Logo" title="Logo" />
                            </Link>
						</div>
						<div id="mobilemenu">
							<div class="mobilemenu-wrapper">
								<div class="mobilemenu-trigger">
									<button id="mob_btn" class="trigger" onClick={openBox}>
										<span class="box">
											<span class="bar top"></span>
											<span class="bar middle"></span>
											<span class="bar bottom"></span>
										</span>
									</button>
								</div>
								<div class="mobilemenu-view">
									<div class="menu">
										<ul>
											<li>
												<Link to={APIPath() + "login"}>Login</Link>
											</li>
											<li>
												<Link to={APIPath() + "agent"}>Register</Link>
											</li>
											<li class="">
												<Link to={APIPath()}>Home</Link>
											</li>
											<li>
												<Link to={APIPath() + "features"}>Features</Link>
											</li>
											<li>
												<Link to={APIPath() + "agent"}>Agents</Link>
											</li>
											<li>
												<Link to={APIPath() + "broker"}>Brokers</Link>
											</li>
											<li>
												<Link to={APIPath() + "association"}>Associations</Link>
											</li>
											<li>
												<Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
											</li>
											<li>
												<Link to={APIPath() + "about-us"}>About</Link>
											</li>
											<li>
												<Link to={APIPath() + "example"}>Example</Link>
											</li>
											<li>
												<Link to={APIPath() + "pricing"}>Pricing</Link>
											</li>
											<li>
												<Link to={APIPath() + "faq"}>FAQ</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr class="spacer1px"></hr>
				<div class="home_page_banner inner_banner">
					<img src={banner} alt="" title="" />
					<div class="inner_banner_cont">
						<div class="inner_banner_cont_sec">
							<h2>Reset Password</h2>
							<h5>Our Story… One Day at a Time!</h5>
						</div>
					</div>
					<div class="inner_page_breadcumb">
						<div class="container">
							<div class="row">
								<div class="col-lg-12 col-md-12">
									<div class="inner_page_breadcumb_main">
										<ul>
											<li>
												<Link to={APIPath()}><i class="fas fa-home"></i>Home</Link>
											</li>
											<li>
												<a href="#">Login</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="head_sec">
					<header class="desktop_sticky">
						<div class="container">
							<div class="row">
								<div class="col-lg-12 col-md-12">
									<div class="head_main">
										<div class="head_cont_left">
											<ul>
												<li><a href="#"><i class="far fa-envelope"></i>Support@VirtualTourCafe.com</a></li>
												<li><a href="#"><i class="fas fa-phone-alt"></i>(877) 744-8285 / (925) 609-2408</a></li>
											</ul>
										</div>
										<div class="head_cont_right">
											<ul>
												<li><Link to={APIPath() + "login"} class="login_btn"><i class="far fa-lock-alt"></i>Login</Link></li>
												<li><Link to={APIPath() + "agent"} class="register_btn"><i class="fas fa-edit"></i>Register</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
					<div class="head_menu_sec_new">
						<div class="container">
							<div class="row">
								<div class="col-lg-12 col-md-12">
									<div class="head_sec_menu">
										<div class="row">
											<div class="col-lg-3 col-md-3">
												<div class="vtc_logo">
													<Link to={APIPath()}>
														<img src={Logo} alt="Logo" title="Logo" />
													</Link>
												</div>
											</div>
											<div class="col-lg-9 col-md-9">
												<div class="head_sec_menu_main">
													<ul>
														<li>
															<Link to={APIPath()}>Home</Link>
														</li>
														<li>
															<Link to={APIPath() + "features"}>Features</Link>
														</li>
														<li>
															<Link to={APIPath() + "agent"}>Agents</Link>
														</li>
														<li>
															<Link to={APIPath() + "broker"}>Brokers</Link>
														</li>
														<li>
															<Link to={APIPath() + "association"}>Associations</Link>
														</li>
														<li>
															<Link to={APIPath() + "preferred-vendors"}>Preferred Vendors</Link>
														</li>
														<li>
															<Link to={APIPath() + "about-us"}>About</Link>
														</li>
														<li>
															<Link to={APIPath() + "example"}>Example</Link>
														</li>
														<li>
															<Link to={APIPath() + "pricing"}>Pricing</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="login_sec_page">
				<div class="container">
					<div class="row">
						<div class="col-lg-1- col-md-12 mx-auto">
							<div class="login-box">
								<div class="row">
									<div class="col-md-6">
										<form
											onSubmit={event => {
												event.preventDefault();
												//if (user.password !== user.conf_password) return;
												resetPassword(userdata);
											}}>
											<div class="login-box-right">
												<h3 class="text-center">Reset Your Passowrd</h3>
												<ul>
													<li>
														<div class="input-block">
															{/* <HtmlTooltip
																open={pwdtooltip}
																placement="right"
																title={
																	<>
																		<Typography variant="body2" color="inherit">
																			Password Policy
																		</Typography>
																		<span style={{ color: "red" }}>
																			{bull}
																			{" Minimum length is 8 characters"}
																			<br />
																			{bull}
																			{" Atleast one upper case character"}
																			<br />
																			{bull}
																			{" Atleast one special character"}
																			<br />
																			{bull}
																			{" Atleast one number"}
																		</span>
																	</>
																}
															> */}
															
															<input type={userdata.showPassword ? "text" : "password"} id="input-text" required spellcheck="false" onChange={handleInputChangeforPassword} name="new_pwd" value={userdata.new_pwd} />
															<span class="placeholder">Enter New Password</span>
															<IconButton
																className={classes.btn_pwd}
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
															>
																{userdata.showPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>

															{/* </HtmlTooltip> */}
														</div>
														<PasswordStrengthBar password={userdata.new_pwd} />
													</li>
													<li>
														<div class="input-block">
															<input type={userdata.showPassword ? "text" : "password"} id="input-text" required spellcheck="false" onChange={handleInputChangeforPassword} name="confirm_pwd" value={userdata.confirm_pwd} />
															<span class="placeholder">Enter Confirm Password</span>
															<IconButton
																className={classes.btn_pwd}
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
															>
																{userdata.showPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>
														</div>
														<PasswordStrengthBar password={userdata.confirm_pwd} />
														<PasswordChecklist
															rules={["minLength", "specialChar", "number", "capital", "match"]}
															minLength={5}
															value={userdata.new_pwd}
															valueAgain={userdata.confirm_pwd}
															onChange={(isValid) => {
																if (isValid) {
																	setValidPwd(true);
																}
																else {
																	setValidPwd(false);
																}
															}}
														/>
													</li>
													<li>
														<div class="row align-items-center">
															<div class="col-6 chkboxmain">
																<button type="submit" class="btn-style-one">Reset</button>
															</div>
														</div>
													</li>

												</ul>
											</div>

										</form>
									</div>
									<div class="col-md-6">
										<div class="login-box-left">
											<span>
												<img src={Logo} alt="" />
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div class="ftr_get">
				{/* <section class="get_in_touch">
					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-12 col-md-12">
								<div class="get_in_touch_main">
									<div class="get_in_touch_left">
										<div class="get_in_touch_left_head">
											<h2>Lets Get In Touch</h2>
										</div>
										<div class="get_in_touch_left_conts">
											<ul>
												<li><i class="fas fa-map-marked-alt"></i>6200 Stoneridge Mall Rd, Suite 300 Pleasanton CA 94588</li>
												<li><i class="fas fa-envelope"></i>support@VirtualTourCafe.com</li>
												<li><i class="fas fa-phone-square-alt"></i>(877) 744-8285 / (925) 609-2408, 925-609-2408</li>
											</ul>
										</div>
										<div class="get_start_now">
											<h4>Get Started Now</h4>
											<ul class="btns_pics">
											<li>
                                                    <Link to={APIPath() + "appointment"} class="need_pic">I Need Photos<i class="fas fa-arrow-right"></i></Link>
                                                </li>
                                                <li>
                                                    <Link to={APIPath() + "agent"} class="need_pic">I Have Photos<i class="fas fa-arrow-right"></i></Link>
                                                </li>
											</ul>
										</div>
									</div>
									<div class="get_in_touch_right">
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.013383949486!2d-121.92670638484266!3d37.69588472446775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fec0ad5427675%3A0xd52511e0d357c742!2s6200%20Stoneridge%20Mall%20Rd%2C%20Pleasanton%2C%20CA%2094588%2C%20USA!5e0!3m2!1sen!2sin!4v1628112704757!5m2!1sen!2sin" width="100%" height="400" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				<Footer1></Footer1>
				<Footer />
			</div>
			<a onClick={handleScroll} id="return-to-top" class="bounce" style={{ display: "block", cursor: "pointer" }}><i class="fas fa-angle-double-up"></i></a>
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
		</div>
		// <div>
		// 	<body class="loginpage" style={{ backgroundImage: `url(${login_bg})` }}>
		// 		<div class="login">
		// 			<div class="container-fluid">
		// 				<div class="row">
		// 					<div class="col-md-6 loginright align-self-center text-center">
		// 						{/* <img src={lion_img} alt="" /> */}
		// 					</div>
		// 					<div class="col-md-6 loginleft pr-0" style={{ backgroundImage: `url(${shape})` }}>
		// 						<div class="row h-100">
		// 							<div class="col-lg-7 align-self-center col-md-10 mx-auto loginpagemain">
		// 								<div class="login_logo"> <Link to={APIPath()}><img src={logo} alt="" /></Link><h3>Reset Your Password</h3></div>
		// 								<form
		// 									onSubmit={event => {
		// 										event.preventDefault();
		// 										//if (user.password !== user.conf_password) return;
		// 										resetPassword(userdata);
		// 									}}>
		// 									<ul>
		// 										<li>

		// 											<HtmlTooltip
		// 												open={pwdtooltip}
		// 												placement="right"
		// 												title={
		// 													<>
		// 														<Typography variant="body2" color="inherit">
		// 															Password Policy
		// 														</Typography>
		// 														<span style={{ color: "red" }}>
		// 															{bull}
		// 															{" Minimum length is 8 characters"}
		// 															<br />
		// 															{bull}
		// 															{" Atleast one upper case character"}
		// 															<br />
		// 															{bull}
		// 															{" Atleast one special character"}
		// 															<br />
		// 															{bull}
		// 															{" Atleast one number"}
		// 														</span>
		// 													</>
		// 												}
		// 											>
		// 												<div class="input-login"><i class="fas fa-user"></i>
		// 													<input type="password" name="new_pwd" value={userdata.new_pwd} onChange={handleInputChangeforPassword} placeholder="New Password" class="form-control" />
		// 												</div>
		// 											</HtmlTooltip>


		// 										</li>
		// 										<li>
		// 											<div class="input-login"><i class="fas fa-user"></i>
		// 												<input type="password" name="confirm_pwd" value={userdata.confirm_pwd} onChange={handleInputChange} placeholder="Confirm Password" class="form-control" />
		// 											</div>
		// 										</li>
		// 										<li>
		// 											<div class="row align-items-center">
		// 												<div class="col-6 chkboxmain">
		// 													<button type="submit" class="btn-style-one">Reset</button>
		// 												</div>
		// 											</div>
		// 										</li>

		// 									</ul>
		// 								</form>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</body>
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
		// 		<CircularProgress color="inherit" />
		// 	</Backdrop>
		// </div>
	);
};