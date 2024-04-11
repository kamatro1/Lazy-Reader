import React from 'react'
import './SidePanel.css';


function Header() {
  const handleClick = () => {
    chrome.runtime.openOptionsPage();
  }

  return (
      <div id='header' className='header'>
        <div id='header-top' className='header-top'>
          <div id='header-top-logo' className='header-top-logo'>
            <img id='sloth60' className='logo' src='../icons/playful-ui/sloth/sloth60.svg'></img>
            <h1 id='title' className='logo-title'>LazyReader</h1>
          </div>
          <div id='header-top-buttons' className='header-top-buttons'>
            <img id='settings32' className='button' src='../icons/playful-ui/settings/settings32.svg' onClick={handleClick}></img>
            <img id='close32' className='button' src='../icons/playful-ui/close/close32.svg'></img>
          </div>
        </div>
        <div id='header-bottom' className='header-bottom'></div>
      </div>
  );
}

export default Header