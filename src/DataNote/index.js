import React from "react";
import './style.css';

function DataNote({id, text, positionX, positionY}){
    
    const [editable, setEditable] = React.useState(true)
    
    if (id === id){
        id++
    }
    return(
        <div draggable="true" className="newPostIt" id={"note_" + id} onClick={(evt)=>{evt.stopPropagation();}} style={{top: positionY, left: positionX}}>
          { !editable ? <p className="pText" >{text}</p>: <textarea maxLength="70" autoCapitalize="sentences" className="textBox" onKeyDown={(e)=>{
              if(e.code === 'Enter'){
                  setEditable(!editable)
              }
          }} defaultValue={text}></textarea>}
        </div>
    )
}

export {DataNote};