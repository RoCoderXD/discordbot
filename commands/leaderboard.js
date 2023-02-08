const { SlashCommandBuilder } = require('discord.js');
const { getleaderboard } = require('../modules/profilehandler.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the current leaderboard.'),
    async execute(interaction) {
        let result = await getleaderboard(interaction);
        let response = "";
        result.forEach((x) => {
            response = response + (x.tag + ": " + x.rp + "\n\n");
        });

        await interaction.reply(`Top 5:\n\n\n${response}`);
    }
};