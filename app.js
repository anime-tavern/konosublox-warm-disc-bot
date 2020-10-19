// Load the environment
const fs = require("fs");
const environmentJSON = fs.readFileSync("./env.json");
const environmentData = JSON.parse(environmentJSON);

// Load environment variables
for (let key of Object.keys(environmentData)){
	process.env[key] = environmentData[key];
};

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
	console.log("Warm bot is ready to warm!");
});

client.on("message", message => {

	if (message.author.bot){
		console.log(`A bot has spoken. Ignoring.`);
		return;
	}

	msgContent = message.content;
	msgContent_lower = msgContent.toLowerCase();


});

client.login(process.env.client_secret);
