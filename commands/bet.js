const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bet')
		.setDescription('Bet on things.')
		.addNumberOption(option => option.setName('amount').setDescription('Over what number?')),
	async execute(interaction) {
		const amount = interaction.options.getNumber('amount');
		const message = await interaction.reply({ content: `Over ${amount}?`, fetchReply: true });
		message.react('⬆️')
			.then(() => message.react('⬇️'))
			.catch(() => console.error('One of the emojis failed to react.'));
        return message;
	},

};