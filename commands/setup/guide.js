const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')

module.exports = class Guide extends Command {
	constructor(client) {
		super(client, {
			name: 'guide',
			aliases: ['instructions', 'instruction', 'advise'],
			group: 'setup',
			memberName: 'guide',
            description: 'Shows a guide that can help you with seting up your bot.',
            args: [
                {
                    key: 'page',
                    prompt: 'This page does not exist',
                    type: 'integer',
                },
            ],
		});
    }
    
    run(message) {
        return message.say()
    }
};