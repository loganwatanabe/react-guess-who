import axios from 'axios';

const api = "https://guesswhomapi-fpkg2nxrsa-uc.a.run.app"


export function homepageBoards(callback){
	axios.get(api+"/query?bydate=asc")
      .then(res => {
        callback(res.data)
      }).catch(error =>{
      	console.log(error)
      })
}

export function getBoard(id, callback){
	axios.get(api+"/boards/"+id)
      .then(res => {
        callback(res.data)
      }).catch(error =>{
      	console.log(error)
      })
}

export function updateBoard(id, data, jwt, callback){
	axios.put(api+"/boards/"+id, data, {
		headers: {
			"Authorization": 'Bearer '+jwt,
			"Content-Type": 'application/json'
		}
	})
      .then(res => {
        callback(res.data)
      }).catch(error =>{
      	console.log(error)
      })
}

export function createBoard(data, jwt, callback){
	axios.post(api+"/boards", data, {
		headers: {
			"Authorization": 'Bearer '+jwt,
			"Content-Type": 'application/json'
		}
	}).then(res => {
		callback(res.data)
	}).catch(error =>{
		console.log(error)
	})
}

export function deleteBoard(id, jwt, callback){
	axios.delete(api+"/boards/"+id, {
		headers: {
			"Authorization": 'Bearer '+jwt,
			"Content-Type": 'application/json'
		}
	}).then(res => {
		callback(res.data)
	}).catch(error =>{
		console.log(error)
	})
}
