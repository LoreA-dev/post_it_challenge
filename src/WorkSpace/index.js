import React from "react";
import { DataNote } from "../DataNote";
import './style.css';
import {TrashComponent} from "../TrashComponent";

function WorkSpace(){
    
    const localStoragePostIt = localStorage.getItem('POSTITS_V1');

  let parsedPostIt;
  if (!localStoragePostIt){
    localStorage.setItem('POSTITS_V1', JSON.stringify([]));
    parsedPostIt = []
  }else{
    parsedPostIt = JSON.parse(localStoragePostIt)
  }
  const [postIt, setPostIt] = React.useState(parsedPostIt);

  const savePostIt = (newPostIts) => {
    const stringifiedPostIt = JSON.stringify(newPostIts);
    localStorage.setItem('POSTITS_V1', stringifiedPostIt);
    setPostIt(newPostIts);
  }
  
  const createPostIt = (evt)=>{
    console.log(evt)
    const newArray = [...parsedPostIt]
    newArray.push({
      id: (newArray.length + 1) + Date.now(),
      text: "my text ",
      x: evt.clientX ,
      y: evt.clientY
    })
    savePostIt(newArray)
  }

  const deletePostIt = (id) => {
    const postItToDelete = postIt.filter(postIts => postIts.id !== id);
    savePostIt(postItToDelete)
  }


  // Drag & Drop
    function handleDrag (id ,evt){
    const takingPostIt = postIt.map(e =>{
      if (e.id === id){
        return {
          ...e,
          x: evt.clientX,
          y: evt.clientY 
        }
    }else{return e}
  })
    savePostIt(takingPostIt);
    console.log(parsedPostIt);
    console.log(takingPostIt);
    console.log(evt.clientX ,evt.clientY)
    }

    return(
        <div onDoubleClick ={createPostIt} id='workSpace'>
            {postIt.map((e)=>( 
            <DataNote onDelete={() => deletePostIt(e.id)} id={e.id} updatePosition={handleDrag} key={e.id +"posit"} text={e.text} positionX={e.x} positionY={e.y}/>
            ))}
            <TrashComponent />
        </div>
    )
}

export {WorkSpace};