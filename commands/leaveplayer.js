const { SlashCommandBuilder } = require('discord.js');
const { leave } = require('../youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaveplayer')
    .setDescription('Leave the channel'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        await interaction.reply('Left!');
        await leave(interaction);

    }
};