import axios from "axios";

export default class Api {
  // 验证PSNID合法性
  static validatePSNId = async psnid =>
    new Promise((resolve, reject) =>
      axios
        .post("https://servicewechat.gamepoch.com/api/verifyPsOnlineId", {
          onlineId: psnid,
          reserveIfAvailable: false
        })
        .then(response => resolve(response.data))
        .catch(e => reject(e))
    );
}
