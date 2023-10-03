/* 
import React from "react";
import './App.css';


function App() {
 const [data, setData] = React.useState(null);

 React.useEffect(() => {
  fetch("/api")
     .then((res) => res.json())
     .then((data) => setData(data.message))
 }

 )
//let logourl = data;

 return (
  <div className="App">
    <header className="App-header">
      <img src={require('./phases/'+ data)} alt="logo"/>
      <p>{!data ? "Loading..." : data}</p>
    </header>
  </div>
);
}

export default App;

*/

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
       .then((res) => res.json())
       .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data && <img src={require(`./phases/${data}`)} alt="logo" />}
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;


