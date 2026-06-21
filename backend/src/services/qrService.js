const QRCode = require('qrcode');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class QrService {
  async generate(data) {
    const qrDir = path.join(__dirname, '../../uploads/qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    const filename = `${uuidv4()}.png`;
    const filePath = path.join(qrDir, filename);

    await QRCode.toFile(filePath, JSON.stringify(data), {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    return `/uploads/qrcodes/${filename}`;
  }
}

module.exports = new QrService();
