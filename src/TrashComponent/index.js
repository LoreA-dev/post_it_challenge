import React from "react";
import { TrashModal } from "./TrashModal";

function TrashComponent({ onDelete, deletedArray, onPermanentlyDeletePostIt,restorePostIt , emptyArray }) {
  const [show, setShow] = React.useState(false);

  return (
    <div id="trashComponentContainer" className=" flex justify-end items-end h-screen">
      <div onDoubleClick={(evt) => {
          evt.stopPropagation();
        }} className="absolute">
        <span className="absolute w-10 bg-red-500 font-bold text-white rounded-full p-1 text-2xl text-center select-none">{deletedArray.length}</span>
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
          className="bg-none border-none m-10 hover:scale-125 transition motion-reduce:hover:scale-0 "
        >
          <i className="far fa-trash-alt text-8xl text-red-500"></i>
        </button>
      </div>
      <TrashModal
        restorePostIt={restorePostIt}
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
