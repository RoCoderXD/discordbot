const { SlashCommandBuilder } = require('discord.js');
const { getprofile } = require("../modules/profilehandler.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View another user\'s profile.')
    .addStringOption(option =>
        option.setName('usertag')
            .setDescription('The tag of the user in question (DO NOT INCLUDE THE @, ex. Big Bruh#2554).')
            .setRequired(true)),
    async execute(interaction) {
        let status = await getprofile(interaction);
        console.log("Status: " + status);
        if(status != false){
            await interaction.reply(status);
        }else{
            await interaction.reply("Could not find user with such tag, have they chatted before?");
        }
        
    }
};