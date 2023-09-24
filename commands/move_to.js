const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move_to")
    .setDescription("Move to a random created voice channel"),
  async execute(interaction) {
    const channels = [];
    interaction.guild.channels.cache.forEach((channel) => {
      if (channel.name.includes("VC")) {
        channels.push(channel);
      }
    });
    const channel = await interaction.member.voice.channel;
    console.log(channel.members);
    for (const [, member] of channel.members) {
      await member.voice
        .setChannel(channels[Math.floor(Math.random() * channels.length)])
        .catch((err) => console.log(err));
    }

    if (channels.length === 0) {
      await interaction.reply("Could not find any created voice channels.");
    } else {
      await interaction.reply("Members were moved!");
    }
  },
};
