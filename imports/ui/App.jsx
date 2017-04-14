import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Landing from './Landing.jsx';

 
// App component - represents the whole app
class App extends Component {
	
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
	  featureform: false,
	  tagFilter: [],
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
 
	toggleTagFilter(tagText) {
		var newTagFilter = this.state.tagFilter.slice();
		if (this.state.tagFilter.indexOf(tagText) === -1) {
			newTagFilter.push(tagText);
		} else {
			newTagFilter.splice(this.state.tagFilter.indexOf(tagText),1);
		}
		
		this.setState({
			tagFilter: newTagFilter,
		});	

  }
	
	renderTagMenu() {
		
		let allTags = [];
		
		this.props.tasks.map((task) => {
			if (task.tags) {
			for (var k = 0; k<task.tags.length; k++) {
				if (allTags.indexOf(task.tags[k]) === -1) allTags.push(task.tags[k]);
			}
			}
		});

		return allTags.map((tag, index) => {
		return <p key={index} ref={tag} onClick={() => {this.handleTagClick(tag)}}>{tag}</p>
		});
		
	}
	
	handleTagClick(tag) {
		this.refs[tag].classList.toggle('tagactive');
		this.toggleTagFilter(tag);
		
	}
	
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => task.deadline);
	  filteredTasks = filteredTasks.filter(task => task.deadline.toUTCString() !== 'Thu, 01 Jan 1970 00:00:00 GMT');
    }
	
	if (this.state.tagFilter && this.state.tagFilter.length > 0) {
		var tempTagFilter = this.state.tagFilter.slice();
		filteredTasks = filteredTasks.filter(function (task) {
			for (var i = 0; i<task.tags.length;i++) {
				for (var j = 0;j<tempTagFilter.length;j++){
					if(task.tags[i] === tempTagFilter[j]) return true;
				}
				
			}
		});
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
  
  

 
	handleFeatureRequest() {
		this.setState({
			featureform: !this.state.featureform
		});
	}
 
  render() {
    return (
         <div className="container-fluid board">
		 
			{ !this.props.currentUser ? 
			 <Landing />: '' }		 
			
			{ this.props.currentUser ?
			<div className="app-page">
				<header>
				  <p className="logo">
					<span className="de">De</span><span className="did">did</span><span className="do">do</span>
				  </p>
				  <AccountsUIWrapper />
				</header>
			

				<div className="row options">
				
					<p className="request-open-form col-6 text-align-left" onClick={this.handleFeatureRequest.bind(this)}>Do you have a feature request?</p>

					{ this.state.featureform ?
					<div id="request-form" className="accounts-dialog col-md-7 text-align-left">
						<a className="login-close-text" onClick={this.handleFeatureRequest.bind(this)}>Close</a>
						<form action="https://formspree.io/rodrigo@dediddo.com" method="POST">
							<label htmlFor="request-text">What's your feature request?</label>
							<input name="request" id="request-text" type="textArea"/>
							<input name="email" type="hidden" value={this.props.currentUser.emails[0].address}/>
							<input type="hidden" name="_next" value="/" />
							<button className="login-button login-button-form-submit" id="request-submit">Send</button>
							<p className="footnote">or email me directly at rodrigo@dediddo.com</p>
						</form>
						
					</div>  : '' }				
				
					<label className="hide-completed  col-6 text-align-right justify-content-end">
						<input
						  type="checkbox"
						  readOnly
						  checked={this.state.hideCompleted}
						  onClick={this.toggleHideCompleted.bind(this)}
						/>
						<em> Hide Subjects without a deadline</em>
					</label> 
				</div> 				
					
					<div className="tagmenu">
						<p>All tags:</p>
						{this.renderTagMenu()}
					</div>  
		  
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
						placeholder="Type to add new task"
						
					  />
					</form> 
				</div> 
		
			
				<ul>
				  
				  { this.props.currentUser ?
					this.renderTasks() : ''
				  }				  
				</ul>            
            </div> : '' }
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