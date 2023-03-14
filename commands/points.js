const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("points")
    .setDescription("Check out how many points you have"),
  async execute(interaction) {
    try {
        profileData = await profileModel.findOne({ userID: interaction.user.id});
        if (profileData) {
            await interaction.reply({ content: `You currently have ${profileData.points} points.`});
        } else {
            await interaction.reply({ content: "You do not currently have a profile. Do /create to make a profile."});
        }
    } catch (e) {
        console.log(e);
    }
  },
};
