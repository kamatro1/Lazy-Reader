import React, { useState } from 'react';
import './SidePanel.css';

function Content() {
  return (
    <div id='content' className='content'>
      <div id='summary-header' className='summary-header'>
        <h1 id='summary-heading' className='heading-text'>Summary:</h1>
        <img id='copy32' className='button' src='../icons/playful-ui/copy/copy32.svg'></img>
      </div>
      <div id ='summary-text-box' className='summary-text-box'></div>
    </div>
  );
}
  
export default Content;