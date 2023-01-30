const fs = require("node:fs");
const { exec } = require("child_process");
const songs = require("../downloadedsongs.json");

module.exports = {
    downloadyt: function DownloadYT(url){
        exec("youtube-dl -x --audio-format mp3 -o ~/VSCdirs/discordbot/songs/%(title)s.%(ext)s "+url, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("Downloading...");
        });
    },
    checkforsong: function CheckForSong(url){
        const AllSongs = JSON.parse(songs);
        for(var key in AllSongs["songnames"]){
            if(obj.hasOwnProperty(key) && key == url){
                var value = AllSongs["songnames"][key];
                return [key,value];
            }
        }
    }
}
