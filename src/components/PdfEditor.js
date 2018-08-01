import React from "react";
import * as pdfjs from "pdfjs-dist";

export default class PdfEditor extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.canvas = React.createRef();

    this.selectPdf = this.selectPdf.bind(this);
    this.load = this.load.bind(this);
  }

  selectPdf(event) {
    let file = this.fileInput.current.files[0];
    if (file) {

      let fileReader = new FileReader();

      fileReader.onload = () => {
        pdfjs.getDocument(fileReader.result).then((pdf) => {
          pdf.getPage(1).then((page) => {
            const scale = 0.75;
            const viewport = page.getViewport(scale);

            let context = this.canvas.current.getContext("2d");
            this.canvas.current.height = viewport.height;
            this.canvas.current.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
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
          <div className="col-md-auto">
            <button className="btn btn-secondary">
              Preview
            </button>
          </div>
          <div className="col-md-auto">
            <button className="btn btn-secondary">
              Reset
            </button>
          </div>
          <div className="col-md-auto">
            <button className="btn btn-secondary" onClick={this.load}>
              Load
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <canvas ref={this.canvas} />
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
