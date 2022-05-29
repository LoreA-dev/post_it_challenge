import React from "react";
import "./style.css";

function DataNote({
  id,
  text,
  updateText,
  positionX,
  positionY,
  updatePosition,
  onDelete,
  draggable,
  restorePostIt
}) {
  const [toggleTextArea, setToggleTextArea] = React.useState(text === "");
  const [information, setInformation] = React.useState("");

  let canEdit = !draggable 
    ? false 
    : draggable && toggleTextArea
      ? true 
      : false
  const onDragElement = (evt) => {
    evt.dataTransfer.setData("myid", id);
  };
  const dragableOpt = {
    onDragStart: onDragElement,
    draggable: true,
    onDragEnd: (evt) => updatePosition(id, evt),
    style: {
      top: positionY,
      left: positionX,
      position: "absolute",
    },
  };
  const saveText = ()=>{
    setToggleTextArea(!toggleTextArea);
    updateText(id, information);
  }

  const noDrag = {
    style: { display: "inline-block" },
  };
  return (
    <div
      {...(draggable ? dragableOpt : noDrag)}
      className="newPostIt"
      id={"note_" + id}
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      {draggable ? null : (
        <>
        <button className="deletePostItButton" onClick={(evt)=>onDelete(evt, id)}>
          <i className="fas fa-times"></i>
        </button>
        <button onClick={() => restorePostIt(id)} >Restore</button>
        </>
      )}
      {!canEdit ? (
        <p onClick={() =>setToggleTextArea(!toggleTextArea)} className="pText" >{text}</p>
      ) : (
        <textarea
          defaultValue={text}
          onChange={(evt) => setInformation(evt.target.value)}
          maxLength="70"
          autoCapitalize="sentences"
          className="textBox"
          onKeyDown={(e) => {
            if (["Enter", "NumpadEnter"].includes(e.code) && information !== "" ) {
              saveText()
            }
          }}
        ></textarea>
      )}
    </div>
  );
}

export { DataNote };
