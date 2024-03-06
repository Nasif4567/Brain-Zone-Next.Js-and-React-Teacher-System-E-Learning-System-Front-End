import React from 'react';

function PDFViewer({ pdfURL }) {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <object
        style={{ width: '100%', height: '100%' }}
        data={pdfURL}
        type="application/pdf"
      >
       
        <p>It appears your browser doesn't support PDF embedding, you can download the PDF file <a href={pdfURL}>here</a>.</p>
      </object>
    </div>
  );
}

export default PDFViewer;






