import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../images/logo.png";
import Footer from "../../components/Footer/Footer.js";
import Header from "../../components/Header/Header.js";
// import error_img from "../../images/404-error.png";
// import inner_banner from "../../images/inner-banner-1.jpg";
import { APIPath } from "../../CommonMethods/Fetch";
export default function Error() {
	useEffect(() => {
		window.scroll(0, 0);
	})
	return (
		<div>
			<Header />
			{/* <section class="inner_banner" style={{ backgroundImage: `url(${inner_banner})` }}>
				<div class="inner_banner_main">
					<h1>404</h1>
				</div>
			</section> */}
			<section class="drivex_bread_main">
				<div class="container">
					<div class="row">
						<div class="drivex_bread_card">
							<ul>
								<li><Link to={APIPath()}><i class="fa fa-home"></i></Link></li>
								<li><a href="#">404</a></li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section class="drivex_404_sec">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<di class="drivex_404_sec_main">
								<div class="row error_center">
									<div class="col-lg-6 col-md-6">
										<div class="sec_left_cont">
											<h5>Ooops ! Error</h5>
											<h3>404</h3>
											<p>Sorry Page Not Fount , Site Under Construction</p>
											<Link href="/">Go back to home <i class="fa fa-long-arrow-right" aria-hidden="true"></i></Link>
										</div>
									</div>
									<div class="col-lg-6 col-md-6">
										<div class="sec_right_cont">
											{/* <img src={error_img} /> */}
										</div>
									</div>
								</div>
							</di>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};