const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move_back")
    .setDescription("Move back to the designated voice channels."),
  async execute(interaction) {
    const channels = [];
    interaction.guild.channels.cache.forEach((channel) => {
      if (channel.name.includes("VC")) {
        channels.push(channel);
      }
    });
    const parent = "1081013182551826486";
    for (c of channels) {
      for (const [, member] of c.members) {
        console.log(member);
        await member.voice
          .setChannel(parent)
          .catch((err) => console.log(err));
      }
    }

    if (channels.length === 0) {
      await interaction.reply("Could not find any members in created voice channels.");
    } else {
      await interaction.reply("Members were moved!");
    }
  },
};
