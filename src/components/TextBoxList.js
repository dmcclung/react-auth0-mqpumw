import React from "react";
import { saveAs } from "file-saver";
import TextBoxListItem from "./TextBoxListItem";

export default class TextBoxList extends React.Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);

        this.state = { edit: false };
    }

    toggleEditMode(event) {
        event.preventDefault();
        this.setState(prevState => {
            return {edit: !prevState.edit};
        });
    }

    download() {
        saveAs(new Blob([JSON.stringify(this.props.boxes)]), "download.json");
    }

    render() {
        const boxListItems = this.props.boxes.map((box) => {
            return <TextBoxListItem key={box.id} box={box} edit={this.state.edit} 
                        onBoxUpdate={this.props.onBoxUpdate}
                        onBoxDelete={this.props.onBoxDelete}/>;
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item">
                                {!this.state.edit &&  (
                                    <a href="edit" onClick={this.toggleEditMode}>Edit</a>
                                )}
                                {this.state.edit && (
                                    <a href="done" onClick={this.toggleEditMode}>Done</a>    
                                )}
                            </li>
                            {boxListItems}
                        </ul>
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