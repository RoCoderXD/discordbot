const { SlashCommandBuilder } = require('discord.js');
const { connectvc } = require('../modules/youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the channel'),
    async execute(interaction) {
        connectvc(interaction);
        await interaction.reply('Joined!');
    }
};