import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

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

class CustomModal extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open || false}
          onClose={this.props.handleClose}
          title={this.props.title}
          body={this.props.body}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant="title"
              id="modal-title"
              align="center"
              gutterBottom
            >
              {this.props.title}
            </Typography>
            <Typography variant="body2">{this.props.body}</Typography>

            <CustomModalWrapped />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

CustomModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const CustomModalWrapped = withStyles(styles)(CustomModal);

export default CustomModalWrapped;
