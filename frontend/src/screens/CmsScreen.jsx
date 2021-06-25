import React, {Component} from 'react';
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
// import './App.css'
import stateToHTML from 'draftjs-to-html'
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import Axios from 'axios';

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader(`Authorization', 'Client-ID 6eb302ea5c15649`);
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error)
        reject(error);
      });
    }
  );
}

// function changeTitle(e) {
//   console.log('es', e)
//   console.log('this.state', this.state)
// }

const submit = async (e) => {
  console.log('ec', e)
  // try{
  //   const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
  //   const result = await Axios.post(url);
  // }catch(err){
  //   console.log(err)
  // }
}

class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: 'titlee'
    };
  }

  onEditorStateChange: Function = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  changeTitle: Function = (e) => {
    console.log('eee',e)
    this.setState ({
      title: e,
    })
  };
  render() {
    const { editorState, title } = this.state;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
 
    const markup = draftToHtml(
      rawContentState
    );

    return <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}    
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
      <div>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="title"
          placeholder="Enter title"
          onChange={(e) => this.changeTitle(e.target.value)}
        ></input>
      </div>
      <p>{title}</p>
      {/* <button onClick={()=> submit(markup)}>cek</button> */}
      <button onClick={()=> console.log(this.state)}>cek</button>
    </div>;
  }
}

export default Welcome