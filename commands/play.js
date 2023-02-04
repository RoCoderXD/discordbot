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
        let status = playaudio(interaction);

        if(status == false){
            await interaction.reply("You need to be in a vc!");
            return;
        }
        await interaction.reply('Playing!');
    }
};  