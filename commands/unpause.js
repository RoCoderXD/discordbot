const { SlashCommandBuilder } = require('discord.js');
const { unpauseaudio } = require('../modules/youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unpause')
    .setDescription('Unpause the audio.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        unpauseaudio(interaction.guildId);
        await interaction.reply('Unpaused playback!');
    }
};