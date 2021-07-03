import fs from 'fs';
import { openPdf, Reader } from './open';
import { PDFDocument } from 'src/index';

(async () => {
  // Case 2 - Using PDFWriter
  const pdfDoc = await PDFDocument.create({});
  const page = pdfDoc.addPage();
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 100,
    y: 100,
  });
  const maskPII = (text: string) => {
    return text.replace('JavaScript', 'REPLACEDDDD');
  };

  pdfDoc.maskPII(maskPII);

  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
  fs.writeFileSync('out.pdf', pdfBytes);
  openPdf('out.pdf', Reader.Preview);
})();
