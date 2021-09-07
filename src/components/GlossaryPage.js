import React, { useState } from 'react';
import glossaryInfo from '../data/glossaryInfo'
import parse from 'html-react-parser';

const GlossaryPage = (props) => {
    const [position, setPosition] = useState(0);

    const handleSelectTerm = (index) => {
        setPosition(index);
    }
    
    return(
      <>
        <p className="instructions">Desplácese y pulse en los términos para visualizar la información</p>
        <div>
            <div className="terms-box">
                {glossaryInfo.glossaryTerms.map((term, index) => {
                    return <p key={index} 
                              className={position === index ? 'selected' : ''} 
                              onClick={() => handleSelectTerm(index)}>
                                  {parse(term)}
                           </p>
                })}
            </div>
            <div className="definition-box">
                <p>{parse(glossaryInfo.glossaryDefinition[position])}</p>
            </div>
        </div>
      </>
        
    )
}
export default GlossaryPage;