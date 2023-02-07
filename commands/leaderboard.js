const { SlashCommandBuilder } = require('discord.js');
const { connectvc } = require('../modules/profilehandler.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the current leaderboard.'),
    async execute(interaction) {
        connectvc(interaction);
        // Reply with info about the top so many places.
    }
};