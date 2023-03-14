const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bet")
    .setDescription("Bet on things.")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Over what number?")
    ),
  async execute(interaction) {
    const amount = interaction.options.getNumber("amount");
    const message = await interaction.reply({
      content: `Over ${amount}?`,
      fetchReply: true,
    });

	await interaction.followUp({ content: "You have 20 seconds to place your bets." });

    message.react("⬆️").then(() => message.react("⬇️"));

    const filter = (reaction, user) => {
      return ["⬆️", "⬇️"].includes(reaction.emoji.name);
    };

    const collector = message.createReactionCollector({
      filter,
      max: 100,
      time: 20000,
      errors: ["time"],
    });


    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "⬆️") {
		if (user.id != 990453979202867211) {
        message.reply(`${user} thinks over.`);
		}
      } else {
		if (user.id != 990453979202867211) {
        message.reply(`${user} thinks under.`);
		}
      }
    });

    collector.on("end", (collected) => {
		message.reply("Betting time has ended.");
    });
  },
};
