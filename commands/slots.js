const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("Test your luck with the slots machine"),
  async execute(interaction) {
    profileData = await profileModel.findOne({ userID: interaction.user.id });
    let slots = [
      ":apple:",
      ":pear:",
      ":tangerine:",
      ":lemon:",
      ":mango:",
      ":peach:",
    ];
    let first = Math.floor(Math.random() * slots.length);
    let second = Math.floor(Math.random() * slots.length);
    let third = Math.floor(Math.random() * slots.length);
    if (profileData) {
      newPoints = profileData.points - 50;
      await profileModel.updateOne(
        { userID: interaction.user.id },
        { $set: { points: newPoints } }
      );
      if ((slots[first] === slots[second]) === slots[third]) {
        const slotsEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Slot Machine")
          .addFields({
            name: "Result:",
            value: `${slots[first] + slots[second] + slots[third]}`,
          })
          .setFooter({ text: `You won! Congratulations!`})
          .setTimestamp();
        await interaction.reply({ embeds: [slotsEmbed] });
        profileData = await profileModel.findOne({
          userID: interaction.user.id,
        });
        newPoints = profileData.points + 5000;
        await profileModel.updateOne(
          { userID: interaction.user.id },
          { $set: { points: newPoints } }
        );
      } else {
        const slotsEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Slot Machine")
          .addFields({
            name: "Result:",
            value: `${slots[first] + slots[second] + slots[third]}`,
          })
          .setFooter({text: `You lost! Try again next time.`})
          .setTimestamp();
        await interaction.reply({ embeds: [slotsEmbed] });
      }
    } else {
      await interaction.reply({
        content:
          "You do not currently have a profile. Do /create to make a profile.",
      });
    }
  },
};
