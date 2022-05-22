import React from "react";
import './style.css';

function DataNote({id, text, positionX, positionY,updatePosition, onDelete}){

    const [editable, setEditable] = React.useState(true)
    const [saveInformation, setSaveInformation] = React.useState("");
    
    return(
        <div draggable="true" onDragEnd={(evt) => updatePosition(id,evt)} className="newPostIt" id={"note_" + id} onDoubleClick ={(evt)=>{evt.stopPropagation();}} style={{top: positionY, left: positionX}}>
          <button id="deletePostItButton" onClick={onDelete} ><i className="fas fa-times"></i></button>
          { !editable ? <p className="pText" >{text}</p>: <textarea onChange={(evt)=> setSaveInformation(evt.target.defaultValue)} maxLength="70" autoCapitalize="sentences" className="textBox" onKeyDown={(e)=>{
              if(e.code === 'Enter'){
                  setEditable(!editable)
              }
          }} defaultValue={text}></textarea>}
        </div>
    )
}

export {DataNote};