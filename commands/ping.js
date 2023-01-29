const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Gives you a good ol\' pong\'in'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
};