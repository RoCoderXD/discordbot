const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require("@discordjs/voice");
const { ConnectionService } = require("discord.js");
const testaudio = createAudioResource("./Xi Ping.mp3");
const player = createAudioPlayer({
    behaviors: {
        nosubscriber: NoSubscriberBehavior.Pause,
    },
});
module.exports = {
    connectvc: async function ConnectToVC(interaction){
        const vc = interaction.member.voice.channel;
        
        if (!vc){
            return msg.reply("You need to be in a voice channel!");
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: vc.guild.voiceAdapterCreator,
        });
    },
    playaudio: function PlayAudio(guildId){
        player.play(testaudio);
        const subscription = getVoiceConnection(guildId).subscribe(player);

        if (subscription) {
            setTimeout(() => function(){
                player.stop();
                subscription.unsubscribe();
                getVoiceConnection(guildId).destroy();
            
            },5000);
        }
    },
    stopaudio: function StopAudio(guildId){
        const subscription = getVoiceConnection(guildId);
        if (subscription) {
                player.stop();
                getVoiceConnection(guildId).destroy();
        }
    },
    pauseaudio: function PauseAudio(guildId){
        const subscription = getVoiceConnection(guildId);
        if (subscription) {
                player.pause();
        }
    },
    unpauseaudio: function UnpauseAudio(guildId){
        const subscription = getVoiceConnection(guildId);
        if (subscription) {
                player.unpause();
        }
    },
    leave: function Leave(guildId){
        const subscription = getVoiceConnection(guildId);
        if (subscription) {
            player.stop();
            
            getVoiceConnection(guildId).destroy();
        }
    },

}