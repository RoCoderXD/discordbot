const { SlashCommandBuilder } = require('discord.js');
const { connectvc, playaudio } = require('../youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('playtest')
    .setDescription('play the test audio'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        await interaction.reply('Playing test audio!');
        await connectvc(interaction);
        playaudio(interaction.guildId);
    }
};