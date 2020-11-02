import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Grid} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'
import {useHistory} from 'react-router-dom';


function LinkedAccounts(props){

	const history = useHistory()

	// Note: the empty deps array [] means
	// this useEffect will run oncea
	// similar to componentDidMount()
	let defaultProviders = [
		{
			providerId: "google.com",
			status: false,
			id: 1
		},
		{
			providerId: "facebook.com",
			status: false,
			id: 2
		}
	]
	const [providers, setProviders] = useState(defaultProviders)

  const columns = [
    {
      field: 'providerId',
      headerName: 'Provider',
      sortable: false,
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      width: 160,
      valueFormatter: (params: ValueFormatterParams) => {return(params.value ? "linked" : "not linked")}
    },
    {
      field: 'link',
      headerName: 'Link',
      sortable: false,
      width: 160,
      renderCell: (params) => { return(params.getValue('status') ? "unlink" : "link")},
  	}
  ]

  useEffect(() => {
    console.log(props.user)
    if(props.user){
    	let id = 0
    	const providerD = props.user.providerData
    	let proviz = providers.map((p)=>{
    		let providerDetails = providerD.find(data=> data.providerId == p.providerId)
    		if(providerDetails){
    			let linkedProvider = {...providerDetails,...p}
    			linkedProvider.status = true
    			return(linkedProvider)
    		}else{
    			return({...p})
    		}
    	})
    	setProviders(proviz)
    }
  }, [props.user])

  const linkToggle = (status)=>{
  	if(status){
  		return("unlink")
  	}else{
  		return("link")
  	}

  }



  return (
  	<div style={{ height: '250px', width: '60%', margin: '0 auto' }}>
  	{providers.length > 0 ?
    <DataGrid rows={providers} columns={columns} pageSize={3} autoPageSize hideFooter autoHeight/>
    : <br/>
	}
	</div>
  );
}

export default LinkedAccounts;