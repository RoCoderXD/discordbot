const { SlashCommandBuilder } = require('discord.js');
const { pauseaudio } = require('../modules/youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the audio.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        pauseaudio(interaction.guildId);
        await interaction.reply('Paused playback!');
    }
};