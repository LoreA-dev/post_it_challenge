import React from "react";
import { DataNote } from "../../DataNote";

function TrashModal(props) {
  const {
    show, onClose, deletedArray, onPermanentlyDeletePostIt, emptyArray, restorePostIt,
  } = props;

  if (!show) {
    return null;
  }

  return (
    <div
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
      className="trashModal z-10 inline-block m-auto p-2.5 border-slate-300 w-3/5 h-3/5 bg-slate-100 overflow-y-auto items-center justify-center"
    >
      <div className="flex justify-center">
        <div className="buttonsContainer flex  fixed justify-between mx-6 w-3/6 h-12">
          <button id="emptyButton" className=" border-none bg-none" onClick={emptyArray}>
            <i className="fas fa-eraser text-red-600 text-5xl" />
          </button>
          <button onClick={onClose} id="closeModal" className="text-red-600 text-5xl float-right">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="modalContent flex flex-wrap justify-center mt-12">
          {deletedArray.map((postIts) => (
            <DataNote
              restorePostIt={restorePostIt}
              draggable={false}
              key={`${postIts.id}posit`}
              text={postIts.text}
              id={postIts.id}
              onDelete={onPermanentlyDeletePostIt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { TrashModal };
