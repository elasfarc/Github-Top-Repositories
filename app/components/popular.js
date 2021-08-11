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
    this.state = { lang: "All", repos: null, error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ error: null, repos: await getRepos(this.state.lang) });
  }

  handleClick(lang) {
    this.setState({
      lang,
      error: null,
      repos: null,
    });
    getRepos(lang)
      .then((repos) => {
        this.setState({ repos, error: null });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  isLoading = () => {
    return this.state.error === null && this.state.repos === null;
  };

  render() {
    const { lang } = this.state;
    return (
      <>
        <LangaugesNav handleClick={this.handleClick} selected={lang} />
        {/* {console.log("*****", this.state.repos)}
        {console.log("*****", this.isLoading)} */}
        {this.isLoading() && <p>LOADING...</p>}
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.repos && (
          <pre>{JSON.stringify(this.state.repos, null, 2)}</pre>
        )}
      </>
    );
  }
}
