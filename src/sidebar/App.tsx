import React, { useEffect } from 'react';
import './App.css';

function App() {
    useEffect(() => {
        console.log("SIDE BAR OPENED")
    }, [])
  return (
    <div className="App">
      <header>Lazy Reader</header>
      <h1>Sidebar Test</h1>
    </div>
  );
}

export default App;
