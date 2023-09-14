const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create_channels")
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
        channel = channel.setParent("1145266464631291971");
      }
      await interaction.reply("Channels created successfully!");
    } catch (e) {
      console.log(e);
    }
  },
};
