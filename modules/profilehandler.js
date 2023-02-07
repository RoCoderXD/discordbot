const sqlite3 = require('sqlite3').verbose();
const { open } = require("sqlite");



async function GetDB(){
    let db = await open({
        filename: "./profiles.db",
        driver: sqlite3.Database
    });
    return db;
}
let db = GetDB();
module.exports = {
    getprofile: function GetProfile(interaction){
        //const member = interaction.guild.members.]\\fetch(interaction.options.getString('userid'));
        
    },
    createprofile: async function CreateProfile(msg){
        
        await db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER, tag TEXT, exp INTEGER, rp INTEGER)`);
        let status = "";
        await db.get(`SELECT * FROM users WHERE id = ?`, [msg.author.id], (err, row) => {
            if (err) {
              return console.error(err.message);
            }
            if (row) {
                console.log("Profile already exists!");
                status = false;
            }else{
                console.log("Profile doesn't exist, creating new.");
                db.serialize(() => {
                    const stmt = db.prepare(`INSERT INTO users (id, tag, exp, rp) VALUES (?, ?, ?, ?)`);
                    stmt.run([msg.author.id, msg.author.tag, 0, 0]);
                    stmt.finalize();
                });
                status = true;
            }
        });
        console.log("Done.");
        return status;
    },
    newmessage: async function NewMessage(interaction){
        
        const rpAdd = 0;
        await db.run(`UPDATE users SET exp = exp + 100, rp = rp + ${rpAdd}`);
    }

}