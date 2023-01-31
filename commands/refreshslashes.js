const fs = require("node:fs");
const { SlashCommandBuilder } = require('discord.js');
const { refreshslashes } = require("../modules/commandhandler")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('refreshcommands')
    .setDescription('Refresh slash commands.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        refreshslashes(interaction.guildId);
        await interaction.reply('Refreshed!');
    }
};