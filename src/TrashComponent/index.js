import React from "react";
import {TrashModal} from "./TrashModal"
import './style.css';


function TrashComponent({onDelete}){
    const [show, setShow] = React.useState(false) 
    
    return(
        <div id="trashComponentContainer" >
            <button onDoubleClick ={(evt)=>{evt.stopPropagation();}} onClick={() => setShow(true)}  onDrop={onDelete} onDragOver={(evt)=> evt.preventDefault()}  id="buttonTrashComponent">
                <i className="far fa-trash-alt"></i>
                <div><p></p></div>
            </button>
            <TrashModal onClose={() => setShow(false)} show={show} ></TrashModal>
        </div>
    )
}

export {TrashComponent};