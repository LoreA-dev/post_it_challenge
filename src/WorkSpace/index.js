import React from "react";
import { DataNote } from "../DataNote";
import { TrashComponent } from "../TrashComponent";

function WorkSpace() {
  const localStoragePostIt = localStorage.getItem("POSTITS_V1");

  let parsedPostIt;
  if (!localStoragePostIt) {
    localStorage.setItem("POSTITS_V1", JSON.stringify([]));
    parsedPostIt = [];
  } else {
    parsedPostIt = JSON.parse(localStoragePostIt);
  }
  const [postIt, setPostIt] = React.useState(parsedPostIt);

  const savePostIt = (newPostIts) => {
    const stringifiedPostIt = JSON.stringify(newPostIts);
    localStorage.setItem("POSTITS_V1", stringifiedPostIt);
    setPostIt(newPostIts);
  };

  const createPostIt = (evt) => {
    const newArray = [...parsedPostIt];
    newArray.push({
      id: newArray.length + 1 + Date.now(),
      text: "",
      x: evt.clientX,
      y: evt.clientY,
    });
    savePostIt(newArray);
  };

  // Local Storage for deleted post its
  const localStorageDeletedPostIt = localStorage.getItem("DELETEDPOSTITS_V1");

  let parsedDeletedPostIt;
  if (!localStorageDeletedPostIt) {
    localStorage.setItem("DELETEDPOSTITS_V1", JSON.stringify([]));
    parsedDeletedPostIt = [];
  } else {
    parsedDeletedPostIt = JSON.parse(localStorageDeletedPostIt);
  }

  const [deletedPostIt, setDeletedPostIt] = React.useState(parsedDeletedPostIt);

  const saveDeletedPostIt = (deletedPostIts) => {
    const stringifiedDeletedPostIt = JSON.stringify(deletedPostIts);
    localStorage.setItem("DELETEDPOSTITS_V1", stringifiedDeletedPostIt);
    setDeletedPostIt(deletedPostIts);
  };

  function deletePostIt(evt) {
    // onDrop
    evt.preventDefault();
    const id = +evt.dataTransfer.getData("myid");
    const postItToDelete = parsedPostIt.filter((postIts) => postIts.id !== id);

    savePostIt(postItToDelete);

    // Create array for deleted post its
    const newArray = deletedPostIt;
    const filterDeletedPostIt = parsedPostIt.find(
      (postIts) => postIts.id === id,
    );

    newArray.push(filterDeletedPostIt);
    saveDeletedPostIt(newArray);
  }

  const permanentlyDeletePostIt = (evt, id) => {
    const postItToDelete = deletedPostIt.filter((postIts) => postIts.id !== id);
    saveDeletedPostIt(postItToDelete);
  };

  function restorePostIt(id) {
    const restoringPostIt = deletedPostIt.find((postIts) => postIts.id === id);
    const postItToDelete = deletedPostIt.filter((postIts) => postIts.id !== id);

    saveDeletedPostIt(postItToDelete);
    savePostIt([...postIt, restoringPostIt]);
  }

  function editText(id, text) {
    const updatingText = postIt.map((postIts) => {
      if (postIts.id === id) {
        return {
          ...postIts,
          text,
        };
      }
      return postIts;
    });
    savePostIt(updatingText);
  }

  // Drag & Drop
  function handleDrag(id, evt) {
    const takingPostIt = postIt.map((postIts) => {
      if (postIts.id === id) {
        return {
          ...postIts,
          x: evt.clientX,
          y: evt.clientY,
        };
      }
      return postIts;
    });
    savePostIt(takingPostIt);
  }

  return (
    <div onDoubleClick={createPostIt} id="workSpace" className="relative h-screen w-screen overflow-hidden">
      {postIt.map((e) => (
        <DataNote
          updateText={editText}
          draggable
          id={e.id}
          updatePosition={handleDrag}
          key={`${e.id}posit`}
          text={e.text}
          positionX={e.x}
          positionY={e.y}
          restoredPostIt={restorePostIt}
        />
      ))}
      <TrashComponent
        emptyArray={() => saveDeletedPostIt([])}
        deletedArray={deletedPostIt}
        onDelete={deletePostIt}
        onPermanentlyDeletePostIt={permanentlyDeletePostIt}
        restorePostIt={restorePostIt}
      />
    </div>
  );
}

export { WorkSpace };
