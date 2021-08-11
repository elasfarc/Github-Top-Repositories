import React from 'react';

export default class Popular extends React.Component {
  render() {
    const LANGS = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return(
      <ul className='flex-center'>
        {LANGS.map(lang => (
          <li key={lang}>
            <button className='btn-clear nav-link'>{lang}</button>
        </li>
        ))}
      </ul>
    )
  }
}