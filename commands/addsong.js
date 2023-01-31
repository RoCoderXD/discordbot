const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('addsong')
    .setDescription('Add a song to the queue.'),
    //.addStringOption(option =>
        //option.setName('query')
            //.setDescription('the url'))
    async execute(interaction) {
        let dl = downloadyt(interaction);
        if(dl == false){
            
        }
        await interaction.reply('Added song!');
    }
};