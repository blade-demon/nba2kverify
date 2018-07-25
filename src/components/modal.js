import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import ReactLoading from "react-loading";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing.unit * 6
  },

  paperSmallDevice: {
    position: "absolute",
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing.unit * 6
  }
});

class SimpleModal extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open || false}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant="title"
              id="modal-title"
              align="center"
              gutterBottom
            >
              隐私政策
            </Typography>
            <Typography variant="body2">
              上海星游纪信息技术有限公司重视您的隐私。本《隐私政策》就您向我们提供的任何数据，告知您所拥有的选择和我们处理该等数据的常规。
              使用我们的服务可能涉及在我们的服务（包括我们的网站和流动应用）收集和使用您的数据（在下文「我们所收集的数据及如何收集数据」有所定义）。明白我们如何收集和使用您的数据、您可如何控制收集和使用程序对您是很重要的，因此请仔细阅读本《隐私政策》。
              您使用我们的服务，即表示同意我们可按照本《隐私政策》（按不时修订）收集、使用和分享您的数据。
              请注意，为让我们的用户有较佳体验、改善我们的服务、以及为您同意的其他用途，透过我们其中一项服务所收集的个人资料，在不违反用户隐私监控（如有）的前提下，可用于我们的其他服务（包括以汇集或个人化的方式）。
            </Typography>

            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
