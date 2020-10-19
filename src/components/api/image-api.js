import axios from 'axios';

const api = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI"
const apiKey = "8d6b0c37c1msh8fc78233e4d89d0p19557fjsnff30f431a25b"


export function searchImages(keywords, callback){

	axios.get(api, { 
		params: {
			"safeSearch": "true",
			"pageNumber": "1",
			"pageSize": "10",
			"q": keywords,
			"autoCorrect": "false"
		},
		headers: {
			"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
			"x-rapidapi-key": apiKey,
			"useQueryString": true
		}
	}).then(res => {
        callback(res.data)
    }).catch(error =>{
      	console.log(error)
      	callback(error)
    })
}


