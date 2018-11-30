import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  footer: {
    backgroundColor: "black",
    color: "white",
    padding: "1rem 1rem 1rem 10rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  },
  footerImage: {
    width: "10rem"
  },
  footerRight: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    textAlign: "center"
  },
  margin4: {
    margin: "0 1rem"
  },
  padding4: {
    padding: "1rem"
  },
  smallBold: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    lineHeight: "0.8rem"
  },
  qrcode: {
    width: "5rem",
    padding: "1rem"
  },
  flexHorizontal: {
    // flexDirection: "row",
    display: "flex",
    margin: "1rem auto"
  },
  margin8: {
    margin: "1.3rem 0"
  },
  small: {
    fontSize: "0.8rem",
    lineHeight: "1rem",
    margin: "0.5rem 0"
  }
};

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.footer}>
      <div className={classes.padding4}>
        <img
          className={classes.footerImage}
          src="https://www.gamepoch.com/img/logo.png"
          rel="noopener noreferrer"
          alt=""
        />
      </div>
      <div>
        <div className={classes.smallBold}>
          <p>健康游戏公告：</p>
          <h5>抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。</h5>
          <h5>适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</h5>
        </div>
        <div className={classes.margin8}>
          <p className={classes.small}>
            本游戏适合12周岁或以上用户，为了您的健康，请合理安排游戏时间。
          </p>
          <p>© 2018上海星游纪信息技术有限公司版权所有</p>
        </div>
      </div>
      <div className={classes.footerRight}>
        <div className={classes.flexHorizontal}>
          <div className={classes.margin4}>
            <img
              className={classes.qrcode}
              src="https://gamepochblobstorage.blob.core.windows.net/images/NBA2K19/gamepoch-wechat-qrcode.jpg"
              alt="微信二维码"
            />
            <h5 className={classes.small}>“Gamepoch星游纪”</h5>
            <h5 className={classes.small}>微信公众号</h5>
          </div>
          <div className={classes.margin4}>
            <img
              className={classes.qrcode}
              src="https://gamepochblobstorage.blob.core.windows.net/images/NBA2K19/gamepoch-weibo-qrcode.png"
              alt="微博二维码"
            />
            <h5 className={classes.small}>“Gamepoch星游纪”</h5>
            <h5 className={classes.small}>新浪微博</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Footer);
