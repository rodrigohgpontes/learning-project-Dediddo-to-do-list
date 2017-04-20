import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


 
export default class Guide extends Component {
	
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

		<div className="guide">
			<main className="container-fluid">
				
				 <section className="guide-intro">
				   <h1 className="text-center logo"><span className="de">De</span><span className="did">did</span><span className="do">do</span><span className="de">'s </span><span className="did">Gui</span><span className="do">de</span></h1>
				   <h4 className="text-center">Welcome to the to-do list that needs a guide</h4>
				   <div className="row justify-content-center align-items-center">
					 <div className="col-sm-3">
					   <img src="/dediddo-logo.png"/>
					 </div>             
					 <div className="col-sm-9">
					   <p>
						<span className="logo-text">Dediddo</span> is a quite opinionated to-do list, so this guide aims to present you all its design choices and help you take the most out of it (or decide it is not for you after all and move on to the next to-do list software).
					   </p>
					   <h6>What this guide will answer:</h6>
						<p><strong>What is a Topic and what is inside it?</strong><br></br><span>topic, to do, tags, size, priority, and deadline</span></p>
						<p><strong>How the Topics are sized and ordered?</strong><br></br><span>height, width, color, and position</span></p>
						<p><strong>How to better view and filter the to-dos?</strong><br></br><span>filter by tag, filter by (no)deadline, clean view of to-dos</span></p>
					 </div>
				  </div>
				</section>
				
				 <section className="guide-section">
				   <h5 className="text-center">What is a Topic and what is inside it?</h5>
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
				  </div>
				</section>		

				 <section className="guide-section">
				   <h5 className="text-center">How the Topics are sized and ordered?</h5>
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
				  </div>
				</section>			

				 <section className="guide-section">
				   <h5 className="text-center">How to better view and filter the to-dos?</h5>
				   <div className="row justify-content-center align-items-center">           
					 <div className="col-sm-7">
						<p><strong>Filter Topics with no deadline by clicking to <em>hide Topics without a deadline</em>.</strong><br></br>
						It will hide every Topic with an empty deadline.<br></br>
						A deadline is empty when the Topic is created or when you edit the deadline and clean the input field.<br></br>
						You can use this filter for Topics that do not have a immediate To Do, but that you don't want to delete.
						</p>
						<p><strong>Filter Topics by tags by clicking on the Tags that you want to list.</strong><br></br>
						It will only show Topics that are tagged with the selected tags.<br></br>
						You create a Tag directly at the Topics. Any tag created at any Topic will automatically be listed on the top tag menu.<br></br>
						You can select multiple tags and it will show all Topics that have any one of the selected tags. Remember that a Topic with no tags will not be listed whenever any one tag is selected.
						</p>						
						<p><strong>For a very clean view of you have on your To Do list click to <em>only show To Do text</em> .</strong><br></br>
						It will hide every information on every topic, except the To Do.<br></br>
						The Topic color, width, and height will stay the same, as well as any filter by tag or deadline that is set.<br></br>
						You won't be able to edit any info (except the To Do) when this view is set. Click again the checkbox to edit other fields.
						</p>

					</div>
					 <div className="col-sm-5">
					   <img src="/guide-clean-view.png"/>
					 </div>  					 
				  </div>
				</section>								

			</main>			
							
			</div>

		)
	}
}
