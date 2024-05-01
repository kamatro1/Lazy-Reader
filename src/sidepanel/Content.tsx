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
  summaryText: string;
  isLoadingSummary: boolean;
  keyTermsText: string;
  isLoadingKeyTerms: boolean;
  questionsText: string;
  isLoadingQuestions: boolean;
}

function Content({ summaryText, isLoadingSummary, keyTermsText, isLoadingKeyTerms, questionsText, isLoadingQuestions } : ContentProps) {
  const { apiKey, summary, keyTerms, questions, playful, colorTheme } = useContext(SettingsContext);
  const [copySummary, setCopySummary] = useState<boolean>(false);
  const [copyKeyTerms, setCopyKeyTerms] = useState<boolean>(false);
  const [copyQuestions, setCopyQuestions] = useState<boolean>(false);

  const headingTextStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
    fontSize: playful ? '31px' : '24px', // adjust the font size for playful
  };

  let backgroundColor;
  switch (colorTheme) {
    case 'blue':
      backgroundColor = '#E4F1FF';
      break;
    case 'yellow':
      backgroundColor = '#FFEDCB';
      break;
    case 'red':
      backgroundColor = '#FFE9E9';
      break;
    case 'green':
      backgroundColor = '#D6F4C8';
      break;
    default:
      backgroundColor = '#F1F1F1';
  }

  const contentStyle = { backgroundColor };

  const summaryHeight = summary && !keyTerms && !questions ? 74 : (summary && keyTerms && questions ? 35 : 55);
  const keyTermsHeight = keyTerms && !summary ? 33 : (keyTerms ? 12 : 0);
  const questionsHeight = questions && !summary ? 33 : (questions ? 12 : 0);

  const summaryTextBoxStyle = { height: `${summaryHeight}vh` };
  const keyTermsTextBoxStyle = { height: `${keyTermsHeight}vh` };
  const questionsTextBoxStyle = { height: `${questionsHeight}vh` };

  return (
    <div id='content' className='content'>
      {summary && (
        <>
          <div className='section'>
            <div id='summary-header' className='feature-header'>
              <h1 id='summary-heading' style={headingTextStyle}>Summary:</h1>
              <img 
                id='copy32' 
                className='button'
                alt='copy' 
                src={copySummary 
                  ? `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-checked-${colorTheme}.svg` 
                  : `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`}
                onClick={() => {
                  setCopySummary(true);
                  setTimeout(() => {
                    setCopySummary(false);
                  }, 3000);
                }} 
                onMouseOver={(e) => {
                  if (!copySummary) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-filled-${colorTheme}.svg`;
                  }
                }} 
                onMouseOut={(e) => {
                  if (!copySummary) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`;
                  }
                }}
              />
            </div>
            <div id ='summary-text-box' className='feature-text-box' style={{ ...summaryTextBoxStyle, ...contentStyle }}>
              {isLoadingSummary ? <p className='feature-text'>Loading summary...</p> : <p className='feature-text'>{summaryText}</p>}
            </div>
          </div>
        </>
      )}

      {keyTerms && (
        <>
          <div className='section'>
            <div id='key-terms-header' className='feature-header'>
              <h1 id='key-terms-heading' style={headingTextStyle}>Key Terms:</h1>
              <img 
                id='copy32' 
                className='button'
                alt='copy' 
                src={copyKeyTerms 
                  ? `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-checked-${colorTheme}.svg` 
                  : `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`}
                onClick={() => {
                  setCopyKeyTerms(true);
                  setTimeout(() => {
                    setCopyKeyTerms(false);
                  }, 3000);
                }} 
                onMouseOver={(e) => {
                  if (!copyKeyTerms) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-filled-${colorTheme}.svg`;
                  }
                }} 
                onMouseOut={(e) => {
                  if (!copyKeyTerms) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`;
                  }
                }}
              />
            </div>
            <div id='key-terms-text-box' className='feature-text-box' style={{ ...keyTermsTextBoxStyle, ...contentStyle }}>
              {isLoadingKeyTerms ? <p className='feature-text'>Loading key terms...</p> : <p className='feature-text'>{keyTermsText}</p>}
            </div>
          </div>
        </>
      )}

      {questions && (
        <>
          <div className='section'>
            <div id='questions-header' className='feature-header'>
              <h1 id='questions-heading' style={headingTextStyle}>Reflection Questions:</h1>
              <img 
                id='copy32' 
                className='button'
                alt='copy' 
                src={copyQuestions 
                  ? `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-checked-${colorTheme}.svg` 
                  : `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`}
                onClick={() => {
                  setCopyQuestions(true);
                  setTimeout(() => {
                    setCopyQuestions(false);
                  }, 3000);
                }} 
                onMouseOver={(e) => {
                  if (!copyQuestions) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32-filled-${colorTheme}.svg`;
                  }
                }} 
                onMouseOut={(e) => {
                  if (!copyQuestions) {
                    e.currentTarget.src = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/copy/copy32.svg`;
                  }
                }}
              />
            </div>
            <div id='questions-text-box' className='feature-text-box' style={{ ...questionsTextBoxStyle, ...contentStyle }}>
              {isLoadingQuestions ? <p className='feature-text'>Loading questions...</p> : <p className='feature-text'>{questionsText}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
  
export default Content;