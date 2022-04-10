import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Alert} from 'react-bootstrap'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import CodingPaperService from "../services/CodingPaperService";


const AlertaNaoEncontrado = () => {
const [show, setShow] = useState(true);
  return (
    <div className="">
        
    <Alert variant="danger">
    <Alert.Heading>Nenhum registro encontrado</Alert.Heading>
    </Alert>

    </div>
  );
};
export default AlertaNaoEncontrado;