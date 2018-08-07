import React from "react";
import Menu from "./Menu";
import PdfEditor from "./PdfEditor";
import TextBoxList from "./TextBoxList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onBoxCreate = this.onBoxCreate.bind(this);
    this.onBoxDelete = this.onBoxDelete.bind(this);
    this.onBoxUpdate = this.onBoxUpdate.bind(this);
    this.resetBoxState = this.resetBoxState.bind(this);

    this.state = { boxes: [] };
  }

  resetBoxState() {
    this.setState({boxes: []});
  }

  onBoxDelete(id) {
    this.setState(prevState => {
      return { boxes: prevState.boxes.filter(box => {
        return box.id !== id;
      })};
    });
  }

  onBoxCreate(box) {
    this.setState(prevState => {
      return { boxes: [...prevState.boxes, box] };
    });
  }

  onBoxUpdate(box) {
    this.setState(prevState => {
      return { boxes: prevState.boxes.map(prevBox => {
        return prevBox.id === box.id ? box : prevBox;
      })};
    })
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <PdfEditor resetBoxState={this.resetBoxState} 
                onBoxCreate={this.onBoxCreate} 
                boxes={this.state.boxes}/>
            </div>
            <div className="col">
              <TextBoxList boxes={this.state.boxes}
                onBoxUpdate={this.onBoxUpdate}
                onBoxDelete={this.onBoxDelete}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
