import { services } from "./services";

export const getServiceSuggestions = (keyword) => {
  const matchedKeys = search(keyword, Object.keys(services));
  
  return matchedKeys.map((key) => services[key]);
};

const search = (keyword, list) => {
  // if(!keyword) return [];
  return list
    .filter((item) => item.toLowerCase().startsWith(keyword.toLowerCase()))
    .sort();
};
