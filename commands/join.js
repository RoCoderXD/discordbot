const { SlashCommandBuilder } = require('discord.js');
const { connectvc } = require('../modules/youtubeplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the channel'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        connectvc(interaction);
        await interaction.reply('Joined!');
    }
};