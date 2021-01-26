import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

const items = [
  {
    title: 'What is React?',
    content: 'React is a javascript framework.',
  },
  {
    title: 'How do we show...',
    content: 'To show content...',
  },
  {
    title: 'Why is React useful?',
    content: 'Engineers like it.',
  }
];

const options = [
  {
    label: 'Red',
    value: 'red',
  },
  {
  label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
]

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      {showDropdown ? 
        <Dropdown 
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        /> : null
      }
    </div>
  );
};

export default App;
