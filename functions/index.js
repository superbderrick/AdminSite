const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Derrick!");
 console.log("Fist cloud function test")
});

exports.sanitizePost = functions.database.ref('/message').onWrite(event => {
	const post = event.data.val()
	if( post.sanitized ){
		return
	}
	console.log("Sanitizeing new post "+event.params.pushId)
	console.log(post)
	post.sanitized = true
	post.title = "hello"
	post.body = "derrick"
	return event.data.ref.set(post)
})

exports.emailEmployeeReport = functions.database.ref("/employee/{$eid}/reports/{$rid}")
.onWrite(event => {
  const eid = event.params.eid;
  
  const report = event.data.val().report;
  const root = event.data.ref.root;
  
  const mgr_promise = root.child(`/employees/{$eid}/manager`).once("value");
  
  const then_promise = mgr_promisc.then(snap => {
    const mgr_id = snap.val();
    return root.child(`/employee/{$mrg_id}/email`).once("value");
  }).then(snap => {
    const email = snap.val();
    sendReportEmail(email, report)
  }).catch(reason => {
    // Handle the error
    console.log(reason);
  });
  
  return then_promise2;
  
});

