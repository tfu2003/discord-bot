const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Use to get your daily points"),
  async execute(interaction) {
    try {
      profileData = await profileModel.findOne({ userID: interaction.user.id });
      newPoints = profileData.points + 1000;
      if (profileData) {
        await profileModel.updateOne(
          { userID: interaction.user.id },
          { $set: { points: newPoints } }
        );
        await interaction.reply({
          content: `You currently now have ${newPoints} points.`,
        });
      } else {
        await interaction.reply({
          content:
            "You do not currently have a profile. Do /create to make a profile.",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
