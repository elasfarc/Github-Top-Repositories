import React from "react";

function LangaugesNav(props) {
  const LANGS = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {LANGS.map((lang) => (
        <li
          key={lang}
          style={
            props.selected === lang ? { backgroundColor: "orangered" } : null
          }
        >
          <button
            className="btn-clear nav-link"
            onClick={() => props.handleClick(lang)}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lang: "All" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(lang) {
    this.setState({ lang });
  }

  // handleClick =  (lang) => {
  //   this.setState({ lang })
  // }

  render() {
    const { lang } = this.state;
    return (
      <>
        <LangaugesNav handleClick={this.handleClick} selected={lang} />
      </>
    );
  }
}
