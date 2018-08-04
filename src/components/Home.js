import React, { Component } from "react";
import Menu from "./Menu";
import PdfEditor from "./PdfEditor";
import OverlayViewer from "./OverlayViewer";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onOverlayChange = this.onOverlayChange.bind(this);
    this.resetOverlayState = this.resetOverlayState.bind(this);

    this.state = { overlays: [] };
  }

  resetOverlayState() {
    this.setState({overlays: []});
  }

  onOverlayChange(overlay) {
    this.setState(prevState => {
      return {
        overlays: [...prevState.overlays, overlay ]
      };
    });
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <PdfEditor resetOverlayState={this.resetOverlayState} 
                onOverlayChange={this.onOverlayChange} />
            </div>
            <div className="col">
              <OverlayViewer overlays={this.state.overlays} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
