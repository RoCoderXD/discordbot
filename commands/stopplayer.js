const { SlashCommandBuilder } = require('discord.js');
const { stopaudio } = require('../youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stopplayer')
    .setDescription('stop playback'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        await interaction.reply('Stopping');
        await connectvc(interaction);
        playaudio(interaction.guildId);
    }
};