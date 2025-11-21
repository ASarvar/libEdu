import React from "react";
import CounterUp from '../../elements/CounterUp';


function Solution(){
  return (
    <>
	<section className="counter-section section-padding">
		<div className="auto-container">
			<div className="counter-wrapper">
				<div className="counter-box-one wow bounceInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
					<div className="count-box">
						<h2><span className="count-text"><CounterUp end={1} /></span>M</h2>
						<p>Worldwide business Grow</p>
					</div>
				</div>
				<div className="separator"></div>
				<div className="counter-box-one wow bounceInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
					<div className="count-box">
						<h2><span className="count-text"><CounterUp end={12} /></span>K+</h2>
						<p>Satisfied Clients</p>
					</div>
				</div>
				<div className="separator"></div>
				<div className="counter-box-one wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
					<div className="count-box">
						<h2><span className="count-text"><CounterUp end={119} /></span>M</h2>
						<p>Countries Served</p>
					</div>
				</div>
				<div className="separator"></div>
				<div className="counter-box-one wow bounceInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
					<div className="count-box">
						<h2><span className="count-text"><CounterUp end={33} /></span></h2>
						<p>Award winning contest</p>
					</div>
				</div>
			</div>
		</div>
	</section>

    </>
  );
};

export default Solution;
