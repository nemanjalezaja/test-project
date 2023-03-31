import { camelCase } from 'lodash';

const requireModule = require.context('.', true, /^(?!index).*\/(?!.*types).*\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js' || fileName.includes('types')) return;
  let newName = '';
  const splited = fileName.split('/');
  if (splited.length > 2) newName = splited[2];
  else newName = splited[1];

  const moduleName = camelCase(
    newName.replace(/(\.\/|\.js)/g, ''),
  );
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default,
  };
});

export default modules;
