import React from "react";
import { DataNote } from "../DataNote";
import './style.css';

function AddPostIt({postIt, actionCreate}){

    return(
        <div onClick={actionCreate} id='workSpace'>
            {postIt.map((e)=>( 
            <DataNote id={e.id} key={e.id} text={e.text} positionX={e.x} positionY={e.y}/>)
            )}
        </div>
    )
}

export {AddPostIt};