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
      className="trashModal md:w-3/5 md:h-3/5 md:p-6 lg:w-4/6 lg:h-4/5 lg:p-8 z-10 inline-block m-auto p-1 border-slate-300 rounded-md w-4/5 h-4/5 bg-slate-100 overflow-y-auto items-center justify-center"
    >
      <div className="flex justify-center w-full">
        <div className="buttonsContainer fixed justify-between mx-6 w-2/4 h-12 p-1 ">
          <button id="emptyButton" className=" border-none bg-none" onClick={emptyArray}>
            <i className="fas fa-eraser text-red-600 text-5xl" />
          </button>
          <button onClick={onClose} id="closeModal" className="text-red-600 text-5xl float-right">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="modalContent flex flex-wrap justify-center mt-12 p-1 touch-pan-y">
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
