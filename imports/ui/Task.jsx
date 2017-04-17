import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import classnames from 'classnames';

import { Details } from '../api/tasks.js';
import { Dids } from '../api/tasks.js';
 
 
// Task component - represents a single todo item
class Task extends Component {
	
  constructor(props) {
    super(props);
 
    this.state = {
      showTodoInput: false,
	  showDeadlineInput: false,
	  showTextInput: false,
	  showDetailForm: '',
	  showDidForm: '',
    };
	this.handleDetailClick = this.handleDetailClick.bind(this);
	this.handleDidClick = this.handleDidClick.bind(this);
  }		

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);

  }
 
  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }	
	
  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }	
  
  
  handleSubmitText(event) {
	event.preventDefault();
 
    // Find the text field via the React ref
    const newtext = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call('tasks.setText', this.props.task._id, newtext);
	this.setState({showTextInput: false});

  }	  
  


  handleEditText() {
	var defaultText = this.props.task.text;
	
	return defaultText;

  }	  
  


  handleSubmitDeadline(event) {
	event.preventDefault();
	
    // Find the text field via the React ref
    const deadline = new Date(ReactDOM.findDOMNode(this.refs.deadlineInput).value);
    Meteor.call('tasks.setDeadline', this.props.task._id, deadline);
	this.setState({showDeadlineInput: false});
  }	
  
  handleEditDeadline() {
	var defaultString = "";
	var defaultYear = this.props.task.deadline.getFullYear();
	var defaultMonth = this.props.task.deadline.getMonth()+1;
	var defaultDate = this.props.task.deadline.getDate();
	var defaultHour = this.props.task.deadline.getHours();
	var defaultMinute = this.props.task.deadline.getMinutes();
	if (defaultMonth < 10) defaultMonth = "0"+defaultMonth;
	if (defaultDate < 10) defaultDate = "0"+defaultDate; 
	if (defaultHour < 10) defaultHour = "0"+defaultHour;
	if (defaultMinute < 10) defaultMinute = "0"+defaultMinute;	
	defaultString = defaultYear+"-"+defaultMonth+"-"+defaultDate+"T"+defaultHour+":"+defaultMinute+":00";
	//if (this.props.task.deadline.toUTCString() === 'Thu, 01 Jan 1970 00:00:00 GMT') defaultString = null;
	return defaultString;
	
  }
  
  handleSubmitTodo(event) {
	event.preventDefault();
 
    // Find the text field via the React ref
    const todo = ReactDOM.findDOMNode(this.refs.todoInput).value.trim();
 
    Meteor.call('tasks.setTodo', this.props.task._id, todo);
	this.setState({showTodoInput: false});

  }	  
  
  handleEditTodo() {
	var defaultTodo = this.props.task.todo;
	
	return defaultTodo;

  }	    

 renderTags() {
    let tags = this.props.task.tags;

    return tags.map((tag, index) => {

      return (

			<p key={index}>{tag}
				<button type="button" aria-label="Close" className="delete-detail close align-self-end" onClick={() => {this.deleteThisTag(tag)}}>
					<span aria-hidden="true">&times;</span>
				</button>
			</p>

      );
    });
  }    
  
  handleSubmitTag(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const tag = ReactDOM.findDOMNode(this.refs.newTagInput).value.trim() || "";
	const taskID = ReactDOM.findDOMNode(this.refs.taskIDNewTagInput).value;
    if (tag !== "") Meteor.call('tasks.setTag', tag, taskID);
	
    // Clear form
    ReactDOM.findDOMNode(this.refs.newTagInput).value = '';
  }
  
    deleteThisTag(tagText) {
    Meteor.call('tasks.removeTag', this.props.task._id, tagText);
  }		
  
  renderDetails() {
    let filteredDetails = this.props.details;
    filteredDetails = filteredDetails.filter(detail => detail.owner === this.props.task.owner);
	filteredDetails = filteredDetails.filter(detail => detail.taskID === this.props.task._id);
    return filteredDetails.map((detail) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = detail.owner === currentUserId;

      return (
		   this.state.showDetailForm !== detail._id ?
			<Detail
			  key={detail._id}
			  detail={detail}
			  currentUser={this.props.currentUser}
			  handleDetailClick={this.handleDetailClick}
			/> :
			<form key={detail._id} className="new-task" onSubmit={this.handleEditDetail.bind(this)}>
				<input 
					type="text"
					ref="detailInput"
					defaultValue={detail.text}
					autoFocus
				/>
				<input
					type="hidden"
					ref="detailIDDetailInput"
					value={detail._id}
				/>						  
			</form>		
		  
      );
    });
  }  
  
  handleSubmitDetail(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.newDetailInput).value.trim() || "";
	const taskID = ReactDOM.findDOMNode(this.refs.taskIDNewDetailInput).value;
    if (text !== "") Meteor.call('details.insert', text, taskID);
	
    // Clear form
    ReactDOM.findDOMNode(this.refs.newDetailInput).value = '';
  }	
  
  handleEditDetail(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.detailInput).value.trim() || "";
	const detailID = ReactDOM.findDOMNode(this.refs.detailIDDetailInput).value;
    if (text !== "") Meteor.call('details.setText', detailID ,text);
	this.setState({
		showDetailForm: '',
	});
  }	  
  
  handleDetailClick(id) {
        this.setState({
            showDetailForm: id,
        });	  
  }
  
  renderDids() {
    let filteredDids = this.props.dids;
    filteredDids = filteredDids.filter(did => did.owner === this.props.task.owner);
	filteredDids = filteredDids.filter(did => did.taskID === this.props.task._id);
    return filteredDids.map((did) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = did.owner === currentUserId;
 
      return (

		   this.state.showDidForm !== did._id ?
			<Did
			  key={did._id}
			  did={did}
			  currentUser={this.props.currentUser}
			  handleDidClick={this.handleDidClick}
			/> :
			<form key={did._id} className="new-task" onSubmit={this.handleEditDid.bind(this)}>
				<input 
					type="text"
					ref="didInput"
					defaultValue={did.text}
					autoFocus
				/>
				<input
					type="hidden"
					ref="didIDDidInput"
					value={did._id}
				/>						  
			</form>				
      );
    });
  }  
  
  handleSubmitDid(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.newDidInput).value.trim() || "";
	const taskID = ReactDOM.findDOMNode(this.refs.taskIDNewDidInput).value;
    if (text !== "") Meteor.call('dids.insert', text, taskID);
	
    // Clear form
    ReactDOM.findDOMNode(this.refs.newDidInput).value = '';
  }

  handleEditDid(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.didInput).value.trim() || "";
	const didID = ReactDOM.findDOMNode(this.refs.didIDDidInput).value;
    if (text !== "") Meteor.call('dids.setText', didID ,text);
	this.setState({
		showDidForm: '',
	});
  }	  
  
  handleDidClick(id) {
        this.setState({
            showDidForm: id,
        });	  
  }  
  
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
	
    return (
		<li className={taskClassName}>
            <div className="row no-gutters subject">  
                <div className="details-column col-4">
					<div className="card">
					
					{ 	this.state.showTextInput || this.props.task.text === "" ?
						<form className="new-task" onSubmit={this.handleSubmitText.bind(this)}>
						  <input
							type="text"
							ref="textInput"
							placeholder="insert task title"
							defaultValue={this.handleEditText()}
							autoFocus
						  />

							
						</form> :
						<p onClick={() => this.setState({showTextInput: true})}>{this.props.task.text}</p>
					}

					{ 	this.props.task.tags ?
					<div className="tags">
						{this.renderTags()}
					
						<form className="new-task" onSubmit={this.handleSubmitTag.bind(this)}>
						  <input 
							type="text"
							ref="newTagInput"
							placeholder="add new tag"
						  />
						  <input
							type="hidden"
							ref="taskIDNewTagInput"
							value={this.props.task._id}
							
						  />						  
						</form>	
					</div> : ''
					}
					
					{this.renderDetails()}
					  
						<form className="new-task" onSubmit={this.handleSubmitDetail.bind(this)}>
						  <input 
							
							type="text"
							ref="newDetailInput"
							placeholder="add new detail"
						  />
						  <input
							type="hidden"
							ref="taskIDNewDetailInput"
							value={this.props.task._id}
							
						  />						  
						</form>
					  							  
					</div>                  
                </div>
                <div className="did-column col-4">
					<div className="card">

						<form className="new-task" onSubmit={this.handleSubmitDid.bind(this)}>
						  <input 
							
							type="text"
							ref="newDidInput"
							placeholder="register new interaction"
						  />
						  <input
							type="hidden"
							ref="taskIDNewDidInput"
							value={this.props.task._id}
							
						  />						  
						</form>		
					  
						{this.renderDids()}
						
					  
					</div>                  
                </div>
                <div className="do-column col-4">
					<div className="card">
						<button type="button" aria-label="Close" className="delete close align-self-end" onClick={this.deleteThisTask.bind(this)}>
						   <span aria-hidden="true">&times;</span>
						</button>						
					  
					{ !this.props.task.deadline || this.props.task.deadline.toUTCString() === 'Thu, 01 Jan 1970 00:00:00 GMT' ?	
						<form className="new-task date-form" onSubmit={this.handleSubmitDeadline.bind(this)}>
						  
						  <input
							type="datetime-local"
							ref="deadlineInput"
						  />
						  <input className="submit-deadline"  type="submit" value="submit deadline" />
						</form> : 
						this.state.showDeadlineInput ?
						<form className="new-task date-form" onSubmit={this.handleSubmitDeadline.bind(this)}>
						  
						  <input
							type="datetime-local"
							ref="deadlineInput"
							defaultValue={this.handleEditDeadline()}
							autoFocus
						  />
						  <input className="submit-deadline" type="submit" value="submit deadline" />
						</form> :
						<span onClick={() => this.setState({showDeadlineInput: true})}>{this.props.task.deadline.toDateString()} - {this.props.task.deadline.toLocaleTimeString().slice(0, -3)}</span>
					}

					
					
					{ !this.props.task.todo ?	
						<form className="new-task" onSubmit={this.handleSubmitTodo.bind(this)}>
						  <input
							type="text"
							ref="todoInput"
							placeholder="add To Do"
							
						  />
						</form> :
						this.state.showTodoInput ?
						<form className="new-task" onSubmit={this.handleSubmitTodo.bind(this)}>
						  <input
							type="text"
							ref="todoInput"
							placeholder="add To Do"
							defaultValue={this.handleEditTodo()}
							autoFocus
						  />
						</form> :
						<p onClick={() => this.setState({showTodoInput: true})}>{this.props.task.todo}</p>
					}
					
					</div>                     
                </div>
            </div>	
      

 
      </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
  
};


class Detail extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
	  showDetailInput: false,
    };
  }	
	
  deleteThisDetail() {
    Meteor.call('details.remove', this.props.detail._id);
  }		
	
	render () {
		
		return (
		<div>
			<p onClick={() => this.props.handleDetailClick(this.props.detail._id)}> {this.props.detail.text} 
				<button type="button" aria-label="Close" className="delete-detail close align-self-end" onClick={this.deleteThisDetail.bind(this)}>
					<span aria-hidden="true">&times;</span>
				</button>
			</p>
		</div>
		)
		
	}
	
}

class Did extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
	  showDidInput: false,
    };
  }	
	
  deleteThisDid() {
    Meteor.call('dids.remove', this.props.did._id);
  }		
	
	render () {
		
		return (
		<div>
			<p onClick={() => this.props.handleDidClick(this.props.did._id)}>
				<span>{this.props.did.createdAt.toDateString()}: </span><br></br>
				{this.props.did.text} 
				<button type="button" aria-label="Close" className="delete-detail close align-self-end" onClick={this.deleteThisDid.bind(this)}>
					<span aria-hidden="true">&times;</span>
				</button>
			</p>
		</div>
		)
		
	}
	
}


export default createContainer(() => {
  Meteor.subscribe('details');
  Meteor.subscribe('dids');
  
  return {
    details: Details.find({}, { sort: { createdAt: 1 } }).fetch(),
	dids: Dids.find({}, { sort: { createdAt: -1 } }).fetch(),
   // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),	
  };
}, Task);
