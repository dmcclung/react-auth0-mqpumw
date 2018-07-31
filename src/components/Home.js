import React, { Component } from "react";
import Menu from "./Menu";
import PdfEditor from "./PdfEditor";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <PdfEditor />
      </div>
    )
  }
}
