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

  const colors = {
    names: {
      lightred: "rgb(254, 202, 202)",
      lightpurple: "rgb(233, 213, 255)",
      lightblue: "rgb(191, 219, 254)",
      lightgreen: "rgb(187, 247, 208)",
      lightemerald: "rgb(167, 243, 208)",
    },
  };

  function randomColor() {
    const random = Math.floor(Math.random() * 6);
    const values = (Object.values(colors.names));

    const result = values[random];

    return result;
  }

  const createPostIt = (evt) => {
    const newArray = [...parsedPostIt];
    newArray.push({
      id: newArray.length + 1 + Date.now(),
      text: "",
      x: evt.clientX,
      y: evt.clientY,
      background: `${randomColor()}`,
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

  const [show, setShow] = React.useState(false);

  return (
    <div
      onDoubleClick={createPostIt}
      id="workSpace"
      className="relative h-screen w-screen overflow-hidden "
    >
      {postIt.length === 0
        ? <p className="text-4xl font-light absolute text-center w-full p-2 bg-red-200 z-0">You do not have post its yet! Create one by double clicking</p>
        : postIt.map((e) => (
          <DataNote
            updateText={editText}
            draggable
            id={e.id}
            updatePosition={handleDrag}
            key={`${e.id}posit`}
            text={e.text}
            positionX={e.x}
            positionY={e.y}
            backgroundColor={e.background}
            restoredPostIt={restorePostIt}
            deletePostIt={deletePostIt}
          />
        ))}
      <div
        onDoubleClick={(evt) => {
          evt.stopPropagation();
        }}
        className="trashButtonContainer flex absolute bottom-0 right-0 justify-end items-end translate-x-px "
      >
        <span className=" absolute top-0.5 left-0.5 w-10 bg-red-500 font-bold text-white rounded-full p-1 text-2xl text-center select-none">{deletedPostIt.length}</span>
        <button
          onDrop={deletePostIt}
          onDoubleClick={(evt) => {
            evt.stopPropagation();
          }}
          onClick={() => setShow(true)}
          onDragOver={(evt) => evt.preventDefault()}
          id="buttonTrashComponent"
          className="bg-none border-none m-10 hover:scale-125 transition motion-reduce:hover:scale-0"
        >
          <i className="far fa-trash-alt text-8xl text-red-500" />
        </button>
      </div>
      <TrashComponent
        emptyArray={() => saveDeletedPostIt([])}
        show={show}
        setShow={setShow}
        deletedArray={deletedPostIt}
        onPermanentlyDeletePostIt={permanentlyDeletePostIt}
        restorePostIt={restorePostIt}
      />
    </div>
  );
}

export { WorkSpace };
