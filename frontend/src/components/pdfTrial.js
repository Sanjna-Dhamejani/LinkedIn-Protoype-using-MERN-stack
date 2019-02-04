import React, { Component } from 'react';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import { Document, Page, setOptions } from 'react-pdf/build/entry.noworker'

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// import '../styles/jobposting.css'
import pdffile from '../assets/pdfs/HonestyPledge.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class pdfTrial extends Component{

    constructor(props){
        super(props);
        this.state={
            numPages: null,
            pageNumber : 1
        }

        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("Inside onDocumentLoadSuccess method");
        this.setState({ numPages });
      };

    render() {
        require('../styles/jobposting.css');

        const { pageNumber, numPages } = this.state;
        
        return (
            <div>
                <center>
                    <br></br>
                    <h3>Resume : </h3>
                    <Document
                        file = {pdffile}
                        // file = "https://user-images-linkedin2.s3.us-east-2.amazonaws.com/Design%20Thinking.pdf"
                        onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                        loading = "Please wait, the pdf is still loading"
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                </center>
            </div>
        );
    }

}

export default pdfTrial;