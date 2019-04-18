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
import grey from "@material-ui/core/colors/grey";
import amber from "@material-ui/core/colors/amber";
import Modal from "./Modal";
import ProgressModal from "./ProgressModal";
import urlDecode from "urldecode";
import Api from "../utils/api";
import Utils from "../utils/utils";

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  root: {
    color: amber[600],
    "&$checked": {
      color: amber[500]
    }
  },
  checked: true,

  container: {
    margin: "2rem"
  },
  paperClass: {
    margin: "0 auto",
    textAlign: "center",
    maxWidth: "500px",
    borderRadius: "0",
    marginTop: "5rem"
  },
  formControl: {
    margin: "2rem auto",
    width: "80%"
  },
  inputWrapper: {
    margin: "0.1rem"
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
      psnid: "",
      openModal: false,
      checked: true,
      buttonDisabled: true,
      nameError: true,
      idError: true,
      psnIdError: true,
      openloadingModal: false,
      redirect: false,
      modalHintText: "正在验证数据中，请稍等",
      errorHint: ""
    };
  }

  redirectToPrivacy = () =>
    window.open("https://nba2k19.gamepoch.com/yinsi.html", "_blank");

  handleClose = () => {
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
    if (value.trim().length >= 2 && value.trim().length < 8) {
      await this.setState({
        name: value,
        nameError: false
      });
      // console.log("name validate", this.state.nameError);
    } else {
      await this.setState({
        name: value,
        nameError: true
      });
    }
    this.canSubmit();
    // console.log(this.state.checked);
  };

  onChangeId = async e => {
    if (e.target.value.trim().length < 15) {
      await this.setState({
        id: e.target.value,
        idError: true
      });
    } else {
      const birthday = e.target.value.substr(6, 8);
      const year = parseInt(birthday.substr(0, 4), 10);
      const month = parseInt(birthday.substr(4, 2), 10);
      const day = parseInt(birthday.substr(6, 2), 10);
      // console.log(year + "" + month + "" + day);
      if (
        year > 2018 ||
        year < 1900 ||
        month < 0 ||
        month > 12 ||
        day < 0 ||
        day > 31
      ) {
        await this.setState({
          id: e.target.value,
          idError: true
        });
        return;
      }

      if (Utils.isCardNo(e.target.value)) {
        await this.setState({
          id: e.target.value,
          idError: false
        });
        // console.log("id validate", this.state.idError);
      } else {
        await this.setState({
          id: "",
          idError: true
        });
        // console.log(this.state.id);
      }
      this.canSubmit();
    }
  };

  onChangePSNId = e => {
    const value = e.target.value.trim();
    this.setState(
      () => ({
        psnid: value,
        psnIdError: value.length >= 3 ? false : true
      }),
      () => this.canSubmit()
    );
  };

  canSubmit = () =>
    !this.state.idError &&
    !this.state.nameError &&
    !this.state.psnIdError &&
    this.state.checked
      ? this.setState({ buttonDisabled: false })
      : this.setState({ buttonDisabled: true });

  submit = async () => {
    this.setState({ buttonDisabled: true });
    const validateResult = await Api.validatePSNId(this.state.psnid);
    this.setState({ buttonDisabled: false });
    if (validateResult !== 1) {
      this.showErrorModal("PSN ID不存在");
      return;
    }

    try {
      const redirectURL = urlDecode(window.location.search.substr(14));
      const index = redirectURL.indexOf("?");
      const targetHostName = redirectURL.substr(0, index + 1);
      const c = Utils.getParamsFromUrl(redirectURL).c;
      let restricted = 1;
      const birthday = this.state.id.substr(6, 8);
      const year = birthday.substr(0, 4);
      const month = birthday.substr(4, 2);
      const day = birthday.substr(6, 2);
      const birthdayTime = new Date(year, month, day).getTime();
      const currentTime = new Date().getTime();

      if ((currentTime - birthdayTime) / (3600 * 1000 * 24 * 365) > 18) {
        restricted = 0;
        // console.log("成年");
      } else {
        // console.log("未成年");
        this.showErrorModal("未成年");
      }

      const key = "ed9e41b21de7d4635596254d8f9626d5";

      this.setState(
        () => ({ openloadingModal: true }),
        () =>
          setTimeout(
            () =>
              (window.location = `${targetHostName}c=${c}&restricted=${restricted}&key=${key}`),
            3000
          )
      );
    } catch (e) {
      this.showErrorModal("Error");
      // console.log(e);
      // alert("");
    }
  };

  showErrorModal(modalHintText) {
    this.setState(
      () => ({ openloadingModal: true }),
      () =>
        setTimeout(
          () =>
            this.setState({
              openloadingModal: false,
              openModal: true,
              errorHint: modalHintText
            }),
          1000
        )
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Paper className={classes.paperClass}>
            <ProgressModal
              isOpen={this.state.openloadingModal}
              hintText={this.state.modalHintText}
              className="Modal"
              overlayClassName="Overlay"
            />
            <FormControl className={classes.formControl}>
              <h1>用户激活</h1>
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
                      label="姓名"
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
                      label="身份证号(15或者18位)"
                      onChange={this.onChangeId}
                      error={this.state.idError}
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
                  <img
                    src="/img/PS4.png"
                    style={{ width: "25px", height: "25px" }}
                    alt="PS4 logo"
                  />
                </Grid>
                <Grid item style={{ width: "80%" }}>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      label="PSNID"
                      onChange={this.onChangePSNId}
                      error={this.state.psnIdError}
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

                <Button onClick={this.redirectToPrivacy}>隐私规则</Button>
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
                title={this.state.title}
                body={this.state.errorHint}
              />
            </FormControl>
          </Paper>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterForm);
