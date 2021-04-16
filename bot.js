//const discord = require('discord.js')
const { CommandoClient } = require('discord.js-commando')
const path = require('path');
//const fs = require('fs');


const client = new CommandoClient({
	commandPrefix: '//',
	owner: '350729407125651457',
	invite: 'https://discord.gg/Fe6g6Zqp9W',
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['setup', 'The commands used when setting up the bot.'],
		['settings', 'The settings for your bot.'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
    
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('YouTube videos', { type: 'WATCHING' });
});
    
client.on('error', console.error);

client.login('TOKEN_HERE');