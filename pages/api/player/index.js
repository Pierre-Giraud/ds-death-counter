import nextConnect from 'next-connect';

const dbModel = require("../../../db/db");

/*const handler = nextConnect()
    .get(async (req, res) => {
        // Récupération de tous les joueurs
        const playersObj = await dbModel.db['players'].findAll();
        const players = JSON.stringify(playersObj);

        res.statusCode = 200;
        res.json(players);
    })
    .post(async (req, res) => {
        const { body } = req;
        const { name } = body;

        const newPlayer = await dbModel.db["players"].create({
            name: name,
        });

        res.statusCode = 200;
        res.json(newPlayer);
    });

export default handler;*/

/*export default function handler(req, res) {
    if (req.method === 'GET'){
        // Récupération de tous les joueurs
        const playersObj = dbModel.db['players'].findAll();
        const players = JSON.stringify(playersObj);

        res.statusCode = 200;
        res.json(players);
    }
}*/


export default (req, res) => {
    if (req.method === 'GET'){
        try {
            // Récupération de tous les joueurs
            dbModel.db['players'].findAll().then((players) => {
                res.status(200).json(JSON.stringify(players));
            }).catch((err) => {
                res.status(err.statusCode).json([{"Message" : "Erreur lors de la lecture de la base de données"}]);
            });
        } catch (e) {
            res.status(500).json([{"message" : "Une erreur inconnue est survenue"}]);
        }
    } else if (req.method === 'POST'){
        try {
            const { body } = req;
            const { name } = body;

            dbModel.db["players"].create({
                name: name
            }).then((player) => {
                res.status(200).json(JSON.stringify(player));
            }).catch((err) => {
                res.status(500).json([{"Message" : err.toString()}]);
            });
        }catch (e) {
            res.status(500).json([{"message" : "Une erreur inconnue est survenue"}]);
        }
    }
};

/*export default (req, res) => {
    if (req.method === 'GET'){
        try {
            // Récupération de tous les joueurs
            (async () => {
                const players = await dbModel.db['players'].findAll();
                console.log(players);
                res.status(200).json(JSON.stringify(players));
            })();
        } catch (e) {
            res.status(500).json([{"message" : "Erreur du try catch"}]);
        }
    }
};*/


/*function middleware(req, res) {
    return new Promise((resolve, reject) => {
        const players = dbModel.db['players'].findAll();
        return resolve(players);
    })
}

export default async (req, res) => {
    if (req.method === 'GET'){
        const players = await middleware(req, res);
        res.status(200).json(JSON.stringify(players));
    } else if (req.method === 'POST'){
        const { body } = req;
        const { name } = body;

        const newPlayer = await dbModel.db["players"].create({
            name: name,
        });

        res.statusCode = 200;
        res.json(newPlayer);
    }
};*/