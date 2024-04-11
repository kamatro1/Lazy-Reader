import React from 'react';
import ReactDOM from 'react-dom/client';
import SidePanel from './SidePanel';

const header = document.createElement("div");
header.className = "header";
document.body.appendChild(header);

const headerRoot = ReactDOM.createRoot(header);
headerRoot.render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>
);

const content = document.createElement("div");
content.className = "content";
document.body.appendChild(content);

const contentRoot = ReactDOM.createRoot(content);
contentRoot.render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>
);