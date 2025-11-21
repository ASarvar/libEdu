import React from "react";
import CounterUp from "../../elements/CounterUp";

function Counter (){
    return (
	<section className="counter-section theme-color-bg">
		<div className="auto-container">
			<div className="counter-wrapper2 section-padding">
				<div className="counter-block-one wow bounceInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
					<div className="icon-box">
						<i className="flaticon-business-049-presentation"></i>
					</div>
					<div className="count-box">
						<div className="counter">
							<span className="count-text"><CounterUp end={7011} /></span>
						</div>
						<div className="counter-title">Project Completed</div>
					</div>
				</div>
				<div className="counter-block-one wow bounceInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
					<div className="icon-box">
						<i className="flaticon-business-035-helpline"></i>
					</div>
					<div className="count-box">
						<div className="counter">
							<span className="count-text"><CounterUp end={70} /></span>+
						</div>
						<div className="counter-title">Team Member</div>
					</div>
				</div>
				<div className="counter-block-one wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
					<div className="icon-box">
						<i className="flaticon-business-030-settings"></i>
					</div>
					<div className="count-box">
						<div className="counter">
							<span className="count-text"><CounterUp end={5} /></span>+
						</div>
						<div className="counter-title">Year Of Experience</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
};
export default Counter;