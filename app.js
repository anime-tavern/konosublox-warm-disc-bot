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

/**
* @see https://discordjs.guide/miscellaneous/parsing-mention-arguments.html#using-regular-expressions
* @returns {DiscordUser}
*/
function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

/**
* Gets a heat pun for the user
* @param {DiscordUser}
* @returns {string}
*/
function getHeatPun(discordUser){
	const username = discordUser.username;

	return "";
}

client.on("message", message => {

	if (message.author.bot){
		console.log(`A bot has spoken. Ignoring.`);
		return;
	}

	msgContent = message.content;
	msgContent_lower = msgContent.toLowerCase();

	if (msgContent_lower.startsWith("?")){
		// Is a command
		if (msgContent_lower.startsWith("?warm")){
			// Warm command
			const args = msgContent_lower.trim().split(" ");
			const commandUsed = args.shift().toLowerCase();

			if (args.length === 0){
				// No commands
				message.channel.send("Who should I warm up? You forgot to put their tag or ID!");
			}else{
				let user = getUserFromMention(args[0]);
				if (!user){
					// Was it a user ID?
					user = client.users.cache.get(args[0]);
				}

				// Could be redefined by the pure-ID check, so check again if it is valid
				if (user){
					message.channel.send(getHeatPun(user));
				}else{
					message.channel.send("Invalid user ID! Use their ID or a tag to warm them up :)");
				}
			}
		}
	}
});

client.login(process.env.client_secret);
