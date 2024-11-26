import { writeFile } from 'expo-file-system';
import { PDFDocument } from 'pdf-lib';
import { getMarcacoes } from '../database';

const gerarRelatorioPDF = async () => {
  const marcacoes = await new Promise((resolve) => {
    getMarcacoes((data) => resolve(data));
  });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
  const text = marcacoes.map((item, index) => `Dia: ${item.data} | Entrada: ${item.marca_entrada} | Saída: ${item.marca_saida}`).join('\n');

  page.drawText(text, { x: 50, y: 350, font });

  const pdfBytes = await pdfDoc.save();
  const uri = await writeFile('relatorio_jornada.pdf', pdfBytes);

  return uri;
};

export default gerarRelatorioPDF;
