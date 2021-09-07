import React, { useState, useRef, useEffect } from 'react';
import eye from '../img/icons/eye.svg';
import glossaryInfo from '../data/glossaryInfo';
import parse from 'html-react-parser';

const GlossaryModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [definition, setDefinition] = useState('');
    const overlayRef = useRef();

    const handleToggleModal = (event) => {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            setIsModalOpen(prev => !prev);
            setDefinition(prev => {
                const position = glossaryInfo.glossaryTerms.findIndex(elem => elem === props.term)
                const newDefinition = glossaryInfo.glossaryDefinition[position]
                return newDefinition;
            })
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
        <span className="glossary" style={{color: props.color}} onClick={handleToggleModal}>{ parse(props.text) } <img onClick={handleToggleModal} src={eye} alt="logo ojo" /></span>
        <span ref={overlayRef} className={isModalOpen ? 'overlay open' : 'overlay'} onClick={handleToggleModal}>
            <span className="modal">
                <span className="modal-header">
                    <span className="modal-title">{ parse(props.term) }</span>
                    <span onClick={handleToggleModal}>&times;</span>
                </span>
                <span className="modal-body">
                    <span className="modal-paragraph">{parse(definition)}</span>
                </span>
            </span>
        </span>
      </>
        
    )
}
export default GlossaryModal;