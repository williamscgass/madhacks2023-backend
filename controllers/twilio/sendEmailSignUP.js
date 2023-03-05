const apiKey = process.env.SENDGRID_API_KEY;

module.exports = async function(req, email) {

	const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(apiKey);
		const msg = {
		  to: email, // Change to user.username when implemented
		  from: 'dittmargreav@wisc.edu', // Change to your verified sender
		  subject: 'Altruist sign up',
		   text: 'You have successfully signed up for Altruist',
		  html: '<strong>You have successfully signed up for Altruist</strong>',
		}
		
		sgMail.send(msg).then(() => {
			console.log('Sent Email');
			
		}
	  )
  };