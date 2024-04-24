import React, { useState, useContext } from 'react';
import './SidePanel.css';
import { SettingsContext } from './SidePanel';

interface SettingsContextValue {
  apiKey: string;
  summary: boolean;
  keyTerms: boolean;
  questions: boolean;
  playful: boolean;
  colorTheme: string;
}

interface ContentProps {
  summaryText : string
}

function Content({ summaryText } : ContentProps) {
  const { apiKey, summary, keyTerms, questions, playful, colorTheme } = useContext(SettingsContext);
  const [copy, setCopy] = useState<boolean>(false);

  const headingTextStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '31px' : '24px', // adjust the font size for playful
  };

  return (
    <div id='content' className='content'>
      <div id='summary-header' className='summary-header'>
        <h1 id='summary-heading' style={headingTextStyle}>Summary:</h1>
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
        {summaryText}
      </div>
    </div>
  );
}
  
export default Content;