import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import SignUpWrapper from './SignUpWrapper.jsx';
 
export default class Landing extends Component {
	
	constructor(props) {
    super(props);
 
    this.state = {
	  privacy: true,
	  showGuideOne: false,
	  showGuideTwo: false,
	  showGuideThree: false,
    };
  }	
	
	handlePrivacyClick() {
		this.setState({
			privacy: !this.state.privacy
		});
	}
	
      toggleShowGuideOne() {
		this.setState({
		  showGuideOne: !this.state.showGuideOne,
		});
  }  	
        toggleShowGuideTwo() {
		this.setState({
		  showGuideTwo: !this.state.showGuideTwo,
		});
  }  
        toggleShowGuideThree() {
		this.setState({
		  showGuideThree: !this.state.showGuideThree,
		});
  }  
	
	render() {
		return (

		<div className="landing-page">
		
			<div className="jumbotron jumbotron-fluid">
			  <div className="container-fluid hero">
				<div className="row justify-content-start">
				  <div className="offset-md-1 col-md-7">
					<h1>
					   <span className="logo">Dediddo</span> makes you better at prioritizing tasks.
					</h1>
					<div>
						<img src="/dediddo-screenshotv4.png" className="img-fluid" />
					</div>
					<h4>
					  Dediddo shows your to-dos as a priority-oriented board, not as a list. You first see what you first need to do.
					</h4> 
				  </div>
				  <div className="signup col-md-4 align-self-center">
					<SignUpWrapper />
				  </div>
				</div>

			  </div>
			</div>			
			
			<main className="container-fluid">
				<section className="row justify-content-center social-proof">
				</section>
				<section className="features">
				  <h2 className="text-center">Why use <span className="logo">Dediddo</span></h2>
				  <div className="row">
					<div className="col-sm-6 col-md-4">
					  <h4>Priorities in a glimpse</h4>					
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-priority.png" />
					  <p>The task card's size tells you the priority of the task and how long it will take to complete it.</p>
					</div>
					<div className="col-sm-6 col-md-4">
					  <h4>All info in one place</h4>					
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-allinfo.png" />
					  <p>Easy and fast access to multiple lists as well as to subtasks.</p>
					</div>
					<div className="col-sm-6 col-md-4">
					  <h4>Accessible from all devices</h4>					
					  <img className="img-fluid rounded mx-auto d-block" src="/feature-devices.png" />
					  <p>It runs on the web, with a responsive design. Check your to-dos everywhere, with no app downloads.</p>
					</div>
				  </div>        
				</section>
				
				<section className="about" id="about">
				   <div className="row justify-content-center">
					 <div className="col-12">
						<p>
							Dediddo is in the Alpha phase of its development. As such, it might still lack some features that are important for you. Please let me know if that is the case so I can consider building it for you.
						</p>
						<p>
							Pricing: Free, for now.
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
