import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useFirestore } from "../Firebase/Firebase";
import firebase from "firebase";
import { useNotes } from "../../Context/NotesProvider";
import "../../App.css";
import "./Sidebar.css";
import { useAuthProvider } from "../../Context/AuthProvider";



function Sidebar({ classes }) {
  const { notes, setSelectNote, addingNote, setAddingNote } = useNotes();
  const { user } = useAuthProvider();
  const [newTitle, setNewTitle] = useState("");
  const [newnote, setNewnote] = useState(false);

  useEffect(() => {
    if (newnote) {
      setSelectNote(notes[0]);
    }
  }, [newTitle]);

  function newNoteClick() {
    setAddingNote(!addingNote);
    setNewTitle("");
  }
 

  async function newNoteSubmit() {
    if(newTitle){
      useFirestore.collection("notes").add({
        userId: user.uid,
        title: newTitle,
        body: "",
        tag: "common",
        pinned: false,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setAddingNote(false);
      setNewnote(true);
      setNewTitle("");
    }
  }
  
  return (
    <div className={classes.sidebarContainer}>
      <div className="sidebar">
        <div className={classes.sidebarHeading}>
          <div>
            <h3>Notes</h3>
          </div>
          {/* <div className={classes.filter}><BiFilterAlt/></div> */}
        </div>
        <Button className={classes.newNoteBtn} onClick={() => newNoteClick()}>
          {addingNote ? "CANCEL" : "NEW NOTE"}
        </Button>
        {addingNote ? (
          <div>
            <input
              className={classes.newNoteInput}
              autoFocus={true}
              placeholder="Enter a new title"
              onKeyUp={(e) => setNewTitle(e.target.value)}
            ></input>
            <Button
              className={classes.newNoteSubmitBtn}
              onClick={() => newNoteSubmit()}
              disabled={!newTitle}
            >
              SUBMIT
            </Button>
          </div>
        ) : null}
        <div>
          <div className={classes.sidebarContent}>
            <div>Title </div>
            <div className="sidebar-tag">Tags</div>
          </div>
          <List>
            <div className="sidebar-notes">
              {notes &&
                notes.map((note, index) => {
                  return (
                    <div key={index}>
                      <SidebarItem note={note}></SidebarItem>
                      <Divider></Divider>
                    </div>
                  );
                })}
            </div>
          </List>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Sidebar);
