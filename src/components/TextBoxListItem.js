import React from "react";

export default class TextBoxListItem extends React.Component {
    //TODO: when a box is edited, call this.props.onBoxChange

    render(props) {
        const listItemContent = this.props.edit?
            <div className="form-group">
                <label for="boxKey-">Key</label>
                <input type="text" 
                    className="form-control" 
                    id="boxKey-" 
                    aria-describedby="boxKey" 
                    placeholder="Data column key"/>
            </div>:
            `Key: ${this.props.box.key}`;

        return <li className="list-group-item">{listItemContent}</li>;
    }
}