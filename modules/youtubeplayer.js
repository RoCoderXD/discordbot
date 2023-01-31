const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, StreamType, demuxProbe, AudioPlayerStatus, VoiceConnectionStatus } = require("@discordjs/voice");
const { ConnectionService } = require("discord.js");
const play = require("play-dl");

var song;
const player = createAudioPlayer({
    behaviors: {
        nosubscriber: NoSubscriberBehavior.Pause,
    },
});
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
        let args = interaction.options.getString('url')

        let stream = await play.stream(args)
        const vc = interaction.member.voice.channel;
        if (!vc){
            return msg.reply("You need to be in a voice channel!");
        }

        song = createAudioResource(stream.stream, {
            inputType: stream.type,
            inlineVolume: true
        });
        song.volume.setVolume(0.7);
        player.play(song);
        const subscription = getVoiceConnection(interaction.guildId).subscribe(player);
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