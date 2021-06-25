import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { createNewProduct } from '../actions/productActions';

import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import stateToHTML from 'draftjs-to-html'
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';


export default function CreateScreen(props) {
  const [name, setName] = useState('');
  const [editorState, setEditorState] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [weight, setWeight] = useState('');
  const [numberOfPage, setNumberOfPage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isRecomendation, setIsRecomendation] = useState(false);
  const [isPacket, setIsPacket] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const productCreateNew = useSelector((state) => state.productCreateNew);
  const { error, success } = productCreateNew;

  const dispatch = useDispatch();
  const submitHandler = () => {
    console.log('name', name)
  };

  // useEffect(() => {
  //   if (success) {
  //     setCreateLoading(false)
  //     props.history.push("/all-product");
  //   }
  // }, [props.history, success]);

  const onEditorStateChange = () => {
    setEditorState(editorState)
  };

  const rawContentState = convertToRaw(editorState.getCurrentContent());
 
    const markup = draftToHtml(
      rawContentState
    );


  return (
    <div>
        {/* {loading && <LoadingBox></LoadingBox>} */}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div className="form">
        <div>
          <h3>Tambah Produk</h3>
        </div>
        <div>
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}    
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
          />
          <button onClick={()=> console.log(markup)}>cek</button>
        </div>
        <div>
          <label />
          <button onClick={()=>submitHandler()} className="primary text-white" type="submit" style={{maxWidth: 200}}>
            <b>Tambah Produk</b>
          </button>
          {createLoading && (
            <LoadingBox></LoadingBox>
          )}
        </div>
      </div>
    </div>
  );
}
