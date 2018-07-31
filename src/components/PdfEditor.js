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
            const scale = 1.5;
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
      <div>
        <a className="btn btn-success">
          Preview
        </a>
        <a className="btn btn-success">
          Reset
        </a>
        <a className="btn btn-success" onClick={this.load}>
          Load
        </a>
        <input type="file" ref={this.fileInput} accept="application/pdf" style={{"display": "none"}} onChange={this.selectPdf} />
        <canvas ref={this.canvas} />
      </div>
    );
  }
}
