// eslint-disable-next-line import/prefer-default-export
export const getRepos = (lang) => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`,
  );
  return fetch(endpoint)
    .then((res) => res.json())
    .then((json) => {
      if (!json.items) throw new Error(json.message);
      return json.items;
    });
};
