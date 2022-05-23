import React from "react";
import { DataNote } from "../DataNote";
import "./style.css";
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

  // const [deletedElement, setDeletedElement] = React.useState([]);

  function deletePostIt(evt) { //onDrop 
    evt.preventDefault()
    const id = +(evt.dataTransfer.getData("myid")); 
    const postItToDelete = parsedPostIt.filter((postIts) => postIts.id !== id);
    savePostIt(postItToDelete);

  }

  const permanentlyDeletePostIt = (id) => {
    const postItToDelete = postIt.filter((postIts) => postIts.id !== id);
    savePostIt(postItToDelete);
  };

  // Drag & Drop
  function handleDrag(id, evt) {
    const takingPostIt = postIt.map((postIts) => {
      if (postIts.id === id) {
        return {
          ...postIts,
          x: evt.clientX,
          y: evt.clientY,
        };
      } else {
        return postIts;
      }
    });
    savePostIt(takingPostIt);
  }

  return (
    <div onDoubleClick={createPostIt} id="workSpace">
      {postIt.map((e) => (
        <DataNote
          onDelete={() => permanentlyDeletePostIt(e.id)}
          id={e.id}
          updatePosition={handleDrag}
          key={e.id + "posit"}
          text={e.text}
          positionX={e.x}
          positionY={e.y}
        />
      ))}
      <TrashComponent onDelete={deletePostIt} />
    </div>
  );
}

export { WorkSpace };
