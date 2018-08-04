import React from "react";
import { saveAs } from "file-saver/FileSaver";

export default class OverlayViewer extends React.Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    download() {
        saveAs(new Blob([JSON.stringify(this.props.overlays)]), "download.json");
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <textarea value={JSON.stringify(this.props.overlays)}
                            readOnly="true">
                        </textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-secondary" onClick={this.download}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}