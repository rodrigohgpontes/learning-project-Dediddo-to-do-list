import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');
export const Details = new Mongo.Collection('details');
export const Dids = new Mongo.Collection('dids');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });

  Meteor.publish('details', function detailsPublication() {
    return Details.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });  
  
  Meteor.publish('dids', function didsPublication() {
    return Dids.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });

	Meteor.startup(function() {
		process.env.MAIL_URL="smtp://admin%40dediddo.com:*n!Pq7M8@smtp.zoho.com:465";
	});
	
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
	  todo: null,
	  deadline: null,
	  tags:[],
	  priority: "high",
	  size: "small",
	  checked: false,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
	
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  'tasks.setText'(taskId, setText) {
    check(taskId, String);
    check(setText, String);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { text: setText } });
  }, 
  'tasks.setTag'(setTag, taskId ) {
    check(taskId, String);
    check(setTag, String);
	
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $push: { tags: setTag } });
  },   
  'tasks.removeTag'(taskId, tagText) {
    check(taskId, String);
	check(tagText, String);
	
	Tasks.update(taskId, { $pull: { tags: tagText } });

  },  
    'tasks.setDeadline'(taskId, setDeadline) {
    check(taskId, String);
    check(setDeadline, Date);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { deadline: setDeadline } });
  }, 
  'tasks.setTodo'(taskId, setTodo) {
    check(taskId, String);
    check(setTodo, String);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { todo: setTodo } });
  }, 
    'tasks.setPriority'(taskId, setPriority) {
    check(taskId, String);
    check(setPriority, String);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { priority: setPriority } });
  }, 
      'tasks.setSize'(taskId, setSize) {
    check(taskId, String);
    check(setSize, String);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Tasks.update(taskId, { $set: { size: setSize } });
  }, 
        'tasks.addCheckedField'(taskId) {
    check(taskId, String);
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
	 Tasks.update(taskId, { $set: { checked: true } });
  },
    'tasks.toggleChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);	
	
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
	Tasks.update(taskId, { $set: { checked: setChecked } });
  },

'details.insert'(text, taskID) {
    check(text, String);
	check(taskID, String);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Details.insert({
      text,
	  taskID: taskID,
	  checked: false,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'details.remove'(detailId) {
    check(detailId, String);
    const detail = Details.findOne(detailId);
    if (detail.private && detail.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
	
    Details.remove(detailId);
  },
  'details.setText'(detailId, setText) {
    check(detailId, String);
    check(setText, String);
	
    const detail = Details.findOne(detailId);
    if (detail.private && detail.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Details.update(detailId, { $set: { text: setText } });
  },
      'details.addCheckedField'(detailId) {
    check(detailId, String);
	
    const detail = Details.findOne(detailId);
    if (detail.private && detail.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Details.update(detailId, { $set: { checked: true } });
  },
    'details.toggleChecked'(detailId, setChecked) {
    check(detailId, String);
    check(setChecked, Boolean);	
	
    const detail = Details.findOne(detailId);
    if (detail.private && detail.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Details.update(detailId, { $set: { checked: setChecked } });
  },
  
'dids.insert'(text, taskID) {
    check(text, String);
	check(taskID, String);
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Dids.insert({
      text,
	  taskID: taskID,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'dids.remove'(didId) {
    check(didId, String);
    const did = Dids.findOne(didId);
    if (did.private && did.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
	
    Dids.remove(didId);
  },
  'dids.setText'(didId, setText) {
    check(didId, String);
    check(setText, String);
	
    const did = Dids.findOne(didId);
    if (did.private && did.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }	
 
    Dids.update(didId, { $set: { text: setText } });
  },  


  
});