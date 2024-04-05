import React, { useEffect } from 'react';
import './SidePanel.css';

function SidePanel() {
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

export default SidePanel;
