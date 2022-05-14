import React from 'react';
import './App.css';
import { AddPostIt } from './AddPostIt';


function App() {
  
  const localStoragePostIt = localStorage.getItem('POSTITS_V1');

  let parsedPostIt;
  
  const [postIt, setPostIt] = React.useState([{parsedPostIt}]);

  const savePostIt = (newPostIts) => {
    const stringifiedPostIt = JSON.stringify(newPostIts);
    localStorage.setItem('POSTITS_V1', stringifiedPostIt);
    setPostIt(newPostIts);
  }
  
  if (!localStoragePostIt){
    localStorage.setItem('POSTITS_V1', JSON.stringify([]));
    parsedPostIt = []
  }else{
    parsedPostIt = JSON.parse(localStoragePostIt)
  }
  
 
  const createPostIt = (evt)=>{
    console.log(evt)
    console.log(evt.clientY)
    const newArray = [...parsedPostIt]
    newArray.push({
      id: newArray.length + 1,
      text: "my text ",
      x: evt.clientX ,
      y: evt.clientY
    })
    savePostIt(newArray)
  }
  

  // Drag & Drop
  // const container = document.getElementById("workSpace")
  // container.addEventListener('dragenter',e=>{console.log("Drag enter")})
  
  // 
  return (
    <div className="App">
      <AddPostIt actionCreate={createPostIt} postIt={parsedPostIt} />
    </div>
  );
}

export default App;

