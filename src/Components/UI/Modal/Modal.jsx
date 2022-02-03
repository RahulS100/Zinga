import React, {Fragment} from 'react';
import { createPortal } from 'react-dom';

//----------------------------CSS------------------------------
import classes from './Modal.module.css';

//-------------------Backdrop Component-------------------------
function Backdrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.hideCart} >
        </div>
    )
}

//------------------------ModalOverlay Component------------------
function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    )
}

//---------------------------Main Model Component-------------------
export default function Modal(props) {

    let Overlay = document.getElementById("overlay");

    return (
        <Fragment>
        {createPortal(<Backdrop hideCart={props.hideCart} />, Overlay)}
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, Overlay)}
        </Fragment>
    )
}

