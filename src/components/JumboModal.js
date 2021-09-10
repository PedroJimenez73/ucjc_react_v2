import React, { useState, useRef, useEffect } from 'react';

const JumboModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const overlayRef = useRef();
    
    const handleToggleModal = (event) => {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            setIsModalOpen(prev => !prev);
        }
    }

    useEffect(() => {
        if(isModalOpen) {
            overlayRef.current.style.opacity = 1;
        } else {
            overlayRef.current.style.opacity = 0;
        }
    }, [isModalOpen])

    return(
      <>
        <button className="m-b" style={{margin: '1rem auto', display: 'block'}} onClick={handleToggleModal}>{props.buttonText}</button>
        <span ref={overlayRef} className={isModalOpen ? 'overlay open' : 'overlay'} onClick={handleToggleModal}>
            <span className="modal jumbo">
                <span className="modal-header">
                    <span className="modal-title"></span>
                    <span onClick={handleToggleModal}>&times;</span>
                </span>
                <span className="modal-body">
                    {props.children}
                </span>
            </span>
        </span>
      </>
        
    )
}
export default JumboModal;