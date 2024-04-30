import React, { useEffect, useState, useContext } from 'react'
import './SidePanel.css';
import DropdownMenu from './Dropdown';
import { SettingsContext } from './SidePanel';

interface SettingsContextValue {
  apiKey: string;
  model: string;
  summary: boolean;
  keyTerms: boolean;
  questions: boolean;
  playful: boolean;
  colorTheme: string;
}

interface HeaderProps {
  setSummaryText: (arg0: string) => void;
  setIsLoadingSummary: (arg0: boolean) => void;
  setKeyTermsText: (arg0: string) => void;
  setIsLoadingKeyTerms: (arg0: boolean) => void;
  setQuestionsText: (arg0: string) => void;
  setIsLoadingQuestions: (arg0: boolean) => void;
}

function Header({ setSummaryText, setIsLoadingSummary, setKeyTermsText, setIsLoadingKeyTerms, setQuestionsText, setIsLoadingQuestions }: HeaderProps) {
  const { apiKey, model, summary, keyTerms, questions, playful, colorTheme } = useContext(SettingsContext);
  const [bulletPoint, setBulletPoints] = React.useState<boolean>(true);
  const [readingLevel, setReadingLevel] = React.useState<string>('advanced');
  const [length, setLength] = React.useState<string>('regular');
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [isFirstGen, setIsFirstGen] = useState<boolean>(true);
  const [iconSrc, setIconSrc] = useState('');

  useEffect(() => {
    setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked.svg`);
  }, [playful]);

  const handleClickClose = () => {
    chrome.runtime.openOptionsPage();
    window.close();
  }

  const handleReadingLevelChange = (level: string) => {
    setReadingLevel(level);
  };

  const handleLengthChange = (length: string) => {
    setLength(length);
  };

  const handleGenerateClick = () => {
    if (isFirstGen) {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-${colorTheme}.svg`);
      setTimeout(() => {
        setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/refresh/refresh32.svg`);
      }, 3000);
    } else {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/refresh/refresh32.svg`);
    }

    setIsFirstGen(false);
    handleGetResponse();
  };

  const handleGenerateHover = () => {
    if (isFirstGen) {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked-filled-${colorTheme}.svg`);
    } else {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/refresh/refresh32-filled-${colorTheme}.svg`);
    }
  };

  const handleGenerateHoverOut = () => {
    if (isFirstGen) {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/checkbox/checkbox32-checked.svg`);
    } else {
      setIconSrc(`../icons/${playful ? 'playful-ui' : 'plain-ui'}/refresh/refresh32.svg`);
    }
  };

  const handleGetResponse = () => {
    const content = 'Supreme Court showdowns. Closed-door negotiations. And millions of dollars in litigation. After months of legal and legislative skirmishes around the country, much of the redistricting drama of the 2024 election cycle is behind us. And it has ended pretty close to where it began: Just a handful of seats could determine which party controls the US House of Representatives, where Republicans now hold a threadbare majority.In North Carolina, newly empowered GOP state legislators took an aggressive approach with their map-drawing, crafting lines that are expected to allow their party to flip at least three seats now held by Democrats. But, in recently concluded redistricting in New York, Democrats, who had final say over the map, adopted a more modest position – essentially turning just one Republican-held seat a deeper shade of blue.In the South, Democrats are expected to gain two seats as a result of Voting Rights Act rulings out of Alabama and Louisiana. But a protracted battle over the congressional map in another Southern state, Georgia, has not changed the partisan balance of the state’s US House delegation heading into November.“It’s amazing that with all of the states where we’ve had things going on and with all the different lawsuits, we are really only talking about a small number of districts that are guaranteed to change hands as a result of this entire shuffle,” said Nick Seabrook, a political scientist at the University of North Florida and the author of the 2022 book “One Person, One Vote: A Surprising History of Gerrymandering in America.”'

    if (summary) {
      setIsLoadingSummary(true);
      const body = {
        apiKey: apiKey,
        model: model,
        responseType: 'summarization',
        content: content,
        format: bulletPoint ? 'bullet points' : 'paragraph',
        readingLevel: readingLevel,
        length: length
      }
      console.log(body);
  
      chrome.runtime.sendMessage({ type: "getResponse", body }).then((response) => {
        console.log("[Content] response from ChatGPT API: " + response.result);
        setSummaryText(response.result);
        setIsLoadingSummary(false);
      });
      console.log({ apiKey: apiKey, summary: summary, questions: questions, keyTerms: keyTerms, playful: playful, colorTheme: colorTheme, readingLevel: readingLevel, length: length })
    }

    if (keyTerms) {
      setIsLoadingKeyTerms(true);
      const body = {
        apiKey: apiKey,
        model: model,
        responseType: 'terms',
        content: content,
        format: bulletPoint ? 'bullet points' : 'paragraph',
        readingLevel: readingLevel,
        length: length
      }
      console.log(body);
  
      chrome.runtime.sendMessage({ type: "getResponse", body }).then((response) => {
        console.log("[Content] response from ChatGPT API: " + response.result);
        setKeyTermsText(response.result);
        setIsLoadingKeyTerms(false);
      });
      console.log({ apiKey: apiKey, summary: summary, questions: questions, keyTerms: keyTerms, playful: playful, colorTheme: colorTheme, readingLevel: readingLevel, length: length })
    }
    if (questions) {
      setIsLoadingQuestions(true);
      const body = {
        apiKey: apiKey,
        model: model,
        responseType: 'questions',
        content: content,
        format: bulletPoint ? 'bullet points' : 'paragraph',
        readingLevel: readingLevel,
        length: length
      }
      console.log(body);
  
      chrome.runtime.sendMessage({ type: "getResponse", body }).then((response) => {
        console.log("[Content] response from ChatGPT API: " + response.result);
        setQuestionsText(response.result);
        setIsLoadingQuestions(false);
      });
      console.log({ apiKey: apiKey, summary: summary, questions: questions, keyTerms: keyTerms, playful: playful, colorTheme: colorTheme, readingLevel: readingLevel, length: length })
    }
  }

  const headingTextStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '31px' : '24px', // adjust the font size for playful
  };
  
  return (
    <div id='header' className='header'>
      <div id='header-top' className='header-top'>
        <div id='header-top-logo' className='header-top-logo'>
          <img 
            id='sloth60'
            className='logo'
            alt='logo' 
            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/sloth/sloth60.svg`}>
          </img>
          <h1 id='title' style={headingTextStyle}>LazyReader</h1>
        </div>
        <div id='header-top-buttons' className='header-top-buttons'>
        <img
          id='settings32'
          className='button'
          alt='settings'
          src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/settings/settings32.svg`}
          onClick={handleClickClose}
          onMouseOver={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/settings/settings32-filled-${colorTheme}.svg`)}
          onMouseOut={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/settings/settings32.svg`)}
        />
        </div>
      </div>
      <div id='header-bottom' className='header-bottom'>
      <div id='header-bottom-options' className='header-bottom-options'>
          {bulletPoint ? <img 
                            id='bullet'
                            className='button'
                            alt='bullet'
                            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/bullet/bullet32-filled-${colorTheme}.svg`}>
                          </img> : 
                          <img 
                            id='bullet'
                            className='button'
                            alt='bullet'
                            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/bullet/bullet32.svg`}
                            onClick={() => setBulletPoints(!bulletPoint)}
                            onMouseOver={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/bullet/bullet32-filled-${colorTheme}.svg`)}
                            onMouseOut={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/bullet/bullet32.svg`)}>
                          </img>}
          {!bulletPoint ? <img 
                            id='paragraph'
                            className='button'
                            alt='paragraph'
                            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/paragraph/paragraph32-filled-${colorTheme}.svg`}>
                          </img> : 
                          <img 
                            id='paragraph'
                            className='button'
                            alt='paragraph'
                            src={`../icons/${playful ? 'playful-ui' : 'plain-ui'}/paragraph/paragraph32.svg`}
                            onClick={() => setBulletPoints(!bulletPoint)}
                            onMouseOver={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/paragraph/paragraph32-filled-${colorTheme}.svg`)}
                            onMouseOut={e => (e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/paragraph/paragraph32.svg`)}>
                          </img>}
          <div id='reading-level-container' className='reading-level-container'>
            <h1 id='reading-level-text' className='dropdown-text'>Lvl:</h1>
            <DropdownMenu 
              optionType='readingLevel'
              setValue={setReadingLevel}
            />
          </div>
          <div id='length-container' className='length-container'>
            <h1 id='length-text' className='dropdown-text'>Len:</h1>
            <DropdownMenu
              optionType='length'
              setValue={setLength}
            />            
          </div>
        </div>
        <img
            id='icon'
            className='button'
            alt={isFirstGen ? 'checkbox' : 'refresh'}
            src={iconSrc}
            onClick={handleGenerateClick}
            onMouseOver={handleGenerateHover}
            onMouseOut={handleGenerateHoverOut}
          />
      </div>
    </div>
  );
}

export default Header