import React from "react";
import PropTypes from "prop-types";
import { getRepos } from "../util/api";

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
LangaugesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lang: "All", repos: {}, error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { lang } = this.state;
    this.setState({
      error: null,
      repos: { [lang]: await getRepos(this.state.lang) },
    });
  }

  handleClick(lang) {
    this.setState({
      lang,
      error: null,
    });
    if (!this.state.repos[lang]) {
      getRepos(lang)
        .then((data) => {
          // this.setState({ repos, error: null });
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [lang]: data,
            },
          }));
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  }

  isLoading = () => {
    return this.state.error === null && !this.state.repos[this.state.lang];
  };

  render() {
    const { lang } = this.state;
    return (
      <>
        <LangaugesNav handleClick={this.handleClick} selected={lang} />
        {this.isLoading() && <p>LOADING...</p>}
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.repos[lang] && (
          <pre>{JSON.stringify(this.state.repos[lang], null, 2)}</pre>
        )}
      </>
    );
  }
}
