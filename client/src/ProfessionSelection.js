// client/src/ProfessionSelection.js
import React from 'react';

function ProfessionSelection({ onChangeProfession, prof, level }) {
    const handleProfessionClick = (profession) => {
        onChangeProfession(profession);
    };

    return (
        <div>
            <h3>{prof === "Unemployed" ? "Choose a Profession" : `Changing Profession for ${10*level} gold `}</h3>

            <button onClick={() => handleProfessionClick('Miner')}>Miner</button>
            <button onClick={() => handleProfessionClick('Farmer')}>Farmer</button>
            <button onClick={() => handleProfessionClick('Woodcutter')}>Woodcutter</button>
        </div>
    );
}

export default ProfessionSelection;