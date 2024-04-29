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
  const [summaryText, setSummaryText] = useState('');
  const { playful } = useContext(SettingsContext);
  const bodyStyle = {
    fontFamily: playful ? "'Gamja Flower', sans-serif" : "'Josefin Sans', sans-serif",
  };


  return (
    <div id='sidePanel' className={`side-panel ${playful ? 'playful' : 'plain'}`} style={bodyStyle}>
      <Header setSummaryText={setSummaryText} />
      <Content summaryText={summaryText} />
    </div>
  );
}

function SidePanel() {
  const [settings, setSettings] = useState({
    apiKey: '',
    model: 'gpt-3.5-turbo',
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
