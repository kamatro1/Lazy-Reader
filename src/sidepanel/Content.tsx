import React, { useState } from 'react';
import './SidePanel.css';

function Content() {
  const [copy, setCopy] = useState<boolean>(false);

  return (
    <div id='content' className='content'>
      <div id='summary-header' className='summary-header'>
        <h1 id='summary-heading' className='heading-text'>Summary:</h1>
        {copy ? <img id='copy32' className='button' src='../icons/playful-ui/copy/copy32-checked.svg'></img> : <img id='copy32' className='button' src='../icons/playful-ui/copy/copy32.svg' 
          onClick={() => {
            setCopy(true);
            setTimeout(() => {
              setCopy(false);
            }, 3000);
          }} 
          onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/copy/copy32-filled.svg')} 
          onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/copy/copy32.svg')}></img>}
      </div>
      <div id ='summary-text-box' className='summary-text-box'>
      </div>
    </div>
  );
}
  
export default Content;