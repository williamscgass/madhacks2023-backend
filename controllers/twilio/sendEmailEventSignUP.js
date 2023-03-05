const apiKey = process.env.SENDGRID_API_KEY;

module.exports = async function(req, event, user) {
	console.log('EEEEEEEEEEEEE');

	const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(apiKey);
		const msg = {
		  to: event.org.username, // Change to user.username when implemented
		  from: 'dittmargreav@wisc.edu', // Change to your verified sender
		  subject: 'You have a new volunteer!',
		   text: 'A new volunteer has sign upped for your event, ' + event.name +
                 "\n Your volunteer email: " + user.username +
                 "\n Your volunteer name: " + user.name,
		  html: '<strong>You have successfully signed up for Altruist</strong>',
		}
		
		sgMail.send(msg).then(() => {
			console.log('Sent Email');
			
		}
	  )
  };