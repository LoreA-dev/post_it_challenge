import React from "react";

function DataNote({
  id, text, updateText, positionX, positionY, updatePosition, onDelete, draggable, restorePostIt,
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
    },
  };
  const saveText = () => {
    setToggleTextArea(!toggleTextArea);
    updateText(id, information);
  };

  const noDrag = {
    style: { display: "inline-block" },
  };
  return (
    <div
      {...(draggable ? dragableOpt : noDrag)}
      className="newPostIt border border-gray-300 bg-yellow-200 w-60 h-60 m-2 rounded-md text-center text-3xl p-1 "
      id={`note_${id}`}
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      {draggable ? null : (
        <div className=" m-2 float-right h-10 w-16 bg-red-300 z-10">
          <button className="deletePostItButton text-3xl border-none bg-none cursor-pointer text-red-500 z-1" onClick={(evt) => onDelete(evt, id)}>
            <i className="fas fa-times"></i>
          </button>
          <button className="text-2xl text-gray-400 hover:text-cyan-500" onClick={() => restorePostIt(id)}>
            <i className="fas fa-trash-restore"></i>
          </button>
        </div>
      )}
      {!canEdit ? (
        <p onClick={() => setToggleTextArea(!toggleTextArea)} className="pText bg-none break-all  border-0 w-56 h-56 m-px p-5 outline-none ">{text}</p>
      ) : (
        <textarea
          defaultValue={text}
          onChange={(evt) => setInformation(evt.target.value)}
          maxLength="55"
          autoCapitalize="sentences"
          className="textBox bg-inherit border-0 text-center w-56 h-56 outline-none resize-none m-px p-5"
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
