import React from "react";

function DataNote({
  id, text, updateText, positionX, positionY, updatePosition, onDelete, draggable,
  restorePostIt, backgroundColor, deletePostItMobile,
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
      className="newPostIt z-10 border bg-yellow-200 border-gray-300 m:w-60 m:h-60 w-64 h-64 m-2 rounded-md text-center text-3xl p-1 z-0 "
      id={`note_${id}`}
      onDoubleClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      {
      !draggable
        ? null
        : (
          <button className="deleteButton absolute right-1 m:hidden lg:hidden mr-3 m-2 text-4xl border-none bg-none text-red-500" onClick={() => deletePostItMobile(id)}>
            <i className="fas fa-times"></i>
          </button>
        )
    }
      {draggable ? null : (
        <div className="h-0 float-right mx-2.5">
          <button className="deletePostItButton mr-3 border-none bg-none cursor-pointer text-red-500" onClick={(evt) => onDelete(evt, id)}>
            <i className="fas fa-times m:text-4xl text-4xl"></i>
          </button>
          <button className="restorePostItButton text-gray-400 hover:text-cyan-500" onClick={() => restorePostIt(id)}>
            <i className="fas fa-trash-restore m:text-2xl text-3xl"></i>
          </button>
        </div>
      )}
      {!canEdit ? (
        <p onClick={() => setToggleTextArea(!toggleTextArea)} className="pText clear-left bg-none break-all border-0 md:w-56 md:h-56 w-60 h-60 m-auto mt-3 p-5 outline-none">{text}</p>
      ) : (
        <textarea
          placeholder="Press enter for save text.."
          defaultValue={text}
          onChange={(evt) => setInformation(evt.target.value)}
          maxLength="55"
          autoCapitalize="sentences"
          className="textBox placeholder:italic placeholder:text-slate-400 md:static lg:static bg-transparent border-0 text-center w-56 h-60 outline-none resize-none m-px p-5"
          onKeyDown={(e) => {
            if ((["Enter", "NumpadEnter"].includes(e.code) || e.keyCode === 13) && information !== "") {
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
