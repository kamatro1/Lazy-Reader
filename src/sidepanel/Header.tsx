import React, { useEffect, useState } from 'react'
import './SidePanel.css';

interface HeaderProps {
  setSummaryText: (arg0: string) => void
}

function Header({ setSummaryText }: HeaderProps) {
  const [bulletPoint, setBulletPoints] = useState<boolean>(true);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [summary, setSummary] = useState<boolean>(false);
  const [keyTerms, setKeyTerms] = useState<boolean>(false);
  const [questions, setQuestions] = useState<boolean>(false);
  const [length, setLength] = useState<string>('regular');
  const [readingLevel, setReadingLevel] = useState<string>('advanced');

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings") || '""')
    if (typeof (settings) === "object") {
      setApiKey(settings.apiKey);
      setSummary(settings.summary);
      setKeyTerms(settings.keyTerms);
      setQuestions(settings.questions);
    }
  }, [])

  const handleClickClose = () => {
    chrome.runtime.openOptionsPage();
  }

  const handleClickGenerate = () => {
    const content = 'Supreme Court showdowns. Closed-door negotiations. And millions of dollars in litigation. After months of legal and legislative skirmishes around the country, much of the redistricting drama of the 2024 election cycle is behind us. And it has ended pretty close to where it began: Just a handful of seats could determine which party controls the US House of Representatives, where Republicans now hold a threadbare majority.In North Carolina, newly empowered GOP state legislators took an aggressive approach with their map-drawing, crafting lines that are expected to allow their party to flip at least three seats now held by Democrats. But, in recently concluded redistricting in New York, Democrats, who had final say over the map, adopted a more modest position – essentially turning just one Republican-held seat a deeper shade of blue.In the South, Democrats are expected to gain two seats as a result of Voting Rights Act rulings out of Alabama and Louisiana. But a protracted battle over the congressional map in another Southern state, Georgia, has not changed the partisan balance of the state’s US House delegation heading into November.“It’s amazing that with all of the states where we’ve had things going on and with all the different lawsuits, we are really only talking about a small number of districts that are guaranteed to change hands as a result of this entire shuffle,” said Nick Seabrook, a political scientist at the University of North Florida and the author of the 2022 book “One Person, One Vote: A Surprising History of Gerrymandering in America.”'
    const body = {
      apiKey: apiKey,
      model: 'gpt-3.5-turbo',
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
    });
    console.log({ apiKey: apiKey, summary: summary, questions: questions, keyTerms: keyTerms })
  }

  return (
    <div id='header' className='header'>
      <div id='header-top' className='header-top'>
        <div id='header-top-logo' className='header-top-logo'>
          <img id='sloth60' className='logo' src='../icons/playful-ui/sloth/sloth60.svg'></img>
          <h1 id='title' className='heading-text'>LazyReader</h1>
        </div>
        <div id='header-top-buttons' className='header-top-buttons'>
          <img id='settings32' className='button' src='../icons/playful-ui/settings/settings32.svg' onClick={handleClickClose} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/settings/settings32-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/settings/settings32.svg')}></img>
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
        {checkbox ? <img id='checkbox32' className='button' src='../icons/playful-ui/checkbox/checkbox32-checked-filled.svg'></img> : <img id='checkbox32' className='button' src='../icons/playful-ui/checkbox/checkbox32-checked.svg' onClick={handleClickGenerate} onMouseOver={e => (e.currentTarget.src = '../icons/playful-ui/checkbox/checkbox32-checked-filled.svg')} onMouseOut={e => (e.currentTarget.src = '../icons/playful-ui/checkbox/checkbox32-checked.svg')}></img>}
      </div>
    </div>
  );
}

export default Header