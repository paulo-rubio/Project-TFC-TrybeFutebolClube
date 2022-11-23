const errorMap = {
  productNotFont: 404,
  invalidValue: 422,
  camposInvlios: 400,

};

const mapError = (type) => errorMap[type] || 500;

export default {
  errorMap,
  mapError,
};
