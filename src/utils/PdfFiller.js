import jsPDF from "jspdf";
import Papa from "papaparse";

function parseDataFile(csv) {
    return new Promise((resolve, reject) => {
        Papa.parse(csv, { 
            header: true, 
            complete: resolve,
            error: reject
        });
    });
}

function getRenderContext(page) {
    const viewport = page.getViewport(1.0);

    const canvas = document.createElement("canvas");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    let canvasContext = canvas.getContext("2d");
    
    return {
        canvasContext: canvasContext,
        viewport: viewport,
        canvas: canvas
    };
}

async function populatePdfTemplate(pdf, boxes, datum) {
    const newPdf = new jsPDF("portrait", "px", "letter");

    const pageNums = Array(pdf.numPages).fill().map( (x, i) => i + 1 );
    for (const pageNum of pageNums) {
        const page = await pdf.getPage(pageNum);
        const renderContext = getRenderContext(page);
        
        await page.render(renderContext);

        renderContext.canvasContext.fillStyle = "black";
        renderContext.canvasContext.lineWidth = 1;

        //TODO: Measure the text selected
        boxes.forEach(box => {
            if (box.page === pageNum) {
                renderContext.canvasContext.fillText(
                    datum[box.key], box.x, box.y, box.width);
            }
        });

        newPdf.addImage(renderContext.canvas.toDataURL("image/png", 1.0), 
            "image/png", 0, 0);
        
        if (!(pageNum + 1 > pdf.numPages)) {
            newPdf.addPage();
        }    
    }
    return newPdf;
}

export default function fillTextBoxes(pdf, boxes, csv) {
    parseDataFile(csv).then(parseResult => {
        parseResult.data.forEach(datum => {
            populatePdfTemplate(pdf, boxes, datum).then(popPdf => {
                popPdf.save("download.pdf");
            });
        });
    });
}
