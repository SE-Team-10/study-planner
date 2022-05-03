import "../../App.css";
import axios from 'axios';
import React,{Component} from 'react';
import fileDownload from 'js-file-download';
const currentUser = "admin";

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  };

  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({file: event.target.files[0]})
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    //Object to store and pass file data
    const fileEdit = new File([this.state.file], currentUser+'.json')
    const formData = new FormData();
    formData.append("file", fileEdit);
    formData.append("fileName", currentUser);
    // Details of the uploaded file
    console.log(fileEdit);
    // Send formData object
    axios.post('http://localhost:5000/api-upload', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      }
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  onFileDownload = async () => {
    //Request file with the name of currently logged in user
    await fetch('http://localhost:5000/api-download/'+currentUser, {
    responseType: 'blob',})
    //Prompt download of recieved file
    .then((res) => {fileDownload(res.data, currentUser+".json")})
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.file) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.file.name}</p>
          <p>File Type: {this.state.file.type}</p>
          <p>
            {/*Last Modified:{" "}*/}
            {/*{this.state.file.lastModifiedDate.toDateString()}*/}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose file before pressing the uploading</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
          <h1>Planner File Upload</h1>
          <h3>Please upload json file provided by HUB or newer</h3>
          <div>
              <input type="file" onChange={this.onFileChange} accept=".json"/>
              <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          <div>
          </div>
        {this.fileData()}
        <div>
          <h1>Download Planner File</h1>
          <div>
            <button onClick={this.onFileDownload}>Download</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
