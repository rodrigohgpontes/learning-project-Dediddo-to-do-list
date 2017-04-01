import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

 
// App component - represents the whole app
class App extends Component {
	
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
	  privacy: true,
	  featureform: false,
    };
  }	
	
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim() || "";
	
 
    if (text !== "") Meteor.call('tasks.insert', text);
	
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }	
  
    toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 
	
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => task.deadline);
	  filteredTasks = filteredTasks.filter(task => task.deadline.toUTCString() !== 'Thu, 01 Jan 1970 00:00:00 GMT');

    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
      return (
        <Task
          key={task._id}
          task={task}
		  currentUser={this.props.currentUser}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }
  
  
	handlePrivacyClick() {
		this.setState({
			privacy: !this.state.privacy
		});
	}
 
	handleFeatureRequest() {
		this.setState({
			featureform: !this.state.featureform
		});
	}
 
  render() {
    return (
         <div className="container board">
			
			<header>
			  <p className="logo">
				<span className="de">De</span><span className="did">did</span><span className="do">do</span>
			  </p>
  
			  
			  <AccountsUIWrapper />
			
				{ this.props.currentUser ? 
				<p className="request-open-form" onClick={this.handleFeatureRequest.bind(this)}>Do you have a feature request?</p> : ''}
			
				{ this.state.featureform ?
					<div id="request-form" className="accounts-dialog">
						<a className="login-close-text" onClick={this.handleFeatureRequest.bind(this)}>Close</a>
						<form action="https://formspree.io/rodrigo@dediddo.com" method="POST">
							<label htmlFor="request-text">What's your feature request?</label>
							<input name="request" id="request-text" type="textArea"/>
							<input name="email" type="hidden" value={this.props.currentUser.emails[0].address}/>
							<input type="hidden" name="_next" value="/" />
							<button className="login-button login-button-form-submit" id="request-submit">Send</button>
							<p className="footnote">or email me directly at rodrigo@dediddo.com</p>
						</form>
						
				</div> : '' }
			  
			</header>		
			
			  { this.props.currentUser ? 
			  <label className="hide-completed justify-content-end">
				<input
				  type="checkbox"
				  readOnly
				  checked={this.state.hideCompleted}
				  onClick={this.toggleHideCompleted.bind(this)}
				/>
				<em> Hide Subjects without a deadline</em>
			  </label> : '' }				

			{ !this.props.currentUser ? 
			<div className="landing-page">
				<div className="row no-gutters landing-copy">
					<h1><span className="de">De</span><span className="did">did</span><span className="do">do</span> is the minimal sales tool</h1>
					<h2>for non-sales people: founders, entrepreneurs, marketers, fundraisers</h2>
					<div className="img-shadow"><img className="img-fluid" src="/dediddo-screenshot.png" alt="dediddo" /></div>
					<h3>Easy, obvious organizer for your sales contacts and to-dos.</h3>
					<h4>You will have peace of mind while managing your contacts and improve your performance.</h4>
				</div>	
				<section className="how">
					<h4>How it works: the <em>detail-did-do</em> system</h4>
					<p>When it is time to contact a sales prospect, you need to know three things: <br></br> (i) who you are contacting, <br></br> (ii) what happened in the last contacts with this prospect, <br></br> (iii) and what you have to do next.</p>
					<p><span className="de">De</span><span className="did">did</span><span className="do">do</span> presents you all of that in a very clear and simple UI.</p>
					<p>You have a list of Subjects, each with 3 columns: <span>Details</span>, <span >did</span> and <span >do</span></p>
									
					<div className="row how-cards">  
						<div className=" col-sm-4">
								<p><strong>Details</strong> of the subject</p>
								<p>In this column, you save all more permanent, basic info about the Subject.</p>
						</div>
						<div className=" col-sm-4">
								<p>All you ever <strong>did</strong></p>
								<p>Here you register all interactions you had with the subject.</p>
						</div>
						<div className=" col-sm-4">
								<p>What to <strong>do</strong> next</p>
								<p>Here goes your next action with the deadline you set for it.</p>
						</div>
					</div>	
				</section>				
				<section className="benefits">
					<h4>Perform better on your sales</h4>
					<div className="row">
						<div className="col-sm-4">
							<p>Be organized</p>
							<p>Dediddo makes you organized by design.<br></br>You may be a mess with your personal stuff, but Dediddo makes impossible for you to be disorganized with your sales.</p>
						</div>
						<div className="col-sm-4">
							<p>Stay updated</p>
							<p>Dediddo makes you remember everything.<br></br>You will look like you have a great memory, creating a personal relationship with the prospect.</p>
						</div>
						<div className="col-sm-4">
							<p>Be diligent</p>
							<p>Dediddo tells you what to do next.<br></br>Just open it and you will know what to do next, no excuses, no <em>"Let me take some time to organize my contacts"</em> procrastination.</p>
						</div>
					</div>
				</section>
				<section className="whynot">
					<h4>Why not just use a spreadsheet?</h4>
					<div className="row">
						<div className="col-sm-4">
							<p>Better interface</p>
							<p>Imagine you have to register 5 interactions. Will each of them be in its own column? And when it becomes 10? Or all that text in one single cell? Not going to work.</p>
						</div>
						<div className="col-sm-4">
							<p>No setup time</p>
							<p>If you start now, how long will it take to make your spreadsheet just the way you want? Are you sure this is the best way to spend your time? </p>
						</div>
						<div className="col-sm-4">
							<p>Easier to access</p>
							<p>If you use Excel, will you be able to open the file anywhere? If you use Google Spreadsheet, how easy really is to find the file in your Google Drive and open it?</p>
						</div>
					</div>
				</section>
				
				<section className="cta">
					<h3><a href="#render-target">Sign up above</a> and you can start using <span className="de">De</span><span className="did">did</span><span className="do">do</span>, <strong>for free</strong>, right away!</h3>
					<img className="img-fluid" src="/dediddo-logo.png" alt="dediddo" height="200" width="auto" /> 
				</section>
				
				<section className="disclaimers">
					<div className="row  landing-copy">
						
						<h5 className="landing-title">About</h5>
						<p>
							NB: <span className="de">De</span><span className="did">did</span><span className="do">do</span> is in the Alpha phase of its development.  
						</p>
						<p>
							My name is Rodrigo Pontes and I created this tool to fulfill a need for a useful tool for sales that is better than a spreadsheet, but not so full of bells and whistles as most of the sales software out there.
						</p>
						<p>
							I have years of experience in sales, mostly at a non-fulltime sales role. I had to perform in sales as a non-profit organization fundraiser, as a startup founder, and as a startup growth leader. In all of these roles, I used the details-did-do system through a cumbersome spreadsheet. Even if sub-optimal and with available budget, I realized that this system was more efficient than adopting any of the most common used sales SaaS. So when I turned a developer I decided to transform it into a proper minimal SaaS to help others in the same position as I was.
						</p>
						
						<h5 className="landing-title">Pricing</h5>
						<p>For free, for now.</p>
						<p>
							At this alpha phase, <span className="de">De</span><span className="did">did</span><span className="do">do</span> still lacks some important features, most notably data import/export. This feature is in development, but I expect early adopters to help me figure out how the product roadmap should look going forward.<br></br>
							When the most valuable features to the users become functional and stable, the product will enter the Beta phase and I will start charging a monthly subscription (price yet to defined, also with the help of early adopters). 
						</p>
					</div>
					<div className="col col-12 text-right">
						<footer>
							contact rodrigo@dediddo.com | <span className="privacy-link" onClick={this.handlePrivacyClick.bind(this)}>Privacy</span> | Rodrigo Pontes All Rights Reserved 2017
						</footer>
					</div>
				</section>	
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
					
				</div> : '' }
			
			
          { this.props.currentUser ?
		  
            <div>
				<div className="row no-gutters columns-title">
				
					<div className="details-column col-4">
						<h6 className="text-center de">
							Details
						</h6>
					</div>
					<div className="did-column col-4">
						<h6 className="text-center did">
							did
						</h6>
					</div>
					<div className="do-column col-4">
						<h6 className="text-center do">
							do
						</h6>
					</div>
				</div>		  
			  
				<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
				  <input
					type="text"
					ref="textInput"
					placeholder="Type to add new subjects"
					
				  />
				</form> 
			</div> : ''
		  
		  }			
			
			<ul>
			  
			  { this.props.currentUser ?
				this.renderTasks() : ''
			  }				  
			</ul>            
              
		</div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,  
};
 
export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { deadline: 1 } }).fetch(),
   // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),	
  };
}, App);