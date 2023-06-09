import React,{ useRef, useState, useContext, useEffect,createContext} from "react";
import ReactDOM  from "react-dom";
import './Modal.css'
const ModalContext = React.createContext();

const ModalProvider = ({children})=>{
    const modalRef = useRef();
    const [value,setValue] = useState();

    useEffect(()=>{
        setValue(modalRef.current);
    },[]);

    return(
        <>
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
            <div className='modal-container'ref={modalRef}></div>
        </>
    )



}


export const Modal = ({onClose,children})=>{
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;
    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose}></div>
            <div id='modal-content'>{children}</div>
        </div>,modalNode
    );
}

export default ModalProvider;