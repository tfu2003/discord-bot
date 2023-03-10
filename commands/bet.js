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

    message.react("⬆️").then(() => message.react("⬇️"));

    const filter = (reaction, user) => {
      return (
        ["⬆️", "⬇️"].includes(reaction.emoji.name) &&
        user.id === interaction.user.id
      );
    };

    message
      .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
      .then((collected) => {
        const reaction = collected.first();

        if (reaction.emoji.name === "⬆️") {
          message.reply("You reacted with a thumbs up.");
        } else {
          message.reply("You reacted with a thumbs down.");
        }
      })
      .catch((collected) => {
        message.reply(
          "You reacted with neither a thumbs up, nor a thumbs down."
        );
      });
  },
};
