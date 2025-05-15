// client/src/GameScreen.js
import React, {useState, useEffect, useRef} from 'react';
import ProfessionSelection from './ProfessionSelection';
import GoldExchange from "./GoldExchange";
import Sell from "./Sell";
import Buy from "./Buy";
import TradeList from "./TradeList";

function GameScreen({ userId }) {
    const [profession, setProfession] = useState('');
    const [resources, setResources] = useState({ level: 0,resource0: 0,resource1: 0, resource2: 0, resource3: 0});
    const [error, setError] = useState('');
    const [mess, setmess] = useState('');

    let pushed = 0;

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/game/resources/${userId}`);
            const data = await response.json();

            if (response.ok) {
                setResources(data);
                setError('')
                setProfession(data.profession);
            } else {
                setError(data.message || 'Failed to fetch resources');
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
            setError('Network error');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]); // не вставлчть fetch в deps, оно долбанется

    const handleProfessionChange = async (newProfession) => {
        try {
            const response = await fetch('http://localhost:4000/game/change-profession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, profession: newProfession })
            });

            const data = await response.json();

            if (response.ok) {
                setProfession(data.profession);
                setmess(data.message)
                setError('')
            } else {
                setError(data.message || 'Failed to change profession');
            }
        } catch (error) {
            console.error('Error changing profession:', error);
            setError('Network error');
        }
    };

    const handleGoldExchange = async (resourceType, amount) => {
        try {
            const response = await fetch('http://localhost:4000/game/gold-exchange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, resource: resourceType, quantity: amount })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to exchange gold');
            }else{
                setResources(data);
                setmess(data.message)
                setError('')
            }
        } catch (error) {
            console.error('Error exchanging gold:', error);
            setError('Network error');
        }
    };

    const Levelbutton = async () => {
            try {
                const response = await fetch('http://localhost:4000/game/levelup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                const data = await response.json();
                if (response.ok) {
                    fetchUserData();
                    setmess(data.message)
                    setError('')
                } else {
                    setError(data.message || 'Failed to level up');
                }
            } catch (error) {
                console.error('Error Leveling up:', error);
                setError('Network effrror');
            }

    };

    const Gainbutton = async () => {
        pushed++;
        if (pushed >= 3) {
            pushed=0;
            try {
                const response = await fetch('http://localhost:4000/game/gain-resources', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                const data = await response.json();
                if (response.ok) {
                    fetchUserData();
                    setmess(data.message)
                    setError('')
                } else {
                    setError(data.message || 'Failed to gain resources');
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
                setError('Network effrror');
            }
        }
    };
    const handleSell = async (Wood_, WoodPraice_, Iron_, IronPraice_, Bread_, BreadPraice_) => {
        try {
            const response = await fetch('http://localhost:4000/game/sell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, resource1: Iron_, resource1Praice: IronPraice_, resource2: Bread_, resource2Praice: BreadPraice_,resource3: Wood_, resource3Praice: WoodPraice_ })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to make are position');
            }else{
                fetchUserData();
                setmess(data.message)
                setError('')
            }
        } catch (error) {
            console.error('Error making position:', error);
            setError('Network error');
        }
    };

    const handleBuy = async (sellerId, Type) => {
        try {
            const response = await fetch('http://localhost:4000/game/Buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, sellerId: sellerId,  resourcetype: Type})
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to make are position');
            }else{
                fetchUserData();
                setmess(data.message)
                setError('')
            }
        } catch (error) {
            console.error('Error making position:', error);
            setError('Network error');
        }
    };


    return (
        <div>
            {mess && <h3>{mess}</h3>}
        <div style={{ display: 'flex', gap: '20px' }}>
            <div></div>
            <div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <p>User ID: {userId}</p>
                <p>Level: {resources.level} <button type="button" className="btn" onClick={Levelbutton}>Level Up</button></p>
                <p>level up cost {2**resources.level} of each resorce</p>
                <p>Profession: {profession || 'Unemployed'}</p>
                <p>Gold: {resources.resource0.toFixed(1)}</p>
                <p>Iron: {resources.resource1}</p>
                <p>Bread: {resources.resource2}</p>
                <p>Wood: {resources.resource3}</p>
                <button type="button" className="btn" onClick={Gainbutton}>gain resource</button>
                <ProfessionSelection onChangeProfession={handleProfessionChange} prof={profession} level={resources.level} />
                <GoldExchange onGoldExchange={handleGoldExchange}/>
            </div>
            <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Sell onSell={handleSell} userId={userId} />
                <Buy onBuy={handleBuy} />
                <TradeList />
            </div>
        </div>
        </div>
    );
}

export default GameScreen;