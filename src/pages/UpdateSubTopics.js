import React,  { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Navbar from "../components/Navbar";
import LogoMenu from "../components/LogoMenu";
import PublicarBtn from '../components/Buttons/Publicar';

import BackBtn from '../components/Buttons/Back';
import backIcon from '../icons/back.svg';
import TooltipBack from "../components/Tooltip/TooltipBack";

import Breadcrumbs from "../components/Breadcrumbs";
import BCLink from "../components/Breadcrumbs/Link";

import Caixa from "../components/Caixa";
import Form from "../components/Form";
import Titulo1 from "../components/Titulos/Titulo1";
import SaveButton from "../components/Buttons/Save";
import Input from "../components/Form/Input";

function UpdateSubTopics() {

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [ title, setTitle ] = useState(location.state.title);
  const [ order, setOrder ] = useState(location.state.order);

  const updateSubTopicsSubmmit = (event) => {
    event.preventDefault()
 
    axios.put(`http://localhost:80/updateSubTopics/${params.id}`, {
        title: title,
        order: order,
         })
         .then((response) => {
             navigate(`/subtopicos/${params.id}`)
         })
         .catch((error) => {
             navigate(`/editarsubtopico/${params.id}`)
         })
  }
  return (
    <>
      <Navbar>
        <BackBtn href="javascript:history.back()">
          <img src={backIcon}/>
          <TooltipBack className="tooltip">Voltar</TooltipBack>
        </BackBtn>
        
        <LogoMenu href="/skill"></LogoMenu>

        <PublicarBtn href="/publicar" className="oculto">Publicar</PublicarBtn>
      </Navbar>
      
      <Caixa>
        <Breadcrumbs>
          <BCLink to={'/skill'}> Skills </BCLink>
          <BCLink to={`/topicos/:skillId`}> Inteligência Emocional </BCLink>
          <BCLink to={`/subtopicos/:topicsId`} >Introdução</BCLink>
          <BCLink>Editar subtópico</BCLink>
        </Breadcrumbs>

        <Form onSubmit={updateSubTopicsSubmmit}  >
          <Titulo1>Editar Subtópico</Titulo1>

          <Input  onChange={event => setTitle(event.currentTarget.value)} value={title}  />
          <Input  type="number" onChange={event => setOrder(event.currentTarget.value)} value={order} />
          <SaveButton type="Submit">Save</SaveButton>
          
        </Form>        
      </Caixa>
    </>
  );
}

export default UpdateSubTopics;