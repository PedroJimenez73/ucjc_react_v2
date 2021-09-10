import React, { useState } from 'react';
import glossaryInfo from '../data/glossaryInfo'
import parse from 'html-react-parser';
import i18n from '../services/translations/i18n';

const GlossaryPage = (props) => {
    const [position, setPosition] = useState(0);

    const handleSelectTerm = (index) => {
        setPosition(index);
    }
    
    return(
      <>
        <p className="instructions">{i18n.t('glossaryInstructions')}</p>
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