const { SlashCommandBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("A perfectly normal command that you should try!")
    .addStringOption((option) =>
      option.setName("id").setDescription("If you use my ID I will boom you")
    ),
  async execute(interaction) {
    const id = interaction.options.getString("id");
    var user = `<@${interaction.user.id}>`;
    if (id.includes("<@266325246863343616>")) {
      try {
        await interaction.reply(`MAN SHUT YO BITCH ASS UP ${user}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await interaction.reply({ content: `${id}` });
        for (let i = 0; i < 19; i++) {
          await interaction.followUp({ content: `${id}` });
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
};
