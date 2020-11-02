
import firebase from '../../firebase/index'

const db = firebase.db
const boardsRef = db.collection('boards')



// app.get('/boards/:boardId', async(req, res)=>{

export function getABoard(id, callback){
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


//create boards
export async function createABoard(boardData, callback){
	let user = firebase.getCurrentUser()
	if(user){
	    const data = {
	        name: boardData.name || "New Board",
	        cards: boardData.cards || [],
	        active: boardData.active || true,
	        created: firebase.firebase.firestore.Timestamp.now(),
	        creator: user.uid
	    }
		
		let newBoard = await boardsRef.add(data)
		console.log(newBoard)
		console.log(newBoard.id)
		callback(newBoard)
	}else{
		console.log("error in creating")
		callback(Error('Create FAILED'))
	}
}

//

//get a user's boards
export async function getUsersBoards(user, callback){
	console.log("get users boards")
	// let user = await firebase.getCurrentUser()
	console.log(user)

	if(user){
		console.log("user exists")
		console.log(user)
	    const uid = user.uid
		
		let usersBoards = await boardsRef.where("creator", "==", uid).get()
		// usersBoards.forEach(x => console.log(x.data()))
		let rez = []
		usersBoards.forEach(x => { rez.push({document_id: x.id, ...x.data()}) })
		callback(rez)
	}else{
		console.log("error in getUserBoards")
		callback([])
	}
}


export async function getExampleBoards(callback){	
	let exampleBoards = await boardsRef.where("creator", "==", "where").get()
	let rez = []
	exampleBoards.forEach(x => { rez.push(x.data()) })
	callback(rez)
}


//update boards
export async function updateABoard(id, boardData, callback){
    if (!id) throw new Error('id is blank');

    const data = {}
    if(boardData.name){ data.name = boardData.name}
    if(boardData.active){ data.active = boardData.active}
    if(boardData.cards){ data.cards = boardData.cards}

    const updatedBoard = await db.collection('boards').doc(id).update(data)
    callback(updatedBoard)
}


export async function deleteABoard(id, callback){

    if (!id) throw new Error('id is blank');

    const res = await db.collection('boards').doc(id).delete();
    callback(res)
}

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