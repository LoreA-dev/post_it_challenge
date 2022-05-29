import React from "react";
import { DataNote } from "../../DataNote";
import "./style.css";

function TrashModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
      className="trashModal"
    >
      <button id="emptyButton" onClick={props.emptyArray}>
        Empty
      </button>
      <button onClick={props.onClose} id="closeModal">
        <i className="fas fa-times"></i>
      </button>
      <div className="modalContent">
        {props.deletedArray.map((postIts) => (
          <DataNote
            restorePostIt={props.restorePostIt}
            draggable={false}
            key={postIts.id + "posit"}
            text={postIts.text}
            id={postIts.id}
            onDelete={props.onPermanentlyDeletePostIt}
          />
        ))}
      </div>
    </div>
  );
}

export { TrashModal };
