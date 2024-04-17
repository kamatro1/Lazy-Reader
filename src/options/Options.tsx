import React, { useEffect, useState } from 'react'
import './Options.css'

interface SetupProps {
  apiKey : string,
  setApiKey : (arg0 : string) => void
}

function Setup({apiKey, setApiKey} : SetupProps) {
  return (
    <div className="setup">
      <p className="setup_header">Setup:</p>
      <form>
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

interface FeatureProps {
  feature : string, 
  checked : boolean, 
  setChecked : (arg0: boolean) => void 
}

function Feature({ feature, checked, setChecked } : FeatureProps ) {    
  return (
    <div className="feature">
      {checked ? 
        <img id='checkbox32-filled' className='logo' src='../icons/playful-ui/checkbox/checkbox32-checked-filled.svg' alt='Checked Box' onClick={() => setChecked(!checked)}></img> :
        <img id='checkbox32' className='logo' src='../icons/playful-ui/checkbox/checkbox32-unchecked.svg' alt='Unchecked Box' onClick={() => setChecked(!checked)}></img> 
      }
      <p className="feature_name">{feature}</p>
    </div>
  )
}

interface DisplayOptionsProps {
  playful : boolean,
  setPlayful : (arg0: boolean) => void,
  colorTheme : string,
  setColorTheme : (arg0: string) => void
}

function DisplayOptions({playful, setPlayful, colorTheme, setColorTheme} : DisplayOptionsProps) {
  return (
    <div className="display_options">
      <p className="display_options_header">
        Display Options:
      </p>
      <div className="theme">
        <p className="theme_header">Theme:</p>
        {playful ? <img id='playful-filled' src="../icons/plain-ui/playful-option/playful-option-filled.svg" alt="PlayFul Option Filled" className='logo playful-setting-icon'/> :
                   <img id='playful' src="../icons/plain-ui/playful-option/playful-option.svg" alt="PlayFul Option" className='logo playful-setting-icon' onClick={() => setPlayful(!playful)}/>}
        {!playful ? <img id='plain-filled' src="../icons/plain-ui/plain-option/plain-option-filled.svg" alt="Plain Option Filled" className='logo playful-setting-icon'/> :
                   <img id='plain' src="../icons/plain-ui/plain-option/plain-option.svg" alt="Plain Option" className='logo playful-setting-icon' onClick={() => setPlayful(!playful)}/>}
      </div>
      <div className="theme_colors">
        <p className="theme_colors_header">Theme Colors:</p>
        {colorTheme === 'grey' ? <img id='checked-grey' src='../icons/playful-ui/checkbox/checkbox32-checked-filled.svg' alt='Checked Grey' className='color-icon'/> : 
                                <img id='unchecked-grey' src='../icons/playful-ui/checkbox/checkbox32-unchecked.svg' alt='Unchecked Grey' className='color-icon'onClick={() => setColorTheme('grey')}/>}
        {colorTheme === 'red' ? <img id='checked-red' src='../icons/playful-ui/checkbox/checkbox32-checked-filled-red.svg' alt='Checked red' className='color-icon'/> : 
                                <img id='unchecked-red' src='../icons/playful-ui/checkbox/checkbox32-unchecked-red.svg' alt='Unchecked red' className='color-icon' onClick={() => setColorTheme('red')}/>}
        {colorTheme === 'blue' ? <img id='checked-blue' src='../icons/playful-ui/checkbox/checkbox32-checked-filled-blue.svg' alt='Checked blue' className='color-icon'/> : 
                                <img id='unchecked-blue' src='../icons/playful-ui/checkbox/checkbox32-unchecked-blue.svg' alt='Unchecked blue' className='color-icon' onClick={() => setColorTheme('blue')}/>}
        {colorTheme === 'yellow' ? <img id='checked-yellow' src='../icons/playful-ui/checkbox/checkbox32-checked-filled-yellow.svg' alt='Checked yellow' className='color-icon'/> : 
                                <img id='unchecked-yellow' src='../icons/playful-ui/checkbox/checkbox32-unchecked-yellow.svg' alt='Unchecked yellow' className='color-icon' onClick={() => setColorTheme('yellow')}/>}
      </div>
    </div>
  )
}

function Options() {
  const [apiKey, setApiKey] = useState<string>('');
  const [summary, setSummary] = useState<boolean>(false);
  const [keyTerms, setKeyTerms] = useState<boolean>(false);
  const [questions, setQuestions] = useState<boolean>(false);
  const [playful, setPlayful] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<string>('grey');

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings") || '""')
    if (typeof(settings) === "object") {
      setApiKey(settings.apiKey);
      setSummary(settings.summary);
      setKeyTerms(settings.keyTerms);
      setQuestions(settings.questions);
      setPlayful(settings.playful);
      setColorTheme(settings.colorTheme);
    }
  }, [])

  const handleClick = () => {
    console.log({apiKey, summary, keyTerms, questions, playful, colorTheme});
    if (apiKey === '') {
      window.alert("NO API KEY!");
    } else {
      window.localStorage.setItem("settings", JSON.stringify({
          apiKey : apiKey,
          summary: summary,
          keyTerms : keyTerms,
          questions : questions,
          playful : playful,
          colorTheme : colorTheme
      }));
      window.close();
    }
  };

  return (
    <div className="container">
        <div className="header">
            <div className="left_header">
              <img id='sloth128' className='logo' src='../icons/playful-ui/sloth/sloth128.svg' alt='Sloth Logo'></img>
              <p className="setting_header">Settings</p>
            </div>
            <div className="right_header">
              <img id='close32' className='logo' src='../icons/playful-ui/close/close32.svg' alt='Closed Icon' onClick={handleClick}></img>
            </div>
        </div>
        <Setup apiKey={apiKey} setApiKey={setApiKey}/>
        <p className="features_header">Features:</p>
        <div className="features">
          <Feature feature={"Generate Summary"} checked={summary} setChecked={setSummary}/>
          <Feature feature={"Generate Key Terms"} checked={keyTerms} setChecked={setKeyTerms}/>
          <Feature feature={"Generate Reflection Questions"} checked={questions} setChecked={setQuestions}/>
        </div>
        <DisplayOptions playful={playful} setPlayful={setPlayful} colorTheme={colorTheme} setColorTheme={setColorTheme}/>
    </div>
  )
}

export default Options