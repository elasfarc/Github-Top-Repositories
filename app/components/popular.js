import React from 'react';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lang: 'All' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(lang) {
    this.setState({ lang });
  }

  // handleClick =  (lang) => {
  //   this.setState({ lang })
  // }

  render() {
    const LANGS = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className="flex-center">
        {LANGS.map((lang) => (
          <li key={lang} style={this.state.lang === lang ? {backgroundColor: 'orangered'} : null}>
            <button className="btn-clear nav-link" onClick={() => this.handleClick(lang)}>{lang}</button>
          </li>
        ))}
      </ul>
    );
  }
}
