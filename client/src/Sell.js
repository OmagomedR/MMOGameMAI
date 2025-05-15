// client/src/Sell.js
import React, { useState, useEffect } from 'react';

function Sell({ onSell, userId }) {
    const [Wood, setWood] = useState(0);
    const [Iron, setIron] = useState(0);
    const [Bread, setBread] = useState(0);
    const [WoodPraice, setWoodPraice] = useState(0);
    const [IronPraice, setIronPraice] = useState(0);
    const [BreadPraice, setBreadPraice] = useState(0);
    const [error, setError] = useState('');

    const handleSell = (Wood_, WoodPraice_, Iron_, IronPraice_, Bread_, BreadPraice_) => {
        onSell(Wood_, WoodPraice_, Iron_, IronPraice_, Bread_, BreadPraice_);
    };


    const fetchTrades = async () => {
        try {
            const response = await fetch(`https://mmogamemai-front.onrender.com/game/sell/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setError('')
                setWood(data.trade3);
                setIron(data.trade1);
                setBread(data.trade2);
                setWoodPraice(data.trade3Praice);
                setIronPraice(data.trade1Praice);
                setBreadPraice(data.trade2Praice);
            } else {
                setError(data.message || 'Failed to load your trades.');
            }
        } catch (err) {
            setError('Network error');
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTrades();
    }, []);


    return (
        <div>

            <p style={{ color: 'red' }}>{error}</p>

            <h2>Sell your resources</h2>
            <div>
                <label htmlFor="amount">Amount of Wood:</label>
                <input
                    type="number"
                    id="wood"
                    value={Wood}
                    onChange={(e) => setWood(parseInt(e.target.value))}
                />
                <label htmlFor="amount">Praice:</label>
                <input
                    type="number"
                    id="woodPraice"
                    value={WoodPraice}
                    onChange={(e) => setWoodPraice(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount of Bread:</label>
                <input
                    type="number"
                    id="Bread"
                    value={Bread}
                    onChange={(e) => setBread(parseInt(e.target.value))}
                />
                <label htmlFor="amount">Praice:</label>
                <input
                    type="number"
                    id="BreadPraice"
                    value={BreadPraice}
                    onChange={(e) => setBreadPraice(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount of Iron:</label>
                <input
                    type="number"
                    id="Iron"
                    value={Iron}
                    onChange={(e) => setIron(parseInt(e.target.value))}
                />
                <label htmlFor="amount">Praice:</label>
                <input
                    type="number"
                    id="IronPraice"
                    value={IronPraice}
                    onChange={(e) => setIronPraice(parseInt(e.target.value))}
                />
            </div>
            <button onClick={() => handleSell(Wood, WoodPraice, Iron, IronPraice, Bread, BreadPraice)}>confirm</button>
        </div>
    );
}
export default Sell;
