import React from "react";

function Contact (){
  return (
	<section id="contact" className="contact-two-area section-padding fix">
		<div className="auto-container">
			<div className="contact-outer">
				<div className="contact-two-left">
					<div className="sec-title mb-50">
						<h6 className="sub-title light wow fadeInUp">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							Contact Us
						</h6>
						<h2 className="title light fadeInUp" data-wow-delay=".2s">Please Keep in Touch With <br/>us When you want</h2>
					</div>
					<div className="contact-two__form">
						<form action="#">
							<h3 className="form-title">Contact with us</h3>
							<div className="input">
								<input id="name" placeholder="Name" type="text"/>
							</div>
							<div className="input">
								<input id="email" placeholder="E-mail address" type="email"/>
							</div>
							<div className="input">
								<input id="phone" placeholder="Phone" type="text"/>
							</div>
							<div className="textarea">
								<textarea name="message" placeholder="Message" id="message"></textarea>
							</div>
							<button className="theme-btn btn-style-two" data-splitting data-text="Send Message">Send Message</button>
						</form>
					</div>
				</div>
			</div>			
		</div>
		<div className="contact-two_shape">
			<img src="images/home-7/contact/shape-image.png" alt="image"/>
		</div>
		<div className="contact-two__map" style={{backgroundImage: 'url(images/home-7/contact/map.png)'}}>
			<div className="location">
				<img className="wow bounceIn" src="images/home-7/contact/map-location.png" alt="image"/>
			</div>
		</div>
	</section>
  );
};

export default Contact;