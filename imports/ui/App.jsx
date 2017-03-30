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
							<input name="email" type="hidden" value={this.props.currentUser.username}/>
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
			
				<div className="row no-gutters landing-copy">
					<h1><span className="de">De</span><span className="did">did</span><span className="do">do</span>, the minimal tool for sales</h1>
					<h2>or any recurrent task that needs <strong>context</strong> and <strong>follow-ups</strong></h2>
					<p>
						No distractions, no time-consuming setups, no complex funnels. From will to action in the shortest time.
					</p>
					<p>
						<span className="de">De</span><span className="did">did</span><span className="do">do</span> makes it clear what you have to do next, giving enough context for you to do it well. Nothing else. 
					</p>
					<p>
					It works as a list of Subjects, each with 3 columns of info:
					</p>
				</div> : ''
			
			}	
			
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
			
			{ !this.props.currentUser ?
			<div>
				<div className="row no-gutters subject landing-columns">  
					<div className="do-column col-4">
						<div className="card">
							<p><strong>Details</strong> of the subject</p>
							<p>In this column, you save all more permanent, basic info about the Subject.</p>
						</div>                  
					</div>
					<div className="do-column col-4">
						<div className="card">
							<p>All you ever <strong>did</strong></p>
							<p>Here you register all interactions you had with the subject.</p>
						</div>                  
					</div>
					<div className="do-column col-4">
						<div className="card">
							<p>What to <strong>do</strong> next</p>
							<p>Here goes your next action with the deadline you set for it.</p>
						</div>                     
					</div>
				</div>
				<div className="row no-gutters landing-copy">
					<h2>Sign up above and you can start using <span className="de">De</span><span className="did">did</span><span className="do">do</span>, <strong>for free</strong>, right away!</h2>
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
				{ !this.state.privacy ?
				<div className="privacy" id="privacy-text">
					<span className="privacy-link" onClick={this.handlePrivacyClick.bind(this)}><em>hide</em></span>
					<h6  className="landing-title">
						Privacy Policy
					</h6>
					<p>
						This Privacy Policy describes the policies and procedures of Dediddo (&ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) on the collection, use and disclosure of your information on www.dediddo.com (the &ldquo;Site&rdquo;) and the services, features, content or applications we offer (collectively with the Site, the &ldquo;Services&rdquo;). We receive information about you from your use of the Services generally; and from third party websites and services. When you use the Services, you are consenting to the collection, transfer, manipulation, storage, disclosure and other uses of your information as described in this Privacy Policy.
					</p>

					<p>
						WHAT INFORMATION DO WE COLLECT?<br></br>
						The information we gather enables us to personalize, improve and continue to operate the Services. In connection with certain aspects of the Services, we may request and collect some of your Personal Information.
					</p>

					<p>
						Some features of the Services allow you to provide content to the Services. All content submitted by you to the Services may be retained by us indefinitely, even if and after your access to the Services is terminated. We may continue to disclose such content to third parties in a manner that does not reveal Personal Information, as described in this Privacy Policy.
					</p>

					<p>
						IS INFORMATION ABOUT ME SECURE?<br></br>
						We seek to protect user information to ensure that it is kept private; however, we cannot guarantee the security of any user information. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time.
					</p>

					<p>
						We otherwise store all of our information, including your IP address information, using industry-standard techniques. We do not guarantee or warrant that such techniques will prevent unauthorized access to information about you that we store, Personal Information or otherwise.
					</p>

					<p>
						You can always opt not to disclose certain information to us, even though it may be needed to take advantage of some of our features.
					</p>

					<p>
						If you have any questions or concerns regarding privacy using the Services, please send us a detailed message to rodrigo@dediddo.com. We will make every effort to resolve your concerns. Effective Date: March 27, 2017.
					</p>
					
				</div> : '' }
			</div>	: ''
			}
			
			
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new subjects"
				
              />
            </form> : ''
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