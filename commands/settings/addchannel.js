const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')

module.exports = class Guide extends Command {
	constructor(client) {
		super(client, {
			name: 'addchannel',
			aliases: ['add', 'ac', 'addc'],
			group: 'settings',
			memberName: 'addchannel',
            description: 'Adds a channel to either main, or extra channels.',
            guildOnly: true,
            args: [
                {
                    key: 'channel',
                    prompt: 'Please mention a textchannel.',
                    type: 'textChannel',
                },
                {
                    key: 'type',
                    prompt: 'No channel type specified.',
                    type: 'string',
                    oneOf: ['main', 'extra', 'm', 'e'],
                    default: 'main'
                }
            ],
		});
    }
    
    run(message) {
        embed = new MessageEmbed()
        return message.say()
    }
};