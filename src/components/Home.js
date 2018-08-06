import React, { Component } from "react";
import Menu from "./Menu";
import PdfEditor from "./PdfEditor";
import TextBoxList from "./TextBoxList";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onBoxChange = this.onBoxChange.bind(this);
    this.resetBoxState = this.resetBoxState.bind(this);

    this.state = { boxes: [] };
  }

  resetBoxState() {
    this.setState({boxes: []});
  }

  onBoxChange(newBox) {
    this.setState(prevState => {
      let updatedBox = false;
      const newState = prevState.boxes.map(prevBox => {
        if (prevBox.id === newBox.id) {
          prevBox.key = newBox.key;
          updatedBox = true;
        }
        return prevBox;
      });

      if (!updatedBox) {
        newState.push(newBox);
      }

      return {
        boxes: newState
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
              <PdfEditor resetBoxState={this.resetBoxState} 
                onBoxChange={this.onBoxChange} 
                boxes={this.state.boxes}/>
            </div>
            <div className="col">
              <TextBoxList boxes={this.state.boxes}
                onBoxChange={this.onBoxChange}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
