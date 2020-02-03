const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const sequelize = require("./database/config/connect");
const User = require("./database/models/").User;
const Token = require("./database/models/").Token;
const cors = require("cors");
const {Client} = require("pg");
const axios = require("axios");



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
client.connect();

client.query('SELECT table_schema, table_name FROM information_schema.tables;', (err, res)=> {
  if(err) throw err;
  for(let row of res.rows) {
    console.log(JSON.stringify(row))
  }
  client.end();
})


app.listen(PORT, console.log(`Ecoute sur le port ${PORT}`));

app.use(cors());
app.options("*", cors());

sequelize
	.authenticate()
	.then(() => {
		console.log("La connexion a été établie avec succès.");
	})
	.catch((err) => {
		console.error(
			"Impossible de se connecter à la base de données :",
			err.message,
		);
	});

// TOKEN
const getNewToken = async () => {
	return await axios
		.post(
			"https://auth.maas-dev.aws.vsct.fr/oauth2/token",
			"grant_type=client_credentials&scope=https%3A%2F%2Fapi.maas-dev.aws.vsct.fr%2F.*%2Fsearch.*%3A.*",
			{
				headers: {
					Authorization: process.env.AUTH,
					"Content-Type": "application/x-www-form-urlencoded",
					"x-api-key": process.env.API_KEY,
				},
			},
		)
		.then((res) => {
			return res.data.access_token;
		})
		.catch((err) => console.log(err.message));
};

app.get("/getNewToken", async (req, res) => {
  console.log("helol1")
  console.log({
    username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		url: process.env.DATABASE_URL,
		dialect: "postgres",
		"use_env_variable": process.env.DATABASE_URL,
  }
    
  )
	Token.findOne({}).then(async (tokenCreate) => {
    console.log("hell2")
   
		if (tokenCreate) {
      if(!tokenCreate.token) {
        const tok = await getNewToken();
        console.log("hello3", tok)
        Token.create({
          token: await getNewToken(),
        });
      }
     
		}

		if (tokenCreate && tokenCreate.createdAt) {
      console.log("hello4")
			const result = Math.round(
				(Date.now() - Date.parse(tokenCreate.createdAt)) / 1000,
			);
			if (result >= 3600) {
        console.log("Hello5")
				Token.destroy({
					where: {},
				});
			}
    }
    res.sendStatus(200);
    console.log("hello6")

  });
  console.log("Helloo7")
	
});

// SEARCH AROUNDME
const searchAroundMe = async () => {
	const newtoken = await getNewToken();

	const getSearchId = async () => {
		return await axios
			.post(
				"https://api.maas-dev.aws.vsct.fr/enc/search/aroundme",
				{
					// données en dur, à remplacer
					origin: {
						latitude: 48.8534,
						longitude: 2.3488,
					},
					radius: 1000,
				},
				{
					headers: {
						// accept: "application/json",
						Authorization: `Bearer ${newtoken}`,
						"x-api-key": process.env.API_KEY,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			)
			.then((res) => {
				return res.data.searchId;
			})
			.catch((err) => {
				console.log("Échec searchId ! " + err);
			});
	};

	const getAroundMeResults = async () => {
		const searchId = await getSearchId();
		return await axios
			.get(`https://api.maas-dev.aws.vsct.fr/enc/search/aroundme/${searchId}`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${newtoken}`,
					"Content-Type": "application/json",
					"x-api-key": process.env.API_KEY,
				},
			})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log("Échec resAroundMe ! " + err);
			});
	};

	return await getAroundMeResults();
};

// SEARCH ITINERARY
const searchItinerary = async () => {
	const newtoken = await getNewToken();

	const getSearchId = async () => {
		return await axios
			.post(
				"https://api.maas-dev.aws.vsct.fr/enc/search/itinerary",
				{
					destination: {
						latitude: 48.9595466,
						longitude: 2.3424024,
					},
					origin: {
						latitude: 48.8534,
						longitude: 2.3488,
					},
					// "searchDate": "2020-01-03T09:54:20.026Z"
				},
				{
					headers: {
						// accept: "application/json",
						Authorization: `Bearer ${newtoken}`,
						"x-api-key": process.env.API_KEY,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			)
			.then((res) => {
				return res.data.searchId;
			})
			.catch((err) => {
				console.log("Échec searchId ! " + err);
			});
	};

	const getItineraryResults = async () => {
		const searchId = await getSearchId();
		return await axios
			.get(
				`https://api.maas-dev.aws.vsct.fr/enc/search/itinerary/${searchId}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${newtoken}`,
						"Content-Type": "application/json",
					},
				},
			)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log("Échec resItinerary ! " + err);
			});
	};

	return await getItineraryResults();
};

// ROUTES
app.get("/search/aroundme", async (req, response) => {
	const resAroundMe = await searchAroundMe();
	response.send(resAroundMe);
});

app.get("/search/itinerary", async (req, response) => {
	const resItinerary = await searchItinerary();
	response.send(resItinerary);
});

app.get("/", (req, res) => {
	res.send("Hello Backend");
});
