const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Just type the command so you can be put in the database."),
  async execute(interaction) {
    try {
        profileData = await profileModel.findOne({ userID: interaction.user.id});
        if (!profileData) {
            let profile = await profileModel.create({
                userID: interaction.user.id,
                serverID: interaction.guildId,
                money: 1000
            });
            profile.save();
            await interaction.reply({ content: "You successfully created a new profile."});
        } else {
            await interaction.reply({ content: "You already have an existing profile."})
        }
    } catch (e) {
        console.log(e);
        
    }
  },
};
