import React from "react";
import './style.css';

function TrashComponent(){
    return(
        <div id="trashComponentContainer">
            <button id="buttonTrashComponent" onClick={()=> console.log("hello")}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    )
}

export {TrashComponent};