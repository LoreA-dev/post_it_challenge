import React from "react";

function DataNote({
  id, text, updateText, positionX, positionY, updatePosition, onDelete, draggable,
  restorePostIt, backgroundColor,
}) {
  const [toggleTextArea, setToggleTextArea] = React.useState(text === "");
  const [information, setInformation] = React.useState("");

  const canEdit = !draggable ? false : draggable && toggleTextArea ? true : false;

  const onDragElement = (evt) => { evt.dataTransfer.setData("myid", id); };

  const dragableOpt = {
    onDragStart: onDragElement,
    draggable: true,
    onDragEnd: (evt) => updatePosition(id, evt),
    style: {
      top: positionY,
      left: positionX,
      position: "absolute",
      background: backgroundColor,
    },
  };
  const saveText = () => {
    setToggleTextArea(!toggleTextArea);
    updateText(id, information);
  };

  const noDrag = {
    style: {
      display: "inline-block",
      background: backgroundColor,
    },
  };
  return (
    <div
      {...(draggable ? dragableOpt : noDrag)}
      className="newPostIt border bg-yellow-200 border-gray-300 w-60 h-60 m-2 rounded-md text-center text-3xl p-1 z-0 "
      id={`note_${id}`}
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      {draggable ? null : (
        <div className="h-0 float-right mx-2.5">
          <button className="deletePostItButton mr-3 text-3xl border-none bg-none cursor-pointer text-red-500 align-middle" onClick={(evt) => onDelete(evt, id)}>
            <i className="fas fa-times"></i>
          </button>
          <button className="text-2xl text-gray-400 hover:text-cyan-500" onClick={() => restorePostIt(id)}>
            <i className="fas fa-trash-restore"></i>
          </button>
        </div>
      )}
      {!canEdit ? (
        <p onClick={() => setToggleTextArea(!toggleTextArea)} className="pText clear-left bg-none break-all border-0 w-56 h-56 m-px mt-1.5 p-5 outline-none">{text}</p>
      ) : (
        <textarea
          defaultValue={text}
          onChange={(evt) => setInformation(evt.target.value)}
          maxLength="55"
          autoCapitalize="sentences"
          className="textBox bg-transparent border-0 text-center w-56 h-56 outline-none resize-none m-px p-5"
          onKeyDown={(e) => {
            if (["Enter", "NumpadEnter"].includes(e.code) && information !== "") {
              saveText();
            }
          }}
        >
        </textarea>
      )}
    </div>
  );
}

export { DataNote };
