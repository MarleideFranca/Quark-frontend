import React,  { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from "../components/Navbar";
import LogoMenu from "../components/LogoMenu";
import PublishBtn from '../components/Buttons/Publish';
import BackBtn from '../components/Buttons/Back';
import { ReactComponent } from '../icons/back.svg';

import Breadcrumbs from "../components/Breadcrumbs";
import BCLink from "../components/Breadcrumbs/Link";

import Box from "../components/Box";
import Form from "../components/Form";
import MainTitle from "../components/Title/MainTitle";
import SaveButton from "../components/Buttons/Save";

import PathInput from "../components/Form/PathInput";
import DescriptionText from "../components/Form/TextArea";
import BoxInputColor from "../components/Form/BoxInputColor";
import AddContBtn from "../components/Buttons/AddContent";

import BoxFileInput from "../components/Form/BoxFileInput";
import FileName from "../components/Form/FileName";
import LabelInputFile from "../components/Form/LabelInputFile";
import InputFile from "../components/Form/InputFile";
import addAudio from "../icons/add_audio.svg";
import addVideo from "../icons/add_video.svg";

import { API_URL } from '../conts';


function CreateContents() {
  const [ video, setVideo ] = useState();
  const [ audio, setAudio ] = useState();
  const [ text, setText ] = useState();

  const params = useParams();
  const navigate = useNavigate();

  const handleFileInputChange = (event) => {
    const files = event.currentTarget.files
    
    if (files.length) {
      const file = files[0]

      if (event.currentTarget.name === 'video') setVideo(file)
      if (event.currentTarget.name === 'audio') setAudio(file)

    }
  }

  const handleButtonClick = (event) => {
    event.preventDefault()

    const formData = new FormData()

    if (video) formData.append('video', video)
    if (audio) formData.append('audio', audio)
    if (text) formData.append('text', text)

    axios.post(`${API_URL}/createContent/${params.methodsId}`, formData)
      .then((response) => {
        navigate(`/conteudos/${params.methodsId}`)
      })
      .catch((error) => {
        navigate(`/adicionarconteudo/${params.methodsId}`)
      })
  }

  return (
    <>
      <Navbar>
        <BackBtn href="javascript:javascript:history.go(-1)">
          <ReactComponent />
        </BackBtn>
        
        <LogoMenu href="/skill"></LogoMenu>

        <PublishBtn href="/publicar" className="oculto">Publish</PublishBtn>
      </Navbar>
      
      <Box>
        <Breadcrumbs>
          <BCLink to={'/skill'}> Skills </BCLink>
          <BCLink to={`/topicos/:skillId`} >Inteligência Emocional</BCLink>
          <BCLink to={`/subtopicos/:topicsId`} >Introdução</BCLink>
          <BCLink to={`/objetosaprendizagem/:subtopicsId`}>O que vamos tratar no módulo?</BCLink>
          <BCLink to={`/conteudos/:methodsId`}>O que vamos falar nesse módulo?</BCLink>
          <BCLink to="#">Adicionar conteúdos</BCLink>
        </Breadcrumbs>

        <Form>

          <MainTitle>Adicionar conteúdos</MainTitle>
          
          <BoxFileInput>
            <FileName id="nomeArquivoVideo" placeholder="Adicionar Vídeo" disabled/>
            <LabelInputFile for="arquivoVideo">
              <img src={addVideo} />
            </LabelInputFile>
            <InputFile name="video" type="file" id="arquivoVideo" onChange={handleFileInputChange} value={video}  accept="video/mp4" />
          </BoxFileInput>

          <BoxFileInput>
            <FileName id="nomeArquivoAudio" placeholder="Adicionar Áudio" disabled/>
            <LabelInputFile for="arquivoAudio">
              <img src={addAudio} />
            </LabelInputFile>
            <InputFile name="audio" type="file" id="arquivoAudio" onChange={handleFileInputChange} value={audio} accept="audio/mp3" />
          </BoxFileInput>

          <DescriptionText placeholder="Adicionar Text" onChange={event => setText(event.currentTarget.value)} value={text} />
          <SaveButton type="Submit" onClick={handleButtonClick}>Save</SaveButton>

        </Form>        
      </Box>
    </>
  );
}

export default CreateContents;