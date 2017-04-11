import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

 
export default class Landing extends Component {
	
	constructor(props) {
    super(props);
 
    this.state = {
	  privacy: true,
    };
  }	
	
	handlePrivacyClick() {
		this.setState({
			privacy: !this.state.privacy
		});
	}
	
	render() {
		return (

		<div className="landing-page">
		
			<div className="jumbotron jumbotron-fluid">
			  <div className="container-fluid hero">
				<div className="row justify-content-start">
				  <div className="offset-md-2 col-md-8">
					<h1>
					  A to-do list that gives you the context for each task. 
					</h1>
				  </div>
				  <div className="offset-md-2 col-md-4 align-self-center">
					<button type="button" className="btn btn-lg cta-btn"><AccountsUIWrapper /></button>
				  </div>
				</div>
				<div className="row justify-content-start">
				  <div className="offset-md-2 col-md-8">
					<h4>
					  <span className="logo-text">Dediddo</span> is perfect for recurring tasks and complex tasks that require more than a bullet point reminder.
					</h4> 
				  </div>
				</div>
			  </div>
			</div>			
			
			<main className="container-fluid">
				<section className="row justify-content-center social-proof">
				</section>
				<section className="explanation">
				  <h2 className="text-center">What is <span className="logo"><span className="de">De</span><span className="did">did</span><span className="do">do</span></span></h2>
				  <h6 className="text-center"><span className="logo-text">Dediddo</span> is short for <span className="logo"><span className="de">Details</span> - <span className="did">Did</span> - <span className="do">Do</span></span> system.</h6>
				  <div className="row">
					<div className="col-sm-4">
						<p><span className="logo-text">Details</span> is where you define the macro task and include any relevant, more permanent details.</p>
					</div>
					<div className="col-sm-4">
						<p><span className="logo-text">Did</span> is where you keep your task record, with any info that might be useful for future reference.</p>
					</div>
					<div className="col-sm-4">
						<p><span className="logo-text">Do</span> is where you list the more immediate to-do: your next action with a deadline.</p>
					</div>					
				  </div>
				  <div className="row">
					<div className="col-12 img-shadow">
						<img src="/dediddo-screenshot.jpg" className="img-fluid " />
					</div>
				  </div>        
				</section>
				<section className="features">
				  <h2 className="text-center">Why use <span className="logo"><span className="de">De</span><span className="did">did</span><span className="do">do</span></span></h2>
				  <div className="row">
					<div className="col-sm-6 col-md-4">
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-organization.png" />
					  <h5>
						Be organized
					  </h5>
					  <p>
						A simple to-do list promises organization. <span className="logo-text">Dediddo</span> delivers it.<br></br>
						All relevant info in one place, properly organized and easily skimmable.
					  </p>
					</div>
					<div className="col-sm-6 col-md-4">
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-learn.png" />
					  <h5>
						Learn from repetition
					  </h5>
					  <p>
						When you register data from each task execution you are creating knowledge.<br></br>
						Each task record is a knowledge base you can access whenever you need.
					  </p>
					</div>
					<div className="col-sm-6 col-md-4">
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-done.png" />
					  <h5>
						Get things done
					  </h5>
					  <p>
						Fewer context changes, more focus.<br></br>
						<span className="logo-text">Dediddo</span> makes it simple to execute by avoiding distractions when you don't need them.
					  </p>
					</div>
				  </div>        
				</section>

				 <section className="about" id="about">
				   <h2 className="text-center">about</h2>
				   <div className="row justify-content-center align-items-center">
					 <div className="col-sm-2">
					   <img src="/dediddo-logo.png"/>
					 </div>             
					 <div className="col-sm-10 col-md-8">
						<p>
							NB: <span className="logo-text">Dediddo</span> is in the Alpha phase of its development.
						</p>
					   <p>
						 <span className="logo-text">Dediddo</span> was developed to fulfill a need for a to-do list that could better handle recurring and complex tasks.  
					   </p>
						<h6>
							Pricing
						</h6>
						<p>
							Free, for now.
						</p>
						<p>
							At this alpha phase, <span className="logo-text">Dediddo</span> still lacks some important features, most notably calendar integration and tags. These features are in development, but I expect early adopters to help me figure out how the product roadmap should look going forward.<br></br>
							When the most valuable features to the users become functional and stable, the product will enter the Beta phase and I will start charging a fair monthly subscription (price yet to defined, also with the help of early adopters).
						</p>
					   
					 </div>

				  </div>
				</section>

			</main>			
		

					<div className="col col-12 text-right">
						<footer>
							contact rodrigo@dediddo.com | <span className="privacy-link" onClick={this.handlePrivacyClick.bind(this)}>Privacy</span> | Rodrigo Pontes All Rights Reserved 2017
						</footer>
					</div>

					{ !this.state.privacy ?
					<div className="privacy" id="privacy-text">
						<span className="privacy-link" onClick={this.handlePrivacyClick.bind(this)}><em>hide</em></span>
						<h6  className="landing-title">
							Privacy Policy
						</h6>
						<p>This Privacy Policy describes the policies and procedures of Dediddo (&ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) on the collection, use and disclosure of your information on www.dediddo.com (the &ldquo;Site&rdquo;) and the services, features, content or applications we offer (collectively with the Site, the &ldquo;Services&rdquo;). We receive information about you from your use of the Services generally; and from third party websites and services. When you use the Services, you are consenting to the collection, transfer, manipulation, storage, disclosure and other uses of your information as described in this Privacy Policy.</p>
						<p>WHAT INFORMATION DO WE COLLECT?<br></br>
							The information we gather enables us to personalize, improve and continue to operate the Services. In connection with certain aspects of the Services, we may request and collect some of your Personal Information.</p>
						<p>Some features of the Services allow you to provide content to the Services. All content submitted by you to the Services may be retained by us indefinitely, even if and after your access to the Services is terminated. We may continue to disclose such content to third parties in a manner that does not reveal Personal Information, as described in this Privacy Policy.</p>
						<p>IS INFORMATION ABOUT ME SECURE?<br></br>
							We seek to protect user information to ensure that it is kept private; however, we cannot guarantee the security of any user information. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time.</p>
						<p>We otherwise store all of our information, including your IP address information, using industry-standard techniques. We do not guarantee or warrant that such techniques will prevent unauthorized access to information about you that we store, Personal Information or otherwise.</p>
						<p>You can always opt not to disclose certain information to us, even though it may be needed to take advantage of some of our features.</p>
						<p>If you have any questions or concerns regarding privacy using the Services, please send us a detailed message to rodrigo@dediddo.com. We will make every effort to resolve your concerns. Effective Date: March 27, 2017.</p>
						
					</div> : '' }
					
			</div>

		)
	}
}
