import React from "react";
import "./style.css";

function DataNote({
  id,
  text,
  positionX,
  positionY,
  updatePosition,
  onDelete,
  draggable,
}) {
  const [editable, setEditable] = React.useState(true);
  const [saveInformation, setSaveInformation] = React.useState("");

  const onDragElement = (evt) => {
    evt.dataTransfer.setData("myid", id);
  };
  const dragableopt = {
    onDragStart: onDragElement,
    draggable: true,
    onDragEnd: (evt) => updatePosition(id, evt),
    style: {
      top: positionY,
      left: positionX,
      position: "absolute",
    },
  };

  const noDrag = {
    style: { display: "inline-block" },
  };
  return (
    <div
      {...(draggable ? dragableopt : noDrag)}
      className="newPostIt"
      id={"note_" + id}
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      {draggable ? null : (
        <button className="deletePostItButton" onClick={(evt)=>onDelete(evt, id)}>
          <i className="fas fa-times"></i>
        </button>
      )}
      {!editable ? (
        <p className="pText">{text}</p>
      ) : (
        <textarea
          onChange={(evt) => setSaveInformation(evt.target.defaultValue)}
          maxLength="70"
          autoCapitalize="sentences"
          className="textBox"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              setEditable(!editable);
            }
          }}
          defaultValue={text}
        ></textarea>
      )}
    </div>
  );
}

export { DataNote };
