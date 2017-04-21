import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Landing from './Landing.jsx';
import Guide from './Guide.jsx';

 
// App component - represents the whole app
class App extends Component {
	
  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
	  showTodo: false,
	  showGuide: false,
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
		this.refs["hideEmpty"].classList.toggle('tagactive');
		this.setState({
		  hideCompleted: !this.state.hideCompleted,
		});
  }
  
    toggleShowTodo() {
		this.refs["showTodo"].classList.toggle('tagactive');
		this.setState({
		  showTodo: !this.state.showTodo,
		});
  }  
  
      toggleShowGuide() {
		this.setState({
		  showGuide: !this.state.showGuide,
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
      filteredTasks = filteredTasks.filter(task => task.todo);
      filteredTasks = filteredTasks.filter(task => task.todo !== "");
	  
	 // filteredTasks = filteredTasks.filter(task => task.deadline.toUTCString() !== 'Thu, 01 Jan 1970 00:00:00 GMT');
    }
	
	if (this.state.tagFilter && this.state.tagFilter.length > 0) {
		var tempTagFilter = this.state.tagFilter.slice();
		filteredTasks = filteredTasks.filter(function (task) {
			if(task.tags) {
			for (var i = 0; i<task.tags.length;i++) {
				for (var j = 0;j<tempTagFilter.length;j++){
					if(task.tags[i] === tempTagFilter[j]) return true;
				}
				
			}
			}
		});
    }
	
    if (this.state.showTodo) {
		var notTodos =     document.getElementsByClassName('not-todo');
		for(i=0; i<notTodos.length; i++) {
		notTodos[i].style.opacity = 0;
		}
		var doCards =     document.getElementsByClassName('do-card');
		for(i=0; i<doCards.length; i++) {
		doCards[i].style.backgroundColor = 'rgba(255,255,255,0)';
		}		
	} else {
		var notTodos =     document.getElementsByClassName('not-todo');
		for(i=0; i<notTodos.length; i++) {
		notTodos[i].style.opacity = 1;		
		}
		var doCards =     document.getElementsByClassName('do-card');
		for(i=0; i<doCards.length; i++) {
		doCards[i].style.backgroundColor = 'rgba(255,255,255,0)';
		}			
    }	
	
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
	  
      return (
        <Task
			key={task._id}
			task={task}
			showTodo={this.state.showTodo}
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
			

			
			{ !this.state.showGuide && this.props.currentUser ?
			<div className="app-page">
				<header className="row no-gutters">
				  <div className="col-4">
					  <p className="logo">
						<span className="de">De</span><span className="did">did</span><span className="do">do</span>
					  </p>
				  </div>
				  <div className="col-3">
					<p className="guide-show" onClick={() => this.toggleShowGuide()}>Guide</p>
				  </div>
				  <div className="col-5">
					<AccountsUIWrapper />
				  </div>
				</header>
			

				<div className="row justify-content-end options">
				
					{ this.state.featureform ?
					<div id="request-form" className="accounts-dialog offset-3 col-md-6 text-align-left">
						<a className="login-close-text" onClick={this.handleFeatureRequest.bind(this)}>Close</a>
						<form action="https://formspree.io/rodrigo@dediddo.com" method="POST">
							<label htmlFor="request-text">What's your feature request?</label>
							<input name="request" id="request-text" type="textArea" autoFocus />
							<input name="email" type="hidden" value={this.props.currentUser.emails[0].address}/>
							<input type="hidden" name="_next" value="/" />
							<button className="login-button login-button-form-submit" id="request-submit">Send</button>
							<p className="footnote">or email me directly at rodrigo@dediddo.com</p>
						</form>
						
					</div>  : '' }				

					<p className="hide-completed  col-4 col-sm-3 text-center " ref="hideEmpty" onClick={this.toggleHideCompleted.bind(this)}>hide empty</p>
					<p className="show-todo  col-4  col-sm-3 text-center " ref="showTodo"  onClick={this.toggleShowTodo.bind(this)}>clean view</p>

							 
				</div> 				
					
					<div className="tagmenu">
						<p>tags:</p>
						{this.renderTagMenu()}
					</div>  
		  
				<div>
				  
					<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
					  <input
						type="text"
						ref="textInput"
						placeholder="Type to add new topic"
						
					  />
					</form> 
				</div> 
		
			
				<ul>
				  
				  { this.props.currentUser ?
					this.renderTasks() : ''
				  }				  
				</ul>            
            </div> : '' }
			
			{ this.props.currentUser && this.state.showGuide ? 
			<div>
				<header className="row">
				  <div className="col-5">
					  <p className="logo">
						<span className="de">De</span><span className="did">did</span><span className="do">do</span>
					  </p>
				  </div>

				  <div className="col-7">
					<AccountsUIWrapper />
				  </div>
				</header>
				<div className="row ">
					<p className="guide-hide col-12 text-center" onClick={() => this.toggleShowGuide()}>Hide guide</p>
				  </div>
				<Guide />
			</div>: '' }	
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