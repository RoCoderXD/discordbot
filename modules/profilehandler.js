const sqlite3 = require('sqlite3').verbose();
const delay = require('delay');
const { open } = require("sqlite");


let db = new sqlite3.Database("./profiles.db");

function checkWord(word, str) {
    const allowedSeparator = '\\\s,;"\'|';
  
    const regex = new RegExp(
      `(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`,
  
      // Case insensitive
      'i',
    );
    
    return regex.test(str);
}

module.exports = {
    getprofile: async function GetProfile(interaction){
        const member = interaction.options.getString('usertag');
        let status = "";
        db.get(`SELECT * FROM users WHERE tag = ?`, [member], (err, row) => {
            if (err) {
              return console.error(err.message);
            }
            if (row) {
                status = `Showing profile of: ${row.tag},\n\nEXP: ${row.exp}\nRP: ${row.rp}`;
            }else{
                status = false;
            }
        });
        while(status == ""){
            if(status != ""){
                return status;
            }
            await delay(250);
        }
        return status;
    },
    createprofile: function CreateProfile(msg){
        
        db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER, tag TEXT, exp INTEGER, rp INTEGER)`);
        let status = "";
        db.get(`SELECT * FROM users WHERE id = ?`, [msg.author.id], (err, row) => {
            if (err) {
              return console.error(err.message);
            }
            if (row) {
                //console.log("Profile already exists!");
                status = false;
            }else{
                //console.log("Profile doesn't exist, creating new.");
                db.serialize(() => {
                    const stmt = db.prepare(`INSERT INTO users (id, tag, exp, rp) VALUES (?, ?, ?, ?)`);
                    stmt.run([msg.author.id, msg.author.tag, 0, 0]);
                    stmt.finalize();
                });
                status = true;
            }
        });
        //console.log("Done.");
        return status;
    },
    newmessage: function NewMessage(msg){
        let rpAdd = 0;

        const level1 = ["nigga", "kkk", "hitler", "monkey", "jew"].forEach((x) => {
            if(checkWord(x, msg.content)){
                rpAdd = rpAdd + 1
            }
        });
        const level2 = ["nigger", "ku klux klan", "chink"].forEach((x) => {
            if(checkWord(x, msg.content)){
                rpAdd = rpAdd + 2
            }
        });
        db.run(`UPDATE users SET exp = exp + 100, rp = rp + ${rpAdd} WHERE id == ${msg.author.id}`);
    },
    getleaderboard: async function GetLeaderboard(interaction){
        let status = "";
        db.all(`SELECT tag, rp FROM users ORDER BY rp DESC LIMIT 5`, (err, rows) => {
            if (err) {
              return console.error(err.message);
            }
            if (rows) {
                console.log("Profile already exists!");

                status = rows;
            }else{
                status = false;
            }
        });

        while(status == ""){
            if(status != ""){
                return status;
            }
            await delay(250);
        }
        return status;
    }

}