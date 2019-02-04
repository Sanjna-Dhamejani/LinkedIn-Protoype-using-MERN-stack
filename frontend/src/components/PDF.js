import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
// import myPDF from './cmpe_255.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
 
class PDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    console.log(" - - - - - - - - - - - - - - ");
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <br></br>
        <Document
          // file= "https://user-images-linkedin2.s3.us-east-2.amazonaws.com/Design%20Thinking.pdf"
          // file = {myPDF}
          // file = `${ROOT_URL}/uploads/HonestyPledge.pdf`
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}
export default PDF