const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("lb")
      .setDescription("Use to see leaderboard for most points."),
    async execute(interaction) {
        let leaderboard = [];
        const sorted = await profileModel.find().sort({"points": -1}).limit(10);
        sorted.forEach(element => leaderboard.push(`<@${element.userID}>: ${element.points}`));
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Top 10 For Most Points')
        .setDescription(`${leaderboard.join("\n")}`)
        .setTimestamp()
    
    interaction.reply({ embeds: [exampleEmbed] });
    },
  };