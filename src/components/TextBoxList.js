import React from "react";
import TextBoxListItem from "./TextBoxListItem";

export default class TextBoxList extends React.Component {
    constructor(props) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);

        this.state = { edit: false };
    }

    toggleEditMode(event) {
        event.preventDefault();
        this.setState(prevState => {
            return {edit: !prevState.edit};
        });
    }

    render() {
        const boxListItems = this.props.boxes.map((box) => {
            return <TextBoxListItem key={box.id} box={box} edit={this.state.edit} 
                        onBoxUpdate={this.props.onBoxUpdate}
                        onBoxDelete={this.props.onBoxDelete}
                        onBoxSelect={this.props.onBoxSelect}/>;
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
            </div>
        );
    }
}