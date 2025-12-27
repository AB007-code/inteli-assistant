const pdfParse = require("pdf-parse");

exports.extractText = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};
