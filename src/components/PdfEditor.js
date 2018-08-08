import React from "react";
import * as pdfjs from "pdfjs-dist";
import { saveAs } from "file-saver"; 
import * as uuid from "uuid/v4";

export default class PdfEditor extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.canvas = React.createRef();
    this.canvasBoxes = React.createRef();

    this.selectPdf = this.selectPdf.bind(this);
    this.load = this.load.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.preview = this.preview.bind(this);

    this.state = { mouseDown: {}, scale: 1.0, pdf: undefined, currentPage: 1 };
  }

  componentDidUpdate() {
    this.renderBoxes();
  }

  renderBoxes() {
    const canvas = this.canvasBoxes.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.props.boxes.forEach(box => {
      if (box.page === this.state.currentPage) {
        ctx.strokeStyle = box.active ? "green" : "red";
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      }
    });
  }

  preview() {
    this.canvas.current.toBlob(blob => {
      saveAs(blob, "download.png");
    });
  }

  zoom(factor) {
    if (this.state.scale + factor < 1) {
      return;
    }

    this.setState(prevState => {
      return { scale: prevState.scale + factor };
    }, () => {
      this.renderPdf();
    });
  }

  changePage(inc) {
    if (this.state.currentPage + inc > this.state.pdf.numPages ||
        this.state.currentPage + inc < 1) {
      return;
    }

    this.setState(prevState => {
      return { currentPage: prevState.currentPage + inc };
    }, () => {
      this.renderPdf();
    });
  }

  calculateBox(x1, y1, x2, y2) {
    const width = Math.abs(x1 - x2);
    const height = Math.abs(y1 - y2);
    const x = x1 < x2 ? x1 : x2;
    const y = y1 < y2 ? y1 : y2;

    return { x: x, y: y, width: width, height: height };  
  }

  handleMouseMove(event) {
    if (Object.keys(this.state.mouseDown).length !== 0 && 
        this.state.pdf !== undefined) {
      this.renderBoxes();
      const canvas = this.canvasBoxes.current;
      const ctx = canvas.getContext("2d");
      const mouse = this.mouseLocation(canvas, event);
      const box = this.calculateBox(mouse.x, mouse.y, 
        this.state.mouseDown.x, this.state.mouseDown.y);
      ctx.strokeStyle = "red";
      ctx.strokeRect(box.x, box.y, box.width, box.height);
    }
  }

  mouseLocation(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {x: event.clientX - rect.left, y: event.clientY - rect.top};
  }

  handleMouseDown(event) {
    const mouse = this.mouseLocation(this.canvasBoxes.current, event);
    this.setState({ mouseDown: {x: mouse.x, y: mouse.y }});
  }

  handleMouseUp(event) {
    const mouse = this.mouseLocation(this.canvasBoxes.current, event);
    if (mouse.x === this.state.mouseDown.x ||
        mouse.y === this.state.mouseDown.y) {
          this.setState({ mouseDown: {} });
          return;
    }

    const box = this.calculateBox(mouse.x, mouse.y,
      this.state.mouseDown.x, this.state.mouseDown.y);

    //TODO: consider modal dialog here for key
    box.key = "None";
    box.active = false;
    box.page = this.state.currentPage;
    box.scale = this.state.scale;
    box.id = uuid();

    this.props.onBoxCreate(box);

    this.setState({ mouseDown: {} });
  }

  renderPdf() {
    const page = this.state.currentPage;
    const pdf = this.state.pdf;
    const scale = this.state.scale;

    pdf.getPage(page).then((page) => {
      const viewport = page.getViewport(scale);

      let context = this.canvas.current.getContext("2d");
      this.canvas.current.height = viewport.height;
      this.canvas.current.width = viewport.width;

      this.canvasBoxes.current.height = viewport.height;
      this.canvasBoxes.current.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);

      this.forceUpdate();
    });
  }

  selectPdf(event) {
    let file = this.fileInput.current.files[0];
    if (file) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        pdfjs.getDocument(fileReader.result).then((pdf) => {
          this.setState({pdf: pdf, currentPage: 1});
          this.renderPdf();
        });
      };

      fileReader.readAsDataURL(file);
    }
  }

  load(event) {
    this.fileInput.current.click();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-auto">
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar">
              <div className="btn-group mr-2" role="group" aria-label="Preview">
                <button className="btn btn-secondary" onClick={this.preview}>
                  Preview
                </button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Reset">
                <button className="btn btn-secondary" onClick={this.props.resetBoxState}>
                  Reset
                </button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Load">
                <button className="btn btn-secondary" onClick={this.load}>
                  Load
                </button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Zoom">
                <button className="btn btn-secondary" onClick={ (e) => this.zoom(0.25) }>
                  +
                </button>
                <button className="btn btn-secondary" onClick={ (e) => this.zoom(-0.25) }>
                  -
                </button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Navigation">
                <button className="btn btn-secondary" onClick={ (e) => this.changePage(1) }>
                  Next
                </button>
                <button className="btn btn-secondary" onClick={ (e) => this.changePage(-1) }>
                  Prev
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div style={{width: "612px", height: "792px"}}>
              <canvas className="position-absolute"
                      ref={this.canvas}/>
              <canvas className="position-absolute"
                      ref={this.canvasBoxes} 
                      onMouseDown={this.handleMouseDown}
                      onMouseUp={this.handleMouseUp} 
                      onMouseMove={this.handleMouseMove}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input type="file" ref={this.fileInput} accept="application/pdf" style={{"display": "none"}} onChange={this.selectPdf} />
          </div>
        </div>
      </div>
    );
  }
}
