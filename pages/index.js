
import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom";
import Filetree from '../components/Filetree';
import axios from "axios";
const URL  = "http://127.0.0.1:5000/files"
import fyls from '../files.json'
//import Filetree from 'ftree4587'
export default function Home() {
  
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    getFiles()

    return ()=>{
      setFiles([])
    }

  }, [])

  useEffect(()=>{
    if (files){
      updateFiles(files);
    }
  }, [files])

  const updateFiles = (files) => {

    let fd = new FormData();
    fd.append('files', JSON.stringify(files))
    axios.post(URL,fd,{
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(r =>{
      console.log(r.data);
      //setFiles(r.data.files)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const getCurrentFile = (file)=>{
    console.log(file)
  }
  const getFiles = () =>{

    setFiles(fyls['files'])

    /*axios.get(URL).then(r =>{
      //console.log(r.data);
      setFiles(r.data.files)
    })
    .catch(err=>{
      console.log(err)
    })
*/
  }
  return (
    <Filetree files={files} getCurrentFile={getCurrentFile} setFiles={setFiles}/>
)
}
