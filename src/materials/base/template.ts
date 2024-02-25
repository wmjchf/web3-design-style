import Text from "./Text/template";

const basicTemplate = [Text];
const BasicTemplate = basicTemplate.map((v) => {
  return { ...v, category: "base" };
});

export default BasicTemplate;
