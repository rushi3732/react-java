const GeneratePDF = (contentRef) => {
  console.log("contentRef.current", contentRef.current);
  const clonedContent = contentRef.current.cloneNode(true);

  const printStyles = `
      body {
        font-family: Arial, sans-serif;
      }

      @media screen {
        #pdfContent {
          display: none !important;
        }
      }

      @media print {
        body * {
          visibility: hidden;
          overflow: hidden;
          height: 0px;
        }
        #pdfContent, #pdfContent * {
          visibility: visible;
          height: auto;
        }
      }
    `;

  const style = document.createElement("style");
  style.innerHTML = printStyles;
  clonedContent.id = "pdfContent";
  document.body.appendChild(style);
  document.body.appendChild(clonedContent);
  window.print();
  document.body.removeChild(style);
  document.body.removeChild(clonedContent);
};

export default GeneratePDF;
