// server/routes/game.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/change-profession', async (req, res) => {
    try {
        const userId = req.body.userId;
        const newProfession = req.body.profession;
        let status = 'Profession changed successfully';
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.resource0>=10*user.level||user.profession==="Unemployed"){
            if(user.profession!=="Unemployed"){  user.resource0-=10*user.level;}

            user.profession = newProfession;
        }else{
            status = 'You dont have enough gold to change profession';
        }
        await user.save();

        res.json({ message: status, profession: user.profession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to change profession' });
    }
});


router.post('/gain-resources', async (req, res) => {
    try {
        let status = 'resources gained successfully';
        const userId = req.body.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.profession === 'Miner') {
            user.resource1 += user.level;
        } else if (user.profession === 'Farmer') {
            user.resource2 += user.level;
        }else if (user.profession === 'Woodcutter') {
            user.resource3 += user.level;
        }else{
            status = 'First find a job peasant';
        }
        await user.save();

        res.json({ message: status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to gain resource' });
    }
});

router.get('/resources/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ profession: user.profession, level: user.level, resource0: user.resource0, resource1: user.resource1, resource2: user.resource2,resource3: user.resource3});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get resources' });
    }
});
    router.post('/gold-exchange', async (req, res) => {
        try {
            const userId = req.body.userId;
            const amount = req.body.quantity;
            const resourcetype = req.body.resource;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            let status = 'Exchanged successfully';
            if(resourcetype === "Wood") {
                if(user.resource3 - amount>=0){
                    user.resource3 -= amount
                    user.resource0 += amount/10;
                }else{status = 'We need more wood my lord';}
            }else if (resourcetype === "Iron") {
                if(user.resource1 - amount>=0){
                    user.resource1 -= amount
                    user.resource0 += amount/10;
                }else{status ='Not enough iron my lord';}
            }else if (resourcetype === "Bread") {
                if(user.resource2 - amount>=0){
                    user.resource2 -= amount
                    user.resource0 += amount/10;
                }else{status ='Not enough food my lord';}
            }

            await user.save();

            res.json({ message: status, level: user.level, resource0: user.resource0, resource1: user.resource1, resource2: user.resource2, resource3: user.resource3 });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to exchange' });
        }
    });

router.post('/levelup', async (req, res) => {
    try {
        let status = 'You dont have enough resourses for level up';
        const userId = req.body.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.resource1>=2**user.level && user.resource2>=2**user.level && user.resource3>=2**user.level) {
            user.resource1-=2**user.level
            user.resource2-=2**user.level
            user.resource3-=2**user.level
            user.level+=1;
            status = 'Level up successfully';
        }
        await user.save();

        res.json({ message: status, level: user.level, resource0: user.resource0, resource1: user.resource1, resource2: user.resource2, resource3: user.resource3 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to exchange' });
    }
});

router.post('/sell', async (req, res) => {
    try {
        const userId = req.body.userId;
        const Wood = req.body.resource3;
        const WoodPraice = req.body.resource3Praice;
        const Iron = req.body.resource1;
        const IronPraice = req.body.resource1Praice;
        const Bread = req.body.resource2;
        const BreadPraice = req.body.resource2Praice;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let status = 'Trade positions made';
        if(Wood <= user.resource3 && Iron <= user.resource1 && Bread <= user.resource2) {
            if(IronPraice >= 0 && BreadPraice >= 0 && WoodPraice >=0){
                user.resource3 += user.trade3;
                user.resource2 += user.trade2;
                user.resource1 += user.trade1;
                user.resource3 -= Wood;
                user.resource2 -= Bread;
                user.resource1 -= Iron;
                user.trade1 = Iron;
                user.trade2 = Bread;
                user.trade3 = Wood;
                user.trade1Praice = IronPraice;
                user.trade2Praice = BreadPraice;
                user.trade3Praice = WoodPraice;
            }else{
                status = "Praice cant be positive";
            }
        }else{
            status = "You dont have that amount of resources";
        }
        await user.save();
        res.json({ message: status});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to exchange' });
    }
});

router.post('/buy', async (req, res) => {
    try {
        const userId = req.body.userId;
        const sellerId = req.body.sellerId;
        const Type = req.body.resourcetype;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const seller = await User.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'seller not found' });
        }
        let status = 'congrats on buying';
        if(Type==="Wood"){
            if(user.resource0>=seller.trade3Praice){
                user.resource3+=seller.trade3;
                seller.trade3=0;
                seller.resource0+=seller.trade3Praice;
                user.resource0-=seller.trade3Praice;
                seller.trade3Praice=0;
            }else{
                status = "you dont have enogh gold for wood"
            }
        }else if(Type==="Bread"){
            if(user.resource0>=seller.trade2Praice){
                user.resource2+=seller.trade2;
                seller.trade2=0;
                seller.resource0+=seller.trade2Praice;
                user.resource0-=seller.trade2Praice;
                seller.trade2Praice=0;
            }else{
                status = "you dont have enogh gold for bread"
            }
        }else if(Type==="Iron"){
            if(user.resource0>seller.trade1Praice){
                user.resource1+=seller.trade1;
                seller.trade1=0;
                seller.resource0+=seller.trade1Praice;
                user.resource0-=seller.trade1Praice;
                seller.trade1Praice=0;
            }else{
                status = "you dont have enogh gold for iron"
            }
        }else{
            status = "what are you trying to buy?";
        }

        await user.save();
        await seller.save();
        res.json({ message: status});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to exchange' });
    }
});

router.get('/trades', async (req, res) => {
    try {
        const users = await User.findAll();

        // массив из сделок
        const allTrades = users.flatMap(user => [
            { Username: user.username, userId: user.id, trade: user.trade1, type: "Iron", price: user.trade1Praice },
            { Username: user.username, userId: user.id, trade: user.trade2, type: "Bread", price: user.trade2Praice },
            { Username: user.username, userId: user.id, trade: user.trade3, type: "Wood", price: user.trade3Praice },
        ]);

        const filteredTrades = allTrades.filter(t => t.trade != 0 || t.price != null || t.trade != null || t.price != '');

        res.json(filteredTrades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch trades' });
    }
});

router.get('/sell/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({trade1: user.trade1, trade2: user.trade2, trade3: user.trade3, trade1Praice: user.trade1Praice, trade2Praice: user.trade2Praice, trade3Praice: user.trade3Praice});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get your sells' });
    }
});

module.exports = router;