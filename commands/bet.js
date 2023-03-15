const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bet")
    .setDescription("Bet on things.")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Over what number?")
    ),
  async execute(interaction) {
    var ids = [];
    var overs = [];
    var unders = [];
    const map = new Map();
    const amount = interaction.options.getNumber("amount");
    const message = await interaction.reply({
      content: `Over ${amount} kills?`,
      fetchReply: true,
    });

    await interaction.followUp({
      content: "You have 20 seconds to place your bets.",
    });

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

    collector.on("collect", async (reaction, user) => {
      profileData = await profileModel.findOne({
        userID: interaction.user.id,
      });
      subtractedPoints = profileData.points - 1000;

      if (reaction.emoji.name === "⬆️") {
        if (user.id != 990453979202867211 && !ids.includes(user.id)) {
          if (profileData.points >= 1000) {
            await profileModel.updateOne(
              { userID: interaction.user.id },
              { $set: { points: subtractedPoints } }
            );

            message.reply(`${user} thinks over.`);
            ids.push(user.id);
            overs.push(`<@${user.id}>`);
            map.set(`${user.id}`, true);
          } else {
            message.reply(`You do not have enough points to bet ${user}.`);
          }
        }
      } else {
        if (user.id != 990453979202867211 && !ids.includes(user.id)) {
          if (profileData.points >= 1000) {
            await profileModel.updateOne(
              { userID: interaction.user.id },
              { $set: { points: subtractedPoints } }
            );

            message.reply(`${user} thinks under.`);
            ids.push(user.id);
            unders.push(`<@${user.id}>`);
            map.set(`${user.id}`, false);
          } else {
            message.reply(`You do not have enough points to bet ${user}.`);
          }
        }
      }
    });

    collector.on("end", async (collected) => {
      message.reactions.removeAll();
      await message.reply("Betting time has ended.");

      const betEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Over ${amount} kills?`)
        .addFields(
          {
            name: "Over",
            value: `${overs.length !== 0 ? overs.join("\n") : "No bettors"}`,
          },
          {
            name: "Under",
            value: `${unders.length !== 0 ? unders.join("\n") : "No bettors"}`,
          }
        )
        .setTimestamp();
      await message.reply({ embeds: [betEmbed] });

      const result = await interaction.followUp({
        content: "React to give the result of the bet.",
      });
      result.react("⬆️").then(() => result.react("⬇️"));

      const collector = result.createReactionCollector({
        filter,
        max: 100,
      });

      collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === "⬆️" && user.id == interaction.user.id) {
          if (overs.length !== 0) {
            message.reply(
              `The result was over ${amount}. Congraulations to ${overs.join(
                " "
              )}.`
            );
            map.forEach(async (value, key, map) => {
              if (value == true) {
                profileData = await profileModel.findOne({
                  userID: interaction.user.id,
                });
                addedPoints = profileData.points + 2000;
                await profileModel.updateOne(
                  { userID: key },
                  { $set: { points: addedPoints } }
                );
              }
            });
            result.delete();
          } else {
            message.reply(`The result was over ${amount}. Nobody won.`);
            result.delete();
          }
        } else {
          if (user.id == interaction.user.id) {
            if (unders.length !== 0) {
              message.reply(
                `The result was under ${amount}. Congratulations to ${unders.join(
                  " "
                )}.`
              );
              map.forEach(async (value, key, map) => {
                if (value == false) {
                  profileData = await profileModel.findOne({
                    userID: interaction.user.id,
                  });
                  addedPoints = profileData.points + 2000;
                  await profileModel.updateOne(
                    { userID: key },
                    { $set: { points: addedPoints } }
                  );
                }
              });
              result.delete();
            } else {
              message.reply(`The result was under ${amount}. Nobody won.`);
              result.delete();
            }
          }
        }
      });
    });
  },
};
