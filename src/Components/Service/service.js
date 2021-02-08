import generatedData from "../../Data/generated.json";

const searchData = (data) => {
  return generatedData.filter(item => {
    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (item[key].includes(data)) {
        return item;
      }
    }
  })
};

export default {
  searchData,
};
