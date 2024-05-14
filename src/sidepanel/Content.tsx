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
  summaryText: Array<string>;
  isLoadingSummary: boolean;
  keyTermsText: Array<string>;
  isLoadingKeyTerms: boolean;
  questionsText: Array<string>;
  isLoadingQuestions: boolean;
}

function Content({ summaryText, isLoadingSummary, keyTermsText, isLoadingKeyTerms, questionsText, isLoadingQuestions }: ContentProps) {
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

  const copyToClipBoard = (type: string) => {
    if (type === 'summary') {
      navigator.clipboard.writeText(summaryText.join(""))
    }
    if (type === 'questions') {
      navigator.clipboard.writeText(questionsText.join(""))
    }
    if (type === 'key_terms') {
      navigator.clipboard.writeText(keyTermsText.join(""))
    }

  }
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
                  copyToClipBoard('summary');
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
            <div id='summary-text-box' className='feature-text-box' style={{ ...contentStyle }}>
              {isLoadingSummary ? <p className='feature-text'>Loading summary...</p> : summaryText.length > 1 ?
                <ul className='feature-text' style={{ margin: 0, paddingLeft: '15px' }}>{summaryText.slice(1, summaryText.length).map((s) => (<li>{s}</li>))}</ul> : <p className='feature-text'>{summaryText[0]}</p>}
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
                  copyToClipBoard('key_terms');
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
            <div id='key-terms-text-box' className='feature-text-box' style={{ ...contentStyle }}>
              {isLoadingKeyTerms ? <p className='feature-text'>Loading key terms...</p> :
                <ol className='feature-text' style={{ margin: 0, paddingLeft: '15px' }}>{keyTermsText.slice(1, keyTermsText.length).map((s) => (<li>{s}</li>))}</ol>}
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
                  copyToClipBoard('questions');
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
            <div id='questions-text-box' className='feature-text-box' style={{ ...contentStyle }}>
              {isLoadingQuestions ? <p className='feature-text'>Loading questions...</p> :
                <ol className='feature-text' style={{ margin: 0, paddingLeft: '15px' }}>{questionsText.slice(1, questionsText.length).map((s) => (<li>{s}</li>))}</ol>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;