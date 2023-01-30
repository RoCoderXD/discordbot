const fs = require("node:fs");
const { exec } = require("child_process");

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
    }
}
