import React, { Component, useEffect, useState, createContext, useContext } from 'react';
import './SidePanel.css';
import Header from './Header';
import Content from './Content';

export const SettingsContext = createContext<{
  apiKey: string;
  model: string;
  summary: boolean;
  keyTerms: boolean;
  questions: boolean;
  playful: boolean;
  colorTheme: string;
}>({
  apiKey: '',
  model: 'gpt-3.5-turbo',
  summary: false,
  keyTerms: false,
  questions: false,
  playful: true,
  colorTheme: 'grey',
});

function SidePanelContent() {
  const [summaryText, setSummaryText] = useState<Array<string>>([]);
  const [isLoadingSummary, setIsLoadingSummary] = React.useState<boolean>(false);
  const [keyTermsText, setKeyTermsText] = useState<Array<string>>([]);
  const [isLoadingKeyTerms, setIsLoadingKeyTerms] = React.useState<boolean>(false);
  const [questionsText, setQuestionsText] = useState<Array<string>>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = React.useState<boolean>(false);
  const { playful } = useContext(SettingsContext);
  const bodyStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
  };


  return (
    <div id='sidePanel' className={`side-panel ${playful ? 'playful' : 'plain'}`} style={bodyStyle}>
      <Header setSummaryText={setSummaryText} setIsLoadingSummary={setIsLoadingSummary}
        setKeyTermsText={setKeyTermsText} setIsLoadingKeyTerms={setIsLoadingKeyTerms}
        setQuestionsText={setQuestionsText} setIsLoadingQuestions={setIsLoadingQuestions}
      />
      <Content summaryText={summaryText} isLoadingSummary={isLoadingSummary}
        keyTermsText={keyTermsText} isLoadingKeyTerms={isLoadingKeyTerms}
        questionsText={questionsText} isLoadingQuestions={isLoadingQuestions}
      />
    </div>
  );
}

function SidePanel() {
  const [settings, setSettings] = useState({
    apiKey: '',
    model: 'gpt-3.5-turbo',
    loading: false,
    summary: false,
    keyTerms: false,
    questions: false,
    playful: true,
    colorTheme: 'grey',
  });

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    setSettings(storedSettings);
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <SidePanelContent />
    </SettingsContext.Provider>
  );
}

export default SidePanel;
