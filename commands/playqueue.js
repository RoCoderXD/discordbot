const { SlashCommandBuilder } = require('discord.js');
const { playqueue } = require('../modules/youtubeplayer.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('playqueue')
    .setDescription('Start playing the queue.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        let status = playqueue(interaction);
        await interaction.reply('Playing!');
    }
};