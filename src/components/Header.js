import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  link: {
    textDecoration: "none",
    fontSize: "0.8rem",
    padding: "1rem",
    color: "white"
  },
  flex: {
    flexGrow: 1
  }
};

function Header(props) {
  const { classes } = props;

  return (
    <div className="wrapper__header">
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to bottom,#000000,#000000 45px) #4f0000"
        }}
      >
        <Toolbar>
          <Typography variant="title" className={classes.flex}>
            <img
              src="https://gamepochblobstorage.blob.core.windows.net/images/NBA2K19/nba2k19_logo_L_2.png"
              style={{ width: "200px" }}
              alt=""
            />
          </Typography>
          <Typography variant="title" align="right" style={{ float: "right" }}>
            <a
              className={classes.link}
              href="http://www.gamepoch.com"
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);
