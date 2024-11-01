import { Injectable } from '@nestjs/common';
import { PDFDocument, rgb } from 'pdf-lib';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import * as fontkit from '@pdf-lib/fontkit';
import modifyNum from 'utils/modifyAmount';
import { ROOT_PATH } from 'src/config/paths.config';

/**
 * generate ticket provider class
 */
@Injectable()
export class GenerateTicketPdfProvider {
  /**
   * Generates a PDF ticket with a barcode
   */
  public async generateTicketPDF(ticketData: {
    id: string;
    type: string;
    eventName: string;
    amount: number;
  }) {
    const { id, type, eventName, amount } = ticketData;

    const pdfDoc = await PDFDocument.create();

    // Register fontkit
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([600, 800]);

    // Load the custom font (OpenSans-Regular.ttf)
    const fontPath = path.join(
      ROOT_PATH,
      '/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf',
    );
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);

    page.setFont(customFont);
    // Colors
    const primaryColor = rgb(0.5137, 0.2588, 1.0);
    const secondaryColor = rgb(0.2, 0.2, 0.2);
    // const accentColor = rgb(0.8, 0.3, 0.1);

    // Draw background and border
    page.drawRectangle({
      x: 50,
      y: 150,
      width: 500,
      height: 500,
      borderColor: primaryColor,
      borderWidth: 2,
      color: rgb(0.95, 0.95, 0.95),
    });

    // Draw header strip
    page.drawRectangle({
      x: 50,
      y: 600,
      width: 500,
      height: 50,
      color: primaryColor,
    });

    // Draw title
    page.drawText(`${eventName} Ticket`.toLocaleUpperCase(), {
      x: 100,
      y: 615,
      size: 25,
      color: rgb(1, 1, 1),
    });

    // Event Details Section
    const startY = 550;
    const labelX = 80;
    const valueX = 200;
    const lineSpacing = 40;

    // Labels
    page.drawText('Event:', {
      x: labelX,
      y: startY,
      size: 16,
      color: secondaryColor,
    });

    page.drawText('Type:', {
      x: labelX,
      y: startY - lineSpacing,
      size: 16,
      color: secondaryColor,
    });

    page.drawText('Amount:', {
      x: labelX,
      y: startY - lineSpacing * 2,
      size: 16,
      color: secondaryColor,
    });

    page.drawText('Ticket ID:', {
      x: labelX,
      y: startY - lineSpacing * 3,
      size: 16,
      color: secondaryColor,
    });

    // Values
    page.drawText(eventName, {
      x: valueX,
      y: startY,
      size: 16,
      color: primaryColor,
    });

    page.drawText(type, {
      x: valueX,
      y: startY - lineSpacing,
      size: 16,
      color: primaryColor,
    });

    page.drawText(`N ${modifyNum(String(amount))}`, {
      x: valueX,
      y: startY - lineSpacing * 2,
      size: 16,
      color: primaryColor,
    });

    page.drawText(id, {
      x: valueX,
      y: startY - lineSpacing * 3,
      size: 16,
      color: primaryColor,
    });

    // Add dotted line separator
    const dots = '• '.repeat(40);
    page.drawText(dots, {
      x: 70,
      y: 380,
      size: 10,
      color: rgb(0.7, 0.7, 0.7),
    });

    // QR Code
    const qrCodeImage = await this.generateQRCode(id);
    const qrCodeImageEmbed = await pdfDoc.embedPng(qrCodeImage);
    page.drawImage(qrCodeImageEmbed, {
      x: 200,
      y: 180,
      width: 150,
      height: 150,
    });

    // Footer
    const currentDate = new Date().toLocaleDateString();
    page.drawText(`Generated on ${currentDate}`, {
      x: 70,
      y: 170,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  /**
   * function for generating QR code for the ticket
   * @param ticketId
   * @returns qrcode
   */
  private async generateQRCode(ticketId: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      QRCode.toBuffer(
        `http://localhost:3000/api/v1/tickets?${ticketId}`,
        { type: 'png' },
        (err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        },
      );
    });
  }
}
