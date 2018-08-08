import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function fillPdf(pdf, boxes, data) {
    data.forEach(datum => {
        const newPdf = new jsPDF();
        [...Array(pdf.getNumPages())].keys.forEach(pageNum => {
            pdf.getPage(pageNum).then(page => {
                const viewport = page.getViewport(1.0);
                const canvas = new HTMLCanvasElement();
                let canvasContext = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
        
                const renderContext = {
                    canvasContext: canvasContext,
                    viewport: viewport
                };

                page.render(renderContext);
        
                canvasContext.fillStyle = "black";
                canvasContext.lineWidth = 1;

                //TODO: Measure the text selected
                // Given the box size, fill the box area

                boxes.forEach(box => {
                    if (box.page === pageNum) {
                        canvasContext.fillText(datum.get(box.key), 
                            box.x, box.y, box.width);
                    }
                });
                newPdf.addImage(canvas.toDataURL());
                newPdf.addPage();
            });
        });

        saveAs(newPdf.toDataURL(), "download.pdf");
    });
}
    

