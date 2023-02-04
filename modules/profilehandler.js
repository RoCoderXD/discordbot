const client = require("../main.js");

module.exports = {
    getprofile: function GetProfile(interaction){
        //const member = interaction.guild.members.fetch(interaction.options.getString('userid'));
        const user = client.find(u => u.tag === interaction.options.getString('userid'))
        if(!user) return message.reply('User could not be found');
        return user.id;
    }
}