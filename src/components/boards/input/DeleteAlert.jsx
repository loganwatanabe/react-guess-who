import React, {useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import {deleteABoard} from '../../api/api-server'

function DeleteAlert(props){


  const confirmDelete = () => {

    if(props.boardId){
      // let confirmation = confirm("Proceed with delete?")

        deleteABoard(props.boardId, (res)=>{
          console.log("successful delete")
          props.onClose()
          props.onSuccess()
        })
      //if false, do nothing
    }else{
      console.log("ERROR")
      alert("ERROR")
    }
  }


  return (
    <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete '"+ props.boardName +"' Board?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this board?  Once deleted, all data associated with this board will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent: 'space-evenly'}}>
          <Button onClick={props.onClose} color="default" variant="contained">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DeleteAlert;