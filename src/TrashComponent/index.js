import React from "react";
import { TrashModal } from "./TrashModal";

function TrashComponent({
  show, setShow, deletedArray, onPermanentlyDeletePostIt, restorePostIt, emptyArray,
}) {
  return (
    <div
      id="trashComponentContainer"
      className="flex justify-center h-full"
      onClick={() => setShow(false)}
      onClose={() => setShow(false)}
    >
      <TrashModal
        restorePostIt={restorePostIt}
        emptyArray={emptyArray}
        onPermanentlyDeletePostIt={onPermanentlyDeletePostIt}
        deletedArray={deletedArray}
        onClose={() => setShow(false)}
        show={show}
      />
    </div>
  );
}

export { TrashComponent };
