const express = require('express');
const app = express();
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
var prefix = ayarlar.prefix;
require('./util/eventLoader')(client);
// GEREKLİ YERLER kurcalamayın

// -------------------------------------------------------------

app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

//------------------------------------------------------------------

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
 
  // KOMUT TANIMI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);

  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// PERM LEVELLER 

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
///////////// buranın üstüyle işiniz yok/////

///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
//girer girmez rol verme//
client.on("guildMemberAdd", async member => {
  await member.addRole("787986342889390090"); /// kayıtsız rolü idssi ya da hangi rolü vermesini istiyrsanız
  member.setNickname("✰ İsim | Yaş");
}); // örnek ✮ isim ' Yaş'
//----------------------------------------------------------------------------------
//Otoa tag verme//
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let zezeexe = "✰"; //tagınız
    let subzero1 = "787985373296984064"; //sunucu ID
    let zeze = "787986407578271754"; //log kanal id
    let subzero = "787986335214338069"; // rol ID
    if (
      newUser.username.includes(zezeexe) &&
      !client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .roles.has(subzero)
    ) {
      client.channels
        .get(zeze)
        .send(
          `${newUser} Ailemize  ${zezeexe} tagı alarak yeni bir kişi katıldı. <@&${subzero}> rolünü kazandı!`
        );
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .addRole(subzero);
    }
    if (
      !newUser.username.includes(zezeexe) &&
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .roles.has(subzero)
    ) {
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .removeRole(subzero);
      client.channels
        .get(zeze)
        .send(
          `${newUser} Ailemizden biri ${zezeexe} Tagı saldıı için <@&${subzero}> rolünü kaybetti.`
        );
    }
  }
});
////////////////////////////////////////
///afk
client.on("message",async message => {
    let zeze = message
   if (zeze.author.bot || zeze.channel.type === "dm") return;
    var afklar =await db.fetch(`afk_${zeze.author.id}, ${zeze.guild.id}`)
if(afklar){
    db.delete(`afk_${zeze.author.id}, ${zeze.guild.id}`)
    zeze.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = zeze.member.nickname.replace("[AFK] ", "")
    zeze.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   
 console.log(err.zeze)
  }
  }
  var kullanıcı = zeze.mentions.users.first()
  if(!kullanıcı) return
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${zeze.guild.id}`)
  if(await db.fetch(`afk_${zeze.mentions.users.first().id}, ${zeze.guild.id}`)){
  zeze.channel.send(`${zeze.mentions.users.first()} Kullanıcısı Şu Anda Afk.\nAfk Sebebi: **${sebep}**`).then(m=>m.delete(15000))
  }
})
/////////////////////////////////
//odaya sokma //
client.on("ready", async message => {
  const channel = client.channels.get("787986389978841100");
  if (!channel) return console.error("Kanal 'ID' girilmemiş.");
  channel
    .join()
    .then(connection => {
      console.log("Başarıyla bağlanıldı.");
    })
    .catch(e => {
      console.error(e);
    });
});
////////////////////////////////////
///cezalı kodunun devamı çık gir yapsa bile cezalı düşer
client.on("guildMemberAdd", async member => {
  let zeze = await db.fetch(`jail.${member.id}`);
  let goldsaw = member

  if (zeze == "kayıtlı") {
    await goldsaw.removeRole("alınacak rol"); //alıncak roller sırayla
    await goldsaw.addRole("verilecek rol idsi"); //cezalı rol ıd
    let kanal = client.channels.get("kanal idsi"); //log kanal ıd.
    kanal.send(
      `${member} adlı kullanıcı sunucuya katıldı jailde kayıtlı oldugu için yeniden jaile atım.`
    ); //log'a isim
    goldsaw.send(
      `Oncelikle sunucumuza hoşgeldiniz sen onceden jailde oldugun için seni yeniden jaile atmak zorunda kaldım.`
    ); //kişiye yollanıcak mesaj.
  }
});
/////////////////////////////////////////////////////
///Welcome Mesajı///
client.on("guildMemberAdd", async member => {
  var zeze = member.guild.members.size.toString().replace(/ /g, "     ");
  var goldsaw = zeze.match(/([0-9])/g);
  zeze = zeze.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (goldsaw) {
    
    zeze = zeze.replace(/([0-9])/g, d => {
      return {
        "1": "<a:1c:774715793946574898>", /// 0 den 9 a kadar emojilerin hepsinin sunucuda olması lazım
        "2": "<a:2c:774715875307159612>",
        "3": "<a:3c:774716028768747580>",
        "4": "<a:4c:774716028247867413>",
        "5": "<a:5c:774716134648971325>",
        "6": "<a:6c:774716134901153832>",
        "7": "<a:7c:774716267042570280>",
        "8": "<a:8c:774716269206700072>",
        "9": "<a:9c:774716268552257557>",
        "0": "<a:0c:774715682155790337>"
      }[d];
    });
  }
  try {
    
    let embed = new Discord.RichEmbed();
    const kullanıcıadı = member.user.username.replace(/\W/g, "");
    await client.channels
      .get("787986387399213066") ////kanal girmeniz gerkeiyor
      .send(`
<a:mavikelebek:788323516935569409> Sunucumuza Hoşgeldin  **${member}** 
<a:mavikelebek:788323516935569409> Seninle beraber ${zeze}  Kişiyiz !!
<a:mavikelebek:788323516935569409> Kaydının Yapılması İçin Sesli Odaya Gelip Ses Vermen Gerekli. \n 
<a:mavikelebek:788323516935569409> **Hesap:** ${
          new Date().getTime() - member.user.createdAt.getTime() <
          45 * 24 * 60 * 60 * 1000
            ? " <a:guvensiz:774912688375201822> **Tehlikeli** "
            : " <a:guvenli:774912687464906762> **Güvenli** "
        }
<a:mavikelebek:788323516935569409> <@&787986332176875540> Rolündeki Yetkililer Seninle İlgilenecektir.`,

        new Discord.Attachment(
          "" /// gifi değiştirirsiniz
        )
      );
  } catch (err) {
    console.log(err);
  }
});
/////////////////////////

////////////////////////////
///bota cevap verdirtime
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (
    message.content.toLowerCase() === "sa" ||
    message.content.toLowerCase() === "sea" ||
    message.content.toLowerCase() === "selamün aleyküm" ||
    message.content.toLowerCase() === "selamun aleykum"
  ) {
    message
      .reply("Aleyküm Selam  Hoşgeldin <a:yildiz:788324198141132850>")
      .then(m => m.delete(10000));
  }
  if (message.content === "tag") {
    message.channel.send("✰");
    message.react("788324198141132850").then(m => m.delete(5000));
  }
  
});
///////////////////////////////
/// küfür koruma 
client.on("message", message => {
       const kufur = ["orospu","amık","Oç","0ç","yavşak","y3a3rram","a.m.k","A.M.K","or1spu","anan1 s1k1m","orospu evladı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","ağzına sıçim","ağzına sıçayım","ağzına s","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amcıklar","amq","amındaki","amnskm","ananı","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","bitch","yarrak","cibiliyetini","bokbok","bombok","dallama","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","porno","sikiş","s1kerim","puşt","sakso","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
    if (kufur.some(word => message.content.includes(word)) ) {
                 //  bu kısmı açarsaniz yöneticilere küfür izni verirsiniz     if (!message.member.hasPermission("ADMINISTRATOR")) 
       message.channel.send(new Discord.RichEmbed() .setDescription(`✋ ${message.author}, Lütfen küfür etme !!`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("BLACK")).then(m => m.delete(3000));
      message.delete()
      
    }
  
});

//////////////////////

////////////////////////////////////////



//////////////////////caps koruma
 client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 20) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`${msg.author}, Caps kapatır mısın lütfen. `).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

client.login(ayarlar.token); // BU YAZI  HER ZAMAN EN ALTA KALACAK ŞEKİLDE ÇALIŞIN
