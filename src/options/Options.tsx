import React, { useState } from 'react'
import './Options.css'

function Setup() {
  const [apiKey, setApiKey] = useState<string>('');

  const handleSubmit = () => {
    console.log("SUBMIT");
    // TO DO 
    // Store API Key into local storage 
  };

  return (
    <div className="setup">
      <p className="setup_header">Setup:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apikey" className='apikey_label'>Enter User API Key: </label>
        <input
            id="apikey"
            type="text"
            className='apikey_input'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
        />
      </form>
    </div>
  )
}

function Feature({ feature, checked, setChecked } : { feature : string, checked : boolean, setChecked : any }) {    
  return (
    <div className="feature">
      {checked ? 
        <img id='checkbox32-filled' className='logo' src='../icons/playful-ui/checkbox/checkbox32-filled.svg' onClick={() => setChecked(!checked)}></img> :
        <img id='checkbox32' className='logo' src='../icons/playful-ui/checkbox/checkbox32.svg' onClick={() => setChecked(!checked)}></img> 
      }
      <p className="feature_name">{feature}</p>
    </div>
  )
}



function Options() {
  const [summary, setSummary] = useState<boolean>(false);
  const [keyTerms, setKeyTerms] = useState<boolean>(false);
  const [questions, setQuestions] = useState<boolean>(false);

  const handleClick = () => {
    console.log("CLOSED");
  };

  return (
    <div className="container">
        <div className="header">
            <div className="left_header">
              <img id='sloth128' className='logo' src='../icons/playful-ui/sloth/sloth128.svg'></img>
              <p className="setting_header">Settings</p>
            </div>
            <div className="right_header">
              <img id='close32' className='logo' src='../icons/playful-ui/close/close32.svg' onClick={handleClick}></img>
            </div>
        </div>
        <Setup />
        <div className="features">
          <p className="features_header">Features:</p>
          <Feature feature={"Generate Summary"} checked={summary} setChecked={setSummary}/>
          <Feature feature={"Generate Key Terms"} checked={keyTerms} setChecked={setKeyTerms}/>
          <Feature feature={"Generate Reflection Questions"} checked={questions} setChecked={setQuestions}/>
        </div>
    </div>
  )
}

export default Options