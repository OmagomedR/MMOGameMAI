// client/src/TradesList.js
import React, { useState, useEffect } from 'react';

function TradesList() {
    const [trades, setTrades] = useState([]);
    const [error, setError] = useState('');

    const fetchTrades = async () => {
        try {
            const response = await fetch('https://mmogamemai.onrender.com/game/trades');
            const data = await response.json();

            if (response.ok) {
                setTrades(data);
                setError('');
            } else {
                setError(data.message || 'Failed to load trades');
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
        <div className="trades">
            <h2>Market <button onClick={() => fetchTrades()}>refresh</button></h2>
            <p style={{ color: 'red' }}>{error}</p>
            <table className="trades-table">
                <thead>
                <tr>
                    <th>Seller</th>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {trades.length > 0 ? (
                    trades.map((trade, index) => (
                        <tr key={index}>
                            <td>{trade.Username}</td>
                            <td>{trade.userId}</td>
                            <td>{trade.trade}</td>
                            <td>{trade.type}</td>
                            <td>{trade.price.toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No active trades available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TradesList;