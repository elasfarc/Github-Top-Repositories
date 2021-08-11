import React from "react";
import PropTypes from "prop-types";
import { getRepos } from "../util/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";

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

function ReposGrid({ repos }) {
  return (
    <ul className="grid">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url} className="repo bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              <a className="link" href={html_url}>
                {login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
    // <pre>{JSON.stringify(repos, null, 2)}</pre>
  );
}

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
          //<pre>{JSON.stringify(this.state.repos[lang], null, 2)}</pre>
          <ReposGrid repos={this.state.repos[lang]} />
        )}
      </>
    );
  }
}
