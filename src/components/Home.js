import React, { Component } from "react";
import Menu from "./Menu";
import PdfEditor from "./PdfEditor";
import OverlayViewer from "./OverlayViewer";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <PdfEditor />
            </div>
            <div className="col">
              <OverlayViewer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
