export default class Utils {
  static getParamsFromUrl = url => {
    url = decodeURI(url);
    if (typeof url === "string") {
      let params = url.split("?");
      let eachParamsArr = params[1].split("&");
      let obj = {};
      if (eachParamsArr && eachParamsArr.length) {
        eachParamsArr.forEach(param => {
          let keyValuePair = param.split("=");
          let key = keyValuePair[0];
          let value = keyValuePair[1];
          obj[key] = value;
        });
      }
      return obj;
    }
  };

  static isCardNo = id =>
    /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id) ? true : false;
}
