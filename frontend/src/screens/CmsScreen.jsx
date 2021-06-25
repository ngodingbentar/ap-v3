import React, {Component} from 'react';
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
// import './App.css'
import stateToHTML from 'draftjs-to-html'
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import Axios from 'axios';
import UpImageComp from '../components/UpImageComp';


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

// const submit = async (e) => {
//   console.log('ec', e)
//   try{
//     const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
//     const result = await Axios.post(url);
//   }catch(err){
//     console.log(err)
//   }
// }

class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: 'titlee',
      banner: 'https://aruspinggir-bucket.s3.ap-southeast-1.amazonaws.com/1.PNG',
      categories: [],
      category: ''
    };
  }

  onEditorStateChange: Function = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  changeTitle: Function = (e) => {
    // console.log('eee',e)
    this.setState ({
      title: e,
    })
  };

  changeBanner: Function = (e) => {
    // console.log('eee',e)
    this.setState ({
      banner: e,
    })
  };

  setCategory: Function = (e) => {
    // console.log('eee',e)
    this.setState ({
      category: e,
    })
  };

  cek: Function = () => {
    // console.log('this.state.categories', this.state.categories)
    this.state.categories.map( (x) => (
      console.log(x.name)
    ))
  };

  getCategory: Function = async (e) => {
    try{
        const url = `https://vercel-be-v2.vercel.app/api/v1/category`
        const result = await Axios.get(`${url}`);
        // console.log('result', result)
        this.setState ({
          categories: result.data,
        })
      }catch(err){
        console.log(err)
      }
  };

  submit: Function = async (e) => {
    const newValues = {
      title: this.state.title,
      banner: this.state.banner,
      body: e,
      category: this.state.category
    }
    // console.log('newValues', newValues)
    try{
      const url = `https://vercel-be-v2.vercel.app/api/v1/blog`
      const result = await Axios.post(url, newValues);
      // console.log('result', result)
      if(result.status === 201){
        alert('berhasil')
      }
    }catch(err){
      console.log(err)
    }
  };

  componentDidMount(){
    this.getCategory()
  }


  render() {
    const { editorState } = this.state;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
 
    const markup = draftToHtml(
      rawContentState
    );

    return <div>
      <UpImageComp />
      <hr/>
      <div>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          onChange={(e) => this.changeTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="banner">banner</label>
        <input
          id="banner"
          type="text"
          placeholder="Enter banner"
          onChange={(e) => this.changeBanner(e.target.value)}
        ></input>
      </div>
      <div>
        {this.state.categories && (
          <div>
            <label htmlFor="category">Kategori</label>
            <select value={this.state.category} onChange={(e) => this.setCategory(e.target.value)}>
              <option>--Pilih Kategori--</option>
              {
                this.state.categories.map( (x) => (
                  <option key={x._id} value={ x.name}>{ x.name }</option>
                ))
              }
            </select>
          </div>
        )}
      </div>
      <hr/>
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
      
      {/* <p>{title}</p> */}
      <button onClick={()=> this.submit(markup)}>Submit</button>
      {/* <button onClick={()=> this.cek()}>cek</button>
      <button onClick={()=> console.log(markup)}>cek markup</button> */}
    </div>;
  }
}

export default Welcome