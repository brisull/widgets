import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [term]);

  useEffect(() => {
    const wikiBase = 'https://en.wikipedia.org/w/api.php';
    const params = {
      action: 'query',
      list: 'search',
      origin: '*',
      format: 'json',
      srsearch: debouncedTerm,
    };

    const search = async () => {
      const {data} = await axios.get(wikiBase, {params});
      setResults(data.query.search);  
    };

    search();

    // if (debouncedTerm && !results.length) {
    //   search();
    // } else {
    //   const timeoutId = setTimeout(() => {
    //     if (debouncedTerm) {
    //       search();
    //     }
    //   }, 1000);
  
    //   return () => {
    //     // console.log('CLEANUP');
    //     clearTimeout(timeoutId);
    //   };
    // }
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
      <div className="right floated content">
        <a 
          className="ui button"
          href={`https://en.wikipedia.org?curid=${result.pageid}`}
          target="_blank"
          rel="noreferrer"
        >
          Go
        </a>
      </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term</label>
          <input
            className="input"
            type="text"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>

    </div>
  );
};

export default Search;