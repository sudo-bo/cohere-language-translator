import React, { useState } from 'react';
import TranslationInput from './TranslationInput';
import TranslationResult from './TranslationResult';
import axios from 'axios';
import './App.css';

const App = () => {
  const [result, setResult] = useState('');

  const handleTranslate = async ({ text, sourceLang, targetLang }) => {
    if (text.trim() === '') {
      setResult('');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/translate', {
        text,
        sourceLang,
        targetLang,
      });
      setResult(response.data.translation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cohere Language Translator</h1>
      <TranslationInput onTranslate={handleTranslate} />
      <TranslationResult result={result} />
    </div>
  );
};

export default App;
