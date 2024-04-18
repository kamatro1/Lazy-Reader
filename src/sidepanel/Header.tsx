import React, { useEffect, useState } from 'react'
import './SidePanel.css';


function Header() {
  const [bulletPoint, setBulletPoints] = useState<boolean>(true);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings") || '""')
    console.log(settings);
    if (typeof(settings) === "object") {
      setApiKey(settings.apiKey);
    }
      console.log("HEADER")
      console.log({apiKey : apiKey})
  }, [apiKey])
  
  const handleClick = () => {
    chrome.runtime.openOptionsPage();
  }

  return (
      <div id='header' className='header'>
        <div id='header-top' className='header-top'>
          <div id='header-top-logo' className='header-top-logo'>
            <img id='sloth60' className='logo' src='../icons/playful-ui/sloth/sloth60.svg'></img>
            <h1 id='title' className='heading-text'>LazyReader</h1>
          </div>
          <div id='header-top-buttons' className='header-top-buttons'>
            <img id='settings32' className='button' src='../icons/playful-ui/settings/settings32.svg' onClick={handleClick} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/settings/settings32-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/settings/settings32.svg')}></img>
          </div>
        </div>
        <div id='header-bottom' className='header-bottom'>
          <div id='header-bottom-options' className='header-bottom-options'>
            {bulletPoint ? <img id='bullet' className='button' src='../icons/playful-ui/bullet/bullet32-filled.svg'></img> : <img id='bullet' className='button' src='../icons/playful-ui/bullet/bullet32.svg' onClick={() => setBulletPoints(!bulletPoint)} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/bullet/bullet32-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/bullet/bullet32.svg')}></img>}
            {!bulletPoint ? <img id='paragraph' className='button' src='../icons/playful-ui/paragraph/paragraph32-filled.svg'></img> : <img id='paragraph' className='button' src='../icons/playful-ui/paragraph/paragraph32.svg' onClick={() => setBulletPoints(!bulletPoint)} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/paragraph/paragraph32-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/paragraph/paragraph32.svg')}></img>}
            <div id='reading-level-container' className='reading-level-container'>
              <h1 id='reading-level-text' className='dropdown-text'>Lvl:</h1>
              <img id='reading-level-dropdown' className='reading-level-dropdown' src='../icons/playful-ui/dropdown/reading-level-dropdown.svg'></img>
            </div>
            <div id='length-container' className='length-container'>
              <h1 id='length-text' className='dropdown-text'>Len:</h1>
              <img id='length-dropdown' className='length-dropdown' src='../icons/playful-ui/dropdown/length-dropdown.svg'></img>
            </div>
          </div>
          {checkbox ? <img id='checkbox32' className='button' src='../icons/playful-ui/checkbox/checkbox32-checked-filled.svg'></img> : <img id='checkbox32' className='button' src='../icons/playful-ui/checkbox/checkbox32-checked.svg' onClick={() => setCheckbox(!checkbox)} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/checkbox/checkbox32-checked-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/checkbox/checkbox32-checked.svg')}></img>}
        </div>
      </div>
  );
}

export default Header