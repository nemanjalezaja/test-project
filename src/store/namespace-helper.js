import { reduce } from 'lodash';

export default function removeNamespace(namespace, types) {
  return reduce(types, (acc, typeValue, typeName) => {
    const val = typeValue.replace(namespace, '');
    return {
      ...acc,
      [typeName]: val,
    };
  }, {});
}
