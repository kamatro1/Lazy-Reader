import React from 'react';
import ReactDOM, { hydrateRoot }  from 'react-dom/client';
import SidePanel from './SidePanel';

const root = ReactDOM.createRoot(document.body);
const sidePanel = <SidePanel />;
root.render(sidePanel);