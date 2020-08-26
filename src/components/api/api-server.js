
import firebase from '../../firebase/index'

const db = firebase.db



// app.get('/boards/:boardId', async(req, res)=>{

export function getABoard(id, callback){
	let boardsRef = db.collection('boards');
	let query = boardsRef.where("__name__", "==", id);
	// query = query.orderBy("created", "asc").select("name", "created", "active").limit(25)

	query.get().then(results => {
		let returnVal = results.docs.map(doc =>{
			return {document_id: doc.id, ...doc.data()}
		})
		return callback(returnVal);
	})
	
}

// app.get('/all', async(req, res)=>{

export function homeBoards(callback){
	let boardsRef = db.collection('boards');
	let query = boardsRef
	query = query.orderBy("created", "desc")
	query = query.limit(25)

	query.get().then(results => {
		let returnVal = results.docs.map(doc =>{
			return {document_id: doc.id, ...doc.data()}
		})
		return callback(returnVal);
	})
	
}

// app.get('/myBoards', async(req, res)=>{
// 	let userId = await getUserId(req.headers['authorization'])
// 	if(userId){
// 		const creator = req.query.creator;

// 		let boardsRef = db.collection('boards');
// 		let query = boardsRef


// 		query = query.where("creator", "==", userId);
// 		query=query.select("name", "created", "active")

// 		let results = await query.get();
// 		let returnVal = results.docs.map(doc =>{
// 			return {document_id: doc.id, ...doc.data()}
// 		})

// 		res.json(returnVal);
// 	}else{
// 		res.status(401).send()
// 	}

// });


// //create boards
// app.post('/boards', async (req, res) => {
// 	let userId = await getUserId(req.headers['authorization'])
// 	if(userId){
// 	    const data = {
// 	        name: req.body.name || "New Board",
// 	        cards: req.body.cards || [],
// 	        active: req.body.active || true,
// 	        created: admin.firestore.Timestamp.now(),
// 	        creator: userId
// 	    }

// 	    await db.collection('boards').add(data).then(function(docRef) {
// 	    	res.json({ status: 'success', data: { document_id: docRef.id, ...data } });
// 		})
// 		.catch(function(error) {
// 			res.status(500).send(error);
// 		});
// 	}else{
// 		res.status(401).send()
// 	}
// })

// //update boards
// //https://cloud.google.com/firestore/docs/manage-data/add-data
// app.put('/boards/:boardId', async(req, res)=>{
// 	let userId = await getUserId(req.headers['authorization'])
// 	// if(hasAdminAccess(userId)){
// 		try {
// 		    const id = req.params.boardId;
// 		    if (!id) throw new Error('id is blank');

// 		    const data = {}
// 		    //probably should put some more validations in here
// 		    if(req.body.name){ data.name = req.body.name}
// 		    if(req.body.active){ data.active = req.body.active}
// 		    if(req.body.cards){ data.cards = req.body.cards}

// 		    const boardsRef = await db.collection('boards').doc(id).update(data).then(function(docRef) {
// 			    console.log(docRef)
// 			    res.json({
// 			    	status: 'sucess',
// 			        document_id: id
// 			    })
// 			})
// 			.catch(function(error) {
// 			    res.status(500).send(error);
// 			});


// 		} catch(error){
// 			res.status(500).send(error);
// 		}
// 	// }else{
// 	// 	res.status(401).send()
// 	// }
// });


// //delete boards
// app.delete('/boards/:boardId', async (req, res) => {
// 	let userId = await getUserId(req.headers['authorization'])
// 	if(userId && hasAdminAccess(userId)){
// 	  try {

// 	    const id = req.params.boardId;

// 	    if (!id) throw new Error('id is blank');

// 	    await db.collection('boards').doc(id).delete();

// 	    res.json({
// 	    	status: 'success',
// 	        document_id: id,
// 	    })


// 	  } catch(error){

// 	    res.status(500).send(error);

// 	  }
// 	}else{
// 		res.status(403).send()
// 	}

// });




// async function getUserId(authorizationHeader) {
//   try {
//     const userJwtToken = authorizationHeader.replace('Bearer ', '');
//     const ticket = await client.verifyIdToken({
//       idToken: userJwtToken,
//       audience: CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const userId = payload['sub'] || payload['hd'];
//     return userId;
//   }
//   catch (ex) {
//     console.error(ex);
//     return '';
//   }
// }

// function hasAdminAccess(userId) {
//   const userIds = ['106645276822529263714'];
//   return userIds.includes(userId);
// }