import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCard from "@material-ui/icons/CreditCard";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import MediaQuery from "react-responsive";
import Modal from "./modal";
import ReactLoading from "react-loading";
import ReactModal from "react-modal";

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh"
  },
  root: {
    color: amber[600],
    "&$checked": {
      color: amber[500]
    }
  },
  checked: true,
  flex: {
    flexGrow: 1
  },
  small: {
    fontSize: "0.8rem",
    lineHeight: "1rem",
    margin: "0.5rem 0"
  },
  smallBold: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    lineHeight: "0.8rem"
  },
  container: {
    margin: "2rem"
  },
  paperClass: {
    margin: "0 auto",
    textAlign: "center",
    maxWidth: "500px",
    borderRadius: "0"
  },
  formControl: {
    margin: "2rem auto",
    width: "80%"
  },
  inputWrapper: {
    margin: "0.1rem"
  },
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
  margin8: {
    margin: "1.3rem 0"
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
  padding4: {
    padding: "1rem"
  },
  center: {
    margin: "1rem 1rem 1rem 0"
  },
  footerSmallDevice: {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center"
  },
  footerImageSmallDevice: {
    width: "5rem"
  },
  link: {
    textDecoration: "none",
    fontSize: "0.8rem",
    padding: "1rem",
    color: "white"
  },
  margin4: {
    margin: "0 1rem"
  },
  justifyContent: {
    alignItems: "center",
    display: "flex"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: grey
  }
});

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      openModal: false,
      checked: true,
      buttonDisabled: true,
      nameError: true,
      idError: true,
      openloadingModal: false
    };
  }

  handleOpen = () => {
    console.log("打开Modal");
    this.setState({
      openModal: true
    });
  };

  handleClose = () => {
    console.log("关闭Modal");
    this.setState({
      openModal: false
    });
  };

  handleChange = async () => {
    await this.setState({
      checked: !this.state.checked
    });
    this.canSubmit();
  };

  onChangeName = async e => {
    const value = e.target.value;
    if (value.length >= 3) {
      await this.setState({
        name: value,
        nameError: false
      });
      console.log("name validate", this.state.nameError);
    } else {
      await this.setState({
        name: value,
        nameError: true
      });
    }
    this.canSubmit();
    console.log(this.state.checked);
  };

  onChangeId = async e => {
    if (this.isCardNo(e.target.value)) {
      await this.setState({
        id: e.target.value,
        idError: false
      });
      console.log("id validate", this.state.idError);
    } else {
      await this.setState({
        id: "",
        idError: true
      });
      console.log(this.state.id);
    }
    this.canSubmit();
    console.log(this.state.checked);
  };

  isCardNo = id =>
    /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id) ? true : false;

  canSubmit = () =>
    !this.state.idError && !this.state.nameError && this.state.checked
      ? this.setState({ buttonDisabled: false })
      : this.setState({ buttonDisabled: true });

  submit = async () => {
    console.log("提交");
    console.log("");
    this.setState({ openloadingModal: true });
    await setTimeout(() => {
      this.setState({ openloadingModal: false });
    }, 3000);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className="wrapper__header">
          <AppBar
            position="static"
            style={{
              background:
                "linear-gradient(to bottom,#000000,#000000 45px) #4f0000"
            }}
          >
            <Toolbar>
              <MediaQuery query="(max-device-width: 1024px)">
                <Typography variant="title" className={classes.flex}>
                  <img
                    src="https://cdn.2kgames.com/web/nba.2k.com/images/nba2k19_logo_L_2.png"
                    style={{
                      margin: "1rem auto",
                      padding: "1rem",
                      width: "90%"
                    }}
                    alt=""
                  />
                </Typography>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 1024px)">
                <Typography variant="title" className={classes.flex}>
                  <img
                    src="https://cdn.2kgames.com/web/nba.2k.com/images/nba2k19_logo_L_2.png"
                    style={{ width: "200px" }}
                    alt=""
                  />
                </Typography>
                <Typography
                  variant="title"
                  align="right"
                  style={{ float: "right" }}
                >
                  <a
                    className={classes.link}
                    href="http://wwww.gamepoch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    星游纪官网{" "}
                  </a>
                </Typography>
                <Typography variant="title" align="right">
                  <a
                    className={classes.link}
                    href="http://nba2k18.gamepoch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PS4国行2K18官网
                  </a>
                </Typography>
                <Typography variant="title" align="right">
                  <a
                    className={classes.link}
                    href="https://nba.2k.com/2k19/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NBA2K19官网
                  </a>
                </Typography>
              </MediaQuery>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.container}>
          <Paper className={classes.paperClass}>
            <ReactModal
              isOpen={this.state.openloadingModal}
              className="Modal"
              overlayClassName="Overlay"
            >
              <MediaQuery query="(max-device-width: 1024px)">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "80%",
                    fontSize: "1.2rem"
                  }}
                >
                  <div style={{ margin: "10px auto", top: "20%" }}>
                    <ReactLoading
                      type={"spin"}
                      style={{
                        margin: "0 auto",
                        height: "4rem",
                        width: "4rem",
                        color: "red"
                      }}
                    />
                  </div>
                  <p>验证成功, 3s后将自动跳转到2k网站</p>
                </div>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 1024px)">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20%",
                    fontSize: "1.2rem"
                  }}
                >
                  <div style={{ margin: "10px auto", top: "20%" }}>
                    <ReactLoading
                      type={"spin"}
                      style={{
                        margin: "0 auto",
                        height: "4rem",
                        width: "4rem",
                        color: "red"
                      }}
                    />
                  </div>
                  <p>验证成功, 3s后将自动跳转到2k网站</p>
                </div>
              </MediaQuery>
            </ReactModal>
            <FormControl className={classes.formControl}>
              <h1>实名认证</h1>
              <Grid
                container
                spacing={16}
                alignItems="flex-end"
                className={classes.inputWrapper}
              >
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item style={{ width: "80%" }}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      label="公民身份证姓名"
                      onChange={this.onChangeName}
                      error={this.state.nameError}
                      style={{ width: "100%" }}
                    />
                  </MuiThemeProvider>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={16}
                alignItems="flex-end"
                className={classes.inputWrapper}
              >
                <Grid item>
                  <CreditCard />
                </Grid>
                <Grid item style={{ width: "80%" }}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      label="公民身份证号(15或者18位)"
                      onChange={this.onChangeId}
                      error={this.state.idError}
                      style={{ width: "100%" }}
                    />
                  </MuiThemeProvider>
                </Grid>
              </Grid>

              <div className={classes.justifyContent}>
                <FormControlLabel
                  className={classes.center}
                  control={
                    <Checkbox
                      classes={{ root: classes.root, checked: classes.checked }}
                      checked={this.state.checked}
                      onChange={this.handleChange}
                    />
                  }
                  label="同意隐私规则"
                />

                <Button onClick={this.handleOpen}>隐私规则</Button>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#FFC107", margin: "0 1rem" }}
                disabled={this.state.buttonDisabled}
                onClick={this.submit}
              >
                提交
              </Button>
              <Modal
                open={this.state.openModal}
                handleClose={this.handleClose}
              />
            </FormControl>
          </Paper>
        </div>
        <MediaQuery query="(min-device-width: 1024px)">
          <div className={classes.footer}>
            <div className={classes.padding4}>
              <img
                className={classes.footerImage}
                src="https://www.gamepoch.com/images/logo.png"
                rel="noopener noreferrer"
                alt=""
              />
            </div>
            <div>
              <div className={classes.smallBold}>
                <p>健康游戏公告：</p>
                <h5>
                  抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。
                </h5>
                <h5>
                  适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
                </h5>
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
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1024px)">
          <div className={classes.footerSmallDevice}>
            <div className={classes.padding4}>
              <img
                className={classes.footerImage}
                src="https://www.gamepoch.com/images/logo.png"
                alt=""
              />
            </div>
            <div>
              <div className={classes.smallBold}>
                <p>健康游戏公告：</p>
                <h5 className={classes.small}>抵制不良游戏，拒绝盗版游戏。</h5>
                <h5 className={classes.small}>注意自我保护，谨防受骗上当。</h5>
                <h5 className={classes.small}>适度游戏益脑，沉迷游戏伤身。</h5>
                <h5 className={classes.small}>合理安排时间，享受健康生活。</h5>
              </div>

              <div className={classes.margin8}>
                <p className={classes.small}>
                  本游戏适合12周岁或以上用户，为了您的健康，请合理安排游戏时间。
                </p>
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
                <p>© 2018上海星游纪信息技术有限公司版权所有</p>
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterForm);
