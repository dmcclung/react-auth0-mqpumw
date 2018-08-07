import React from "react";

export default class TextBoxListItem extends React.Component {
    constructor(props) {
        super(props);

        this.keyInput = React.createRef();

        this.toggleEditKey = this.toggleEditKey.bind(this);
        this.deleteKey = this.deleteKey.bind(this);
        this.saveKey = this.saveKey.bind(this);

        this.state = { editKey: false };
    }

    toggleEditKey(event) {
        event.preventDefault();
        this.setState(prevState => {
            return { editKey: !prevState.editKey };
        });
    }

    saveKey(event) {
        event.preventDefault();
        const key = this.keyInput.current.value;
        // TODO: Need validation here?
        const box = {...this.props.box};
        box["key"] = key;

        this.props.onBoxUpdate(box);
        this.setState({editKey: false});
    }

    deleteKey(event) {
        event.preventDefault();
        this.props.onBoxDelete(this.props.box.id);
    }

    render(props) {
        return (<li className="list-group-item">
                    {this.props.edit && this.state.editKey && (
                        <form>
                            <div className="form-group">
                                <label>Key</label>
                                <input type="text" 
                                    ref={this.keyInput}
                                    className="form-control" 
                                    aria-describedby="boxKey" 
                                    placeholder="Data column key"/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.saveKey}>Save</button>
                        </form>
                    )}
                    {this.props.edit && !this.state.editKey && (
                        <div>Key: {this.props.box.key} 
                            <a href="editKey" onClick={this.toggleEditKey}>Edit Key</a>
                            <a href="deleteKey" onClick={this.deleteKey}>Delete Key</a>
                        </div>    
                    )}
                    {!this.props.edit && (
                        `Key: ${this.props.box.key}`
                    )}
                </li>);
    }
}