import React from "react";
import { TrashModal } from "./TrashModal";
import "./style.css";

function TrashComponent({ onDelete, deletedArray, onPermanentlyDeletePostIt, emptyArray }) {
  const [show, setShow] = React.useState(false);

  return (
    <div id="trashComponentContainer">
        <h1>{deletedArray.length}</h1>
      <button
        onDrop={onDelete}
        onDoubleClick={(evt) => {
          evt.stopPropagation();
        }}
        onClick={() => {
          setShow(true);
        }}
        onDragOver={(evt) => evt.preventDefault()}
        id="buttonTrashComponent"
      >
        <i className="far fa-trash-alt"></i>
      </button>
      <TrashModal
        emptyArray ={emptyArray}
        onPermanentlyDeletePostIt={onPermanentlyDeletePostIt}
        deletedArray={deletedArray}
        onClose={() => setShow(false)}
        show={show}
      ></TrashModal>
    </div>
  );
}

export { TrashComponent };
