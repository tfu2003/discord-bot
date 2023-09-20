const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription("Move to a random created voice channel"),
  async execute(interaction) {
    const channels = [];
    interaction.guild.channels.cache.forEach((channel) => {
      if (channel.name.includes("VC")) {
        channels.push(channel);
      }
    });
    const channel = interaction.member.voice.channel;
    interaction.member.voice
      .setChannel(channels[Math.floor(Math.random() * channels.length)])
      .catch((err) => console.log(err));

    await interaction.reply("You were moved!");
  },
};
