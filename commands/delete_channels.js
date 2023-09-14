const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete_channels")
    .setDescription("Delete voice channels."),
  async execute(interaction) {
    try {
      interaction.guild.channels.cache.forEach((channel) => {
        if (channel.name.includes("VC")) {
          channel.delete();
        }
      });
      await interaction.reply("Channels deleted successfully!");
    } catch (e) {
      console.log(e);
    }
  },
};
