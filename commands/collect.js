const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");
const usedCommand = new Set();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("collect")
    .setDescription("Use to get your daily points"),
  async execute(interaction) {
    if (usedCommand.has(interaction.user.id)) {
      await interaction.reply({ content: `Wait 1 hour to get more points <@${interaction.user.id}>.`})
    } else {
      try {
        profileData = await profileModel.findOne({ userID: interaction.user.id });
        newPoints = profileData.points + 5000;
        if (profileData) {
          usedCommand.add(interaction.user.id);
          await profileModel.updateOne(
            { userID: interaction.user.id },
            { $set: { points: newPoints } }
          );
          await interaction.reply({
            content: `You now have ${newPoints} points <@${interaction.user.id}>.`,
          });
          setTimeout(() => {
            usedCommand.delete(interaction.user.id);
          }, 3600000);
        } else {
          await interaction.reply({
            content:
              "You do not currently have a profile. Do /create to make a profile.",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
};
