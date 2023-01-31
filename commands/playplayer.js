const { SlashCommandBuilder } = require('discord.js');
const { playaudio } = require('../modules/youtubeplayer.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play url')
    .addStringOption(option =>
        option.setName('url')
            .setDescription('the url')
            .setRequired(true)),
    async execute(interaction) {
        playaudio(interaction);
        await interaction.reply("Playing!");
    }
};