const { SlashCommandBuilder } = require('discord.js');
const { downloadyt } = require('../modules/songmanager.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addsong')
    .setDescription('Add a song to the queue.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        downloadyt(interaction);
        await interaction.reply('Added song!');
    }
};