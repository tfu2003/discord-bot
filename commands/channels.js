const { SlashCommandBuilder } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channels")
    .setDescription("Create voice channels.")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Number of voice channels")
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    try {
      for (let i = 0; i < amount; i++) {
        let channel = await interaction.guild.channels.create({
          name: `VC${i + 1}`,
          type: 2,
        });
        channel = channel.setParent("1081013182551826484");
      }
      await interaction.reply("Channels created successfully!");
    } catch (e) {
      console.log(e);
    }
  },
};
