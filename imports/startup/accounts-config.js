import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});

//console.log("temp",Accounts.forgotPassword);
//console.log("from",Accounts.emailTemplates);

//Accounts.emailTemplates.from = "Dediddo <admin@dediddo.com>";