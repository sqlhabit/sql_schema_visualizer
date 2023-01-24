const path = require('path');

const ruleChildren = loader =>
  loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule)
        ? {
            index,
            rules,
          }
        : findIndexAndRules(ruleChildren(rule), ruleMatcher)),
  );
  return result;
};

const createLoaderMatcher = loader => rule =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const fileLoaderMatcher = createLoaderMatcher('file-loader');

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index, 0, value);
};

function rewireYAML(config) {
  const yamlLoader = {
    test: /\.ya?ml$/,
    type: "json",
    use: [
      { loader: require.resolve('yaml-loader') },
    ],
  };

  addBeforeRule(config.module.rules, fileLoaderMatcher, yamlLoader);

  console.log(config);

  return config;
}

module.exports = rewireYAML;
