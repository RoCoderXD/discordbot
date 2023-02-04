const { SlashCommandBuilder } = require('discord.js');
const { getprofile } = require("../main.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View another user\'s profile.')
    .addStringOption(option =>
        option.setName('usertag')
            .setDescription('The of the user in question (DO NOT INCLUDE THE @).')
            .setRequired(true)),
    async execute(interaction) {
        let status = await getprofile(interaction);
        if(status != false){
            await interaction.reply(status);
        }else{
            await interaction.reply("u failed bro");
        }
        
    }
};