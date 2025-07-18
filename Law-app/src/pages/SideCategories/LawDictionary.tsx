

import React, { useState, useEffect, useMemo } from 'react';
import './LawDictionary.css';
import lawData from '../../data/lawDic/lawDic.json';

interface LawTerm {
  term: string;
  definition: string;
}

interface LegalWordsData {
  Legal_words: Record<string, LawTerm[]>;
}

const LawDictionary: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');  // Empty = show all
  const [data, setData] = useState<LegalWordsData | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setData(lawData);
  }, []);

  const filteredWords = useMemo(() => {
    if (!data) return {};

    const legalWords = data.Legal_words;

    const targetLetter = searchText
      ? searchText.trim().charAt(0).toUpperCase()
      : selectedLetter;

    if (!targetLetter) {
      // No search or selected letter – show all
      const allSorted: Record<string, LawTerm[]> = {};
      Object.entries(legalWords).forEach(([letter, terms]) => {
        allSorted[letter] = [...terms].sort((a, b) => a.term.localeCompare(b.term));
      });
      return allSorted;
    }

    const selectedTerms = legalWords[targetLetter];
    if (selectedTerms) {
      return {
        [targetLetter]: [...selectedTerms].sort((a, b) => a.term.localeCompare(b.term)),
      };
    }

    return {};
  }, [data, selectedLetter, searchText]);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setSearchText(''); // Clear search when alphabet is clicked
  };

  return (
    <div className="dictionary-container">
      <h1>Legal Dictionary</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by first letter..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setSelectedLetter(''); // Clear selected letter when typing
          }}
        />
      </div>

      {/* Alphabet Buttons */}
      <div className="alphabet-container">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
          <button
            key={letter}
            className={`alphabet-btn ${selectedLetter === letter ? 'active' : ''}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Word List */}
      {Object.entries(filteredWords).length === 0 ? (
        <p>No entries found for this letter.</p>
      ) : (
        Object.entries(filteredWords).map(([letter, terms]) => (
          <div key={letter} className="letter-section">
            <h2 className="letter-title">{letter}</h2>
            <ul className="term-list">
              {terms.map((t, i) => (
                <li key={i} className="term-item">
                  <strong>{t.term}:</strong> {t.definition}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default LawDictionary;
