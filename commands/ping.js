const { SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('A perfectly normal command that you should try!'),
	async execute(interaction) {
		const name = "<@182973560719933441>" 
		await interaction.reply({ content: `${name}`})
		for (let i = 0; i < 20; i++) {
			await interaction.followUp({ content: `${name}`})
		}		  
	},
};


  