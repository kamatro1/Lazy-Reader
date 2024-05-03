import React, { useEffect, useState } from 'react'
import './Options.css'

interface SetupProps {
  apiKey : string,
  setApiKey : (arg0 : string) => void,
  model : string,
  setModel : (arg0 : string) => void,
  playful: boolean,
  colorTheme: string
}

function Setup({apiKey, setApiKey, model, setModel, playful, colorTheme} : SetupProps) {
  const fontStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '40px' : '31px',
  };

  return (
    <div className="setup">
      <p className="setup_header" style={fontStyle}>Setup:</p>
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
      <div className="model">
        <p className="model_header">Model:</p>
        {model === 'gpt-3.5-turbo' ? (
          <img
            className="model-icon"
            alt="GPT 3.5 Turbo"
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/model/model-3.5T-${colorTheme}.svg`}
          />
        ) : (
          <img
            className="model-icon"
            alt="GPT 3.5 Turbo"
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/model/model-3.5T.svg`}
            onClick={() => setModel('gpt-3.5-turbo')}
          />
        )}
        {model === 'gpt-4-turbo' ? (
          <img
            className="model-icon"
            alt="GPT 4 Turbo"
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/model/model-4T-${colorTheme}.svg`}
          />
        ) : (
          <img
            className="model-icon"
            alt="GPT 4 Turbo"
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/model/model-4T.svg`}
            onClick={() => setModel('gpt-4-turbo')}
          />
        )}
      </div>
    </div>
  )
}

interface FeatureProps {
  feature : string, 
  checked : boolean, 
  setChecked : (arg0: boolean) => void,
  playful: boolean,
  colorTheme: string
}

function Feature({ feature, checked, setChecked, playful, colorTheme } : FeatureProps ) {    
  return (
    <div className="feature">
      {checked ?
        <img
          id='checkbox32-filled'
          className='logo'
          src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-${colorTheme}.svg`}
          alt='Checked Box'
          onClick={() => setChecked(!checked)}
        />
        :
        <img
          id='checkbox32'
          className='logo'
          src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked-${colorTheme}.svg`}
          alt='Unchecked Box'
          onClick={() => setChecked(!checked)}
        />
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
  const fontStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '40px' : '31px',
  };
  
  return (
    <div className="display_options">
      <p className="display_options_header" style={fontStyle}>
        Display Options:
      </p>
      <div className="theme">
        <p className="theme_header">Theme:</p>
        {playful ? <img id='playful-filled' src={`../icons/plain-ui/playful-option/playful-option-filled-${colorTheme}.svg`} alt="PlayFul Option Filled" className='logo playful-setting-icon'/> :
                   <img id='playful' src="../icons/plain-ui/playful-option/playful-option.svg" alt="PlayFul Option" className='logo playful-setting-icon' onClick={() => setPlayful(!playful)}/>}
        {!playful ? <img id='plain-filled' src={`../icons/plain-ui/plain-option/plain-option-filled-${colorTheme}.svg`} alt="Plain Option Filled" className='logo playful-setting-icon'/> :
                   <img id='plain' src="../icons/plain-ui/plain-option/plain-option.svg" alt="Plain Option" className='logo playful-setting-icon' onClick={() => setPlayful(!playful)}/>}
      </div>
      <div className="theme_colors">
        <p className="theme_colors_header">Theme Colors:</p>
        {colorTheme === 'grey' ?
          <img
            id='checked-grey'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled.svg`}
            alt='Checked Grey'
            className='color-icon'
          />
          :
          <img
            id='unchecked-grey'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked.svg`}
            alt='Unchecked Grey'
            className='color-icon'
            onClick={() => setColorTheme('grey')}
          />
        }
        {colorTheme === 'red' ?
          <img
            id='checked-red'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-red.svg`}
            alt='Checked red'
            className='color-icon'
          />
          :
          <img
            id='unchecked-red'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked-red.svg`}
            alt='Unchecked red'
            className='color-icon'
            onClick={() => setColorTheme('red')}
          />
        }
        {colorTheme === 'blue' ?
          <img
            id='checked-blue'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-blue.svg`}
            alt='Checked blue'
            className='color-icon'
          />
          :
          <img
            id='unchecked-blue'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked-blue.svg`}
            alt='Unchecked blue'
            className='color-icon'
            onClick={() => setColorTheme('blue')}
          />
        }
        {colorTheme === 'yellow' ?
          <img
            id='checked-yellow'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-yellow.svg`}
            alt='Checked yellow'
            className='color-icon'
          />
          :
          <img
            id='unchecked-yellow'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked-yellow.svg`}
            alt='Unchecked yellow'
            className='color-icon'
            onClick={() => setColorTheme('yellow')}
          />
        }
        {colorTheme === 'green' ?
          <img
            id='checked-green'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-green.svg`}
            alt='Checked green'
            className='color-icon'
          />
          :
          <img
            id='unchecked-green'
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-unchecked-green.svg`}
            alt='Unchecked green'
            className='color-icon'
            onClick={() => setColorTheme('green')}
          />
        }
      </div>
    </div>
  )
}

function Options() {
  const [apiKey, setApiKey] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-3.5-turbo');
  const [summary, setSummary] = useState<boolean>(false);
  const [keyTerms, setKeyTerms] = useState<boolean>(false);
  const [questions, setQuestions] = useState<boolean>(false);
  const [playful, setPlayful] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<string>('grey');
  const fontStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '53px' : '40px',
  };
  const fontStyle2 = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '40px' : '31px',
  };

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings") || '""')
    if (typeof(settings) === "object") {
      setApiKey(settings.apiKey);
      setModel(settings.model);
      setSummary(settings.summary);
      setKeyTerms(settings.keyTerms);
      setQuestions(settings.questions);
      setPlayful(settings.playful);
      setColorTheme(settings.colorTheme);
    }
  }, [])

  const handleClick = () => {
    console.log({apiKey, model, summary, keyTerms, questions, playful, colorTheme});
    if (apiKey === '') {
      window.alert("NO API KEY!");
    } else {
      window.localStorage.setItem("settings", JSON.stringify({
          apiKey : apiKey,
          model : model,
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
      <div className={`container ${playful ? 'playful' : 'plain'}`}>
          <div className="intro">
            <div className="intro_header_top">
              <div className="left_intro_header">
                <img id='sloth128' className='logo' src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/sloth/sloth128.svg`} alt='Sloth Logo'></img>
                <p className="intro_header">Welcome to LazyReader</p>
              </div>
              <div className="right_header">
                <img id='close32' className='logo' src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/close/close64.svg`} alt='Closed Icon' onClick={handleClick}></img>
              </div>
            </div>
            <div className="user_instructions">
              <p className="intro_text">Welcome to the LazyReader Extension! To use the LazyReader summarization features, please select the text you would like to summarize, then right click and select “Capture Snippet”. 
              On the sidebar, select your desired bullet point format, level, and length before clicking on the checkmark button to generate your summary!</p>
            </div>
        </div>
        <div className="settings_header">
            <p className="setting_header">Settings</p>
        </div>
      <Setup apiKey={apiKey} setApiKey={setApiKey} model={model} setModel={setModel} playful={playful} colorTheme={colorTheme}/>
      <p className="features_header" style={fontStyle2}>Features:</p>
      <div className="features">
        <Feature
          feature={"Generate Summary"}
          checked={summary}
          setChecked={setSummary}
          playful={playful}
          colorTheme={colorTheme}
        />
        <Feature
          feature={"Generate Key Terms"}
          checked={keyTerms}
          setChecked={setKeyTerms}
          playful={playful}
          colorTheme={colorTheme}
        />
        <Feature
          feature={"Generate Reflection Questions"}
          checked={questions}
          setChecked={setQuestions}
          playful={playful}
          colorTheme={colorTheme}
        />
      </div>
      <DisplayOptions
        playful={playful}
        setPlayful={setPlayful}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
      />
    </div>
  )
}

export default Options