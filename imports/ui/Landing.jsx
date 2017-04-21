import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

 
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
				  <div className="offset-md-2 col-md-8">
					<h1>
					  A to-do list that gives you all the context you need in a glimpse. 
					</h1>
				  </div>
				  <div className="offset-md-2 col-md-4 align-self-center">
					<button type="button" className="btn btn-lg cta-btn"><AccountsUIWrapper /></button>
				  </div>
				</div>
				<div className="row justify-content-start">
				  <div className="offset-md-2 col-md-8">
					<h4>
					  <span className="logo-text">Dediddo</span> is perfect if your tasks are more than a bullet point, but you still want to get all the info you need without clicking around.
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
				  <h6 className="text-center"><span className="logo-text">Dediddo</span> is a better way to view your to-do lists.</h6>
				  <div className="row">
					<div className="col-sm-4">
						<h5>Priority in a glimpse</h5>
						<p>The card size tells you the priority of the task and how long it will take to complete it.</p>
					</div>
					<div className="col-sm-4">
						<h5>Shows what you need</h5>
						<p>You choose if you want to see just the To Do or all the info about it.</p>
					</div>
					<div className="col-sm-4">
						<h5>Tags and smart filter</h5>
						<p>You can create multiple lists using tags and hide the ones without a deadline.</p>
					</div>					

					<div className="col-12 img-shadow">
						<img src="/dediddo-screenshot.gif" className="img-fluid " />
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
				
				<section className="guide">

					<main className="container-fluid">
					
						<section className="guide-intro-lp">
						   <h1 className="text-center logo"><span className="de">De</span><span className="did">did</span><span className="do">do</span><span className="de">'s </span><span className="did">Gui</span><span className="do">de</span></h1>
						   <h4 className="text-center">Welcome to the to-do list that needs a guide</h4>
						   <div className="row justify-content-center align-items-center">
            
							 <div className="offset-sm-1 col-sm-11">
							   <p>
								<span className="logo-text">Dediddo</span> is a quite opinionated to-do list, here you can read more about its design choices, helping you take the most out of it (or allowing you to decide if it's not for you after all so you can move on to the next to-do list software).
							   </p>
							   <p>Click on the question for a more detailed answer:</p>
							 </div>
							</div>
							 <div className="row">
								<div className="col-12">
								<div className="guide-section-lp">
								   <h5 className="text-center guide-show-lp" onClick={() => this.toggleShowGuideOne()}>What is a Topic and what is inside it?</h5>
								   <p className="guide-show-lp-subtitle" >TL;DR: topic, to do, priority, size, deadline, tags, details, and records.</p>
								   {this.state.showGuideOne ?
								   <div className="row justify-content-center align-items-center">           
									 <div className="col-sm-7">

										<p><strong>Topic</strong> is the task in more general terms, you create a new Topic by writing the Topic title. <br></br>Once you create a Topic, you will see that each one has the following fields:</p>
										<p><strong>To Do</strong> is where you write the immediate next action, exactly as you would write on a regular to-do list.</p>
										<p><strong>Priority</strong> is where you set the priority level of your To Do between low, medium and high. This affect the width and color of how the Topic is presented on the list (details below).</p>
										<p><strong>Size</strong> is where you set how long it will take to complete the task, the estimated size of your To Do between small, medium and large. This affect the height of how the Topic is presented on the list (details below).</p>
										<p><strong>Deadline</strong> is where you set the date and time you plan to complete the To Do. This will affect the position of the Topic one the list (details below).</p>
										<p><strong>Tags</strong> is where you add tags to each Topic. This can be to differentiate categories, lists or any grouping you want. This will be used to filter which topics will be shown on your list (details below).</p>
										<p><strong>Details</strong> is where you add the necessary info you need to perform the To Do. It is a space reserved for more permanent information about the Topic that will give you context to perform the To Do.</p>
										<p><strong>Records</strong> is where you register every update every time you complete or advance on a To Do. Its goal is to be your journal of notes for (mostly)recurring tasks. When you add a record, the date is automatically registered, not editable and shown along your notes. This is by design so to act as a nudge to create the habit of note taking at the time you complete or advance a task. It is ordered by most recent first.</p>
									 </div>
									 <div className="col-sm-5">
									   <img src="/guide-topic.gif"/>
									 </div>  					 
								   </div> : '' }
								</div>		

								 <div className="guide-section-lp">
								   <h5 className="text-center guide-show-lp" onClick={() => this.toggleShowGuideTwo()}>How are the Topics sized and ordered?</h5>
								   <p className="guide-show-lp-subtitle" >TL;DR: width and color = priority, height = task size, and position = deadline.</p>
								   {this.state.showGuideTwo ?
								   <div className="row justify-content-center align-items-center">           
									 <div className="col-sm-7">
										<p>When you set the priority and size of a To Do you affect the layout of how that Topic is presented on your list. This is so you can easily identify larger and more urgent tasks.</p>
										<p><strong>The Deadline determines the order that Topics are listed. The earliest deadlines come first.</strong></p>
										<p><strong>The Priority level determines the width and color of the Topic.</strong><br></br>
										A Low priority Topic is one third of the screen wide, with a light pinkish background.<br></br>
										A Medium priority Topic is two thirds of the screen wide, with a light greenish background.<br></br>
										A High priority Topic is full screen wide, with a light blue background.
										</p>
										<p><strong>The Size determines the height of the Topic.</strong><br></br>
										A Small size Topic has a height of one row.<br></br>
										A Medium size Topic has a height of two rows.<br></br>
										A Large size Topic has a height of three rows.<br></br>
										</p>
										<p><strong>Summary: the larger the area of the Topic, more attention it deserves.</strong></p>
									</div>
									 <div className="col-sm-5">
									   <img src="/guide-size-priority.png"/>
									 </div>  					 
								   </div> : '' }
								</div>			

								<div className="guide-section-lp">
								   <h5 className="text-center guide-show-lp" onClick={() => this.toggleShowGuideThree()}>How to better view and filter the to-dos?</h5>
								   <p className="guide-show-lp-subtitle" >TL;DR: filter by tag, filter out topics with no to-do, clean view of to-do text only</p>
								   {this.state.showGuideThree ?
								   <div className="row justify-content-center align-items-center">           
									 <div className="col-sm-7">
										<p><strong>Filter Topics with no To Do by clicking on <em>hide empty</em>.</strong><br></br>
										It will hide every Topic with an empty To Do text.<br></br>
										A deadline is empty when the Topic is created or when you edit the deadline and clean the input field.<br></br>
										You can use this filter for Topics that do not have a immediate To Do, but that you don't want to delete.
										</p>
										<p><strong>Filter Topics by tags by clicking on the Tags that you want to list.</strong><br></br>
										It will only show Topics that are tagged with the selected tags.<br></br>
										You create a Tag directly at the Topics. Any tag created at any Topic will automatically be listed on the top tag menu.<br></br>
										You can select multiple tags and it will show all Topics that have any one of the selected tags. Remember that a Topic with no tags will not be listed whenever any one tag is selected.
										</p>						
										<p><strong>For a minimalistic view of your To Do list click on <em>clean view</em>.</strong><br></br>
										It will hide every information on every topic, except the To Do.<br></br>
										The Topic color, width, and height will stay the same, as well as any filter by tag or deadline that is set.<br></br>
										You won't be able to edit any info (except the To Do) when this view is set. Click again the checkbox to edit other fields.
										</p>
									</div>
									 <div className="col-sm-5">
									   <img src="/guide-clean-view.png"/>
									 </div>  					 
								   </div> : '' }
								</div>
							 </div>
						  </div>
						</section>
					
						 								

					</main>			
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
						 <span className="logo-text">Dediddo</span> was developed to fulfill a need for a to-do list that could better handle more complex tasks without becoming a complex task management tool.  
					   </p>
						<h6>
							Pricing
						</h6>
						<p>
							Free, for now.
						</p>
						<p>
							At this alpha phase, <span className="logo-text">Dediddo</span> still lacks some important features. I expect you, the user, to help me figure out what those features are so I can build it for you.<br></br>
							When the most valuable features to the users become functional and stable, the product will enter the Beta phase and I will start charging a fair subscription for a premium version (price yet to defined, also with the help of the users).
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
