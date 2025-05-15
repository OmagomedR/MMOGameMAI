// client/src/GoldExchange.js
import React, { useState } from 'react';

function GoldExchange({ onGoldExchange }) {
    const [resourceType, setResourceType] = useState('Iron');
    const [amount, setAmount] = useState(0);
    const handleGoldExchange = (resourceType, amount) => {
        onGoldExchange(resourceType, amount);
    };

    return (
        <div>
            <h2>Resorce to gold</h2>
                <div>                    <label htmlFor="amount">Amount to exchange:</label>

                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                </div>
                <div class="input-group">
                    <label for="resourceType">Type of resourse</label>
                    <select
                        id="resourceType"
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                    >
                        <option value="Iron">Iron</option>
                        <option value="Bread">Bread</option>
                        <option value="Wood">Wood</option>
                    </select>
                </div>
                <button onClick={() => handleGoldExchange(resourceType, amount)}>Exchange</button>
        </div>
    );
}
export default GoldExchange;
