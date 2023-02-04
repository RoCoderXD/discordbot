const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, StreamType, demuxProbe, AudioPlayerStatus, VoiceConnectionStatus } = require("@discordjs/voice");
const { ConnectionService } = require("discord.js");
const play = require("play-dl");

var song;
const player = createAudioPlayer({
    behaviors: {
        nosubscriber: NoSubscriberBehavior.Pause,
    },
});

// A dict of dicts for saving queues. The keys of the first dict is the GuildId, within the keys are the urls and the values is the name of the song.
// The GuildId dict should be deleted upon the end of the queue to prevent the waste of memory, obviously.
var queues = {

};



module.exports = {
    connectvc: async function ConnectToVC(interaction){
        // Get the command invoker's vc channel.
        const vc = interaction.member.voice.channel;

        if (!vc){
            return msg.reply("You need to be in a voice channel!");
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: vc.guild.voiceAdapterCreator,
        });
        console.log(`Connected to vc ${interaction.member.voice.channelId} in guild ${interaction.guildId}!`);
    },
    playaudio: async function PlayAudio(interaction){
        let args = interaction.options.getString('url');

        let stream = await play.stream(args)
        const vc = interaction.member.voice.channel;
        if (!vc){
            return false;
        }

        song = createAudioResource(stream.stream, {
            inputType: stream.type,
            inlineVolume: true
        });
        song.volume.setVolume(0.5);
        player.play(song);
        const subscription = getVoiceConnection(interaction.guildId).subscribe(player);
        //let info = await play.video_info(args);
        //return info.video_details.title;
    },
    playqueue: function PlayQueue(interaction){
        if(queues[interaction.guildId].keys().length > 0){

        }else{
            return false;
        }
    },
    addqueue: function AddQueue(interaction){
        let args = interaction.options.getString('url');
        if(!queues[interaction.guildId]){
            queues[interaction.guildId] = {};
        }

    },
    stopaudio: function StopAudio(guildId){
        const subscription = getVoiceConnection(guildId);
        if (subscription) {
                player.stop();
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
    leave: function Leave(interaction){
        const subscription = getVoiceConnection(interaction.guildId);
        if (subscription) {
            player.stop();
            
            getVoiceConnection(interaction.guildId).destroy();
            console.log(`Disconnected from vc ${interaction.member.voice.channelId} in guild ${interaction.guildId}!`);
        }
    },

}