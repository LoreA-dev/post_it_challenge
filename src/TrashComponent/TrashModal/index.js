import React from "react";
import './style.css';

function TrashModal(props){
    if(!props.show){
        return null
    }

    return (
        <div onDoubleClick ={(evt)=>{evt.stopPropagation();}} className='trashModal'>
            <button onClick={props.onClose} id="closeModal" ><i className="fas fa-times"></i></button>
            <div className='modalContent'>
                <p>Hellooo</p> 
            </div>
        </div>

    )
}

export {TrashModal};