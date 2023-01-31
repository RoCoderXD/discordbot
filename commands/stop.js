const { SlashCommandBuilder } = require('discord.js');
const { stopaudio } = require('../modules/youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop current song.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        await interaction.reply('Stopping');
        stopaudio(interaction.guildId);
    }
};