import React from "react";

export default class OverlayViewer extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <textarea />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-secondary">Download</button>
                    </div>
                </div>
            </div>
        );
    }
}