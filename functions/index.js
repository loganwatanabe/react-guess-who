// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.newBoardForAccount = functions.firestore.document('/boards/{documentId}')
      .onCreate((snap, context) => {
            // Grab the current value of what was written to Cloud Firestore.
            const creator = snap.data().creator;
            const documentId = context.params.documentId

            // get the account doc
            admin.firestore().collection('accounts').doc(creator).get().then(doc => {
            	let boards = [documentId]

                  //add the new board to the board_ids in the account doc
      	      if(doc.data().board_ids){
      	      	boards = boards.concat(doc.data().board_ids)
      	      }
                  return doc.ref.set({board_ids: boards}, {merge: true})
      }).catch(err => {
                  functions.logger.info("Error in creating board, either limit reached or not authorized")
            	return err
      })
});

exports.deleteBoardFromAccount = functions.firestore.document('/boards/{documentId}')
      .onDelete((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const creator = snap.data().creator;
      const documentId = context.params.documentId

      // get the account doc
      admin.firestore().collection('accounts').doc(creator).get().then(doc => {
            
            let newBoards = doc.data().board_ids.filter(id => id !== documentId)

            return doc.ref.set({board_ids: newBoards}, {merge: true})
      }).catch(err => {
            functions.logger.info("Error in deleting board, not authorized")
            return err
      })


})