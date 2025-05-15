// client/src/Buy.js
import React, {useState} from 'react';

function Buy({ onBuy}) {
    const [Seller, setSeller] = useState(0);
    const [Type, setType] = useState('Iron');
    const handleBuy = (sellerId, Type) => {
        onBuy(sellerId, Type);
    };

    return (
        <div>
            <h3>{"Buy resources"}</h3>
            <div><label htmlFor="amount">enter seller id:</label>

                <input
                    type="number"
                    id="amount"
                    value={Seller}
                    onChange={(e) => setSeller(parseInt(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label htmlFor="resourceType">Type of resourse</label>
                <select
                    id="resourceType"
                    value={Type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="Iron">Iron</option>
                    <option value="Bread">Bread</option>
                    <option value="Wood">Wood</option>
                </select>
            </div>
            <button onClick={() => handleBuy(Seller, Type)}>Buy</button>
        </div>
    );
}

export default Buy;