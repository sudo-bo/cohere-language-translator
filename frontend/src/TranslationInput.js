import React, { useState } from 'react';
import languages from './languages.jsx'; 

const TranslationInput = ({ onTranslate }) => {
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [suggestions, setSuggestions] = useState({ source: [], target: [] });

  const handleLanguageInput = (lang, type) => {
    const matches = languages.filter(l =>
      l.toLowerCase().startsWith(lang.toLowerCase())
    );
    if (type === 'source') {
      setSourceLang(lang);
      setSuggestions({ ...suggestions, source: matches });
    } else {
      setTargetLang(lang);
      setSuggestions({ ...suggestions, target: matches });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 300) {
      alert('Text exceeds 300 character limit.');
      return;
    }
    onTranslate({ text, sourceLang, targetLang });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate. (300 characters max)"
        maxLength="300"
      />
      <input
        value={sourceLang}
        onChange={(e) => handleLanguageInput(e.target.value, 'source')}
        placeholder="Enter source language"
        list="source-lang-options"
      />
      <datalist id="source-lang-options">
        {suggestions.source.map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </datalist>
      <input
        value={targetLang}
        onChange={(e) => handleLanguageInput(e.target.value, 'target')}
        placeholder="Enter target language"
        list="target-lang-options"
      />
      <datalist id="target-lang-options">
        {suggestions.target.map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </datalist>
      <button type="submit">Translate</button>
    </form>
  );
};

export default TranslationInput;
