import React from "react";
import ReactLoading from "react-loading";
import ReactModal from "react-modal";

ReactModal.setAppElement(document.getElementById("root"));

export default function ProgressModal(props) {
  return (
    <React.Fragment>
      <ReactModal
        isOpen={props.isOpen}
        className="Modal"
        hintText={props.hintText}
        overlayClassName="Overlay"
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "20%",
            fontSize: "1.2rem"
          }}
        >
          <div style={{ margin: "10px auto", top: "25%" }}>
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
          <p>{props.hintText}</p>
        </div>
      </ReactModal>
    </React.Fragment>
  );
}
