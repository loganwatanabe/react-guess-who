import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {List, ListItem, ListItemText, Button, Grid} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'
import {homeBoards, getUsersBoards} from '../api/api-server'
import DeleteAlert from '../boards/input/DeleteAlert'
import {useHistory} from 'react-router-dom';


function MyBoards(props){

  const history = useHistory()

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteAlert, setDeleteAlert] = useState(false)
  const [deleteBoard, setDeleteBoard] = useState({id: null, name: null})

	// Note: the empty deps array [] means
	// this useEffect will run oncea
	// similar to componentDidMount()

  const columns = [
    {
      field: 'name',
      headerName: 'Board Name',
      sortable: false,
      width: 160,
      renderCell: (params) => {
      return(
        <Link to={'/boards/'+params.getValue('document_id')}>
          {params.getValue('name')}
        </Link>
      )
      }
    },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      width: 160,
      renderCell: (params) => {
      return(
        <Link to={'/boards/'+params.getValue('document_id')+'/edit'}>
          Edit
        </Link>
      )
      }
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return(
          <Button onClick={(e) =>{openDeleteAlert(params)} } variant="contained" color="secondary">Delete</Button>
        )
      }
    }
  ]

  const getBoards = () => {
    getUsersBoards(props.user, data => {
      let ind = 0
      let bs = data.map( (x) => {
        ind++
        return {...x, id: ind, doc: x.document_id}
      })
      setBoards(bs)
      setLoading(false)
    })
  }


  useEffect(() => {
    getBoards()
  }, [props.user])

  const createBoardButton = () => {
    if(boards.length < 3){
      return(
        <Link to={'/boards/new'}>
          <Button>Create New Board</Button>
        </Link>
      )
    }else{
      return("You cannot create more than 3 boards.  Please delete a board to create a new one.")
    }
  }


  const openDeleteAlert = (board) => {
    let boardObj = {
      id: board.data.document_id,
      name: board.data.name
    }
    setDeleteBoard(boardObj)
    setDeleteAlert(true);
  }

  const closeDeleteAlert = () => {
    setDeleteAlert(false);
    setDeleteBoard({id: null, name: null})
  }

  const onSuccessfulDelete = () => {
    console.log("deleted")
    getBoards()
  }

  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        Your Boards
        <div style={{ height: '250px', width: '60%', margin: '0 auto' }}>
          <DataGrid rows={boards} columns={columns} pageSize={3} autoPageSize loading={loading} hideFooter autoHeight />
        </div>
        {createBoardButton()}
      </Grid>
      <DeleteAlert open={deleteAlert} onClose={closeDeleteAlert}  boardId={deleteBoard.id} boardName={deleteBoard.name} onSuccess={onSuccessfulDelete}/>
    </Grid>
  );
}

export default MyBoards;