const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {
  

  const emoji = client.emojis.cache.find(emoji => emoji.name === "pembekelebek")
const emoji1 = client.emojis.cache.find(emoji => emoji.name === "pembekelebek")
const emoji2 = client.emojis.cache.find(emoji => emoji.name === "pembekelebek")
 if (!message.member.roles.cache.has('787986332176875540') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().addField(`${emoji}  Bilginize` , `${emoji1}  Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL()).setTimestamp());
let rochelle1 = message.mentions.users.first() || client.users.cache.get(args.join(' ')) || message.guild.members.cache.find(c=> c.id === args[0])
  if (!rochelle1) return message.channel.send(new Discord.MessageEmbed().addField(` Bilgi` , `${emoji1}   Bir kullanıcı etiketlemeli ve ya id girmelisin!`).setColor("BLACK").setFooter(message.author.tag ,message.author.avatarURL()).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()/// bu gereksiz sadece çok görünsün diye koymuşdum bu işe yaramıyor bu arada
  let rochelle = message.guild.member(rochelle1)
   let isim = args[1]
      if(!isim) return message.channel.send(new Discord.MessageEmbed().addField(`${emoji}  Bilgi` , `${emoji1} Bir isim girmelisin!`).setColor("BLACK").setFooter(message.author.tag ,message.author.avatarURL()).setTimestamp());
 let yas = args[2]
      if(!yas) return message.channel.send(new Discord.MessageEmbed().addField(`${emoji} Bilgi` , `${emoji1}   Bir Yaş girmelisin!`).setColor("BLACK").setFooter(message.author.tag ,message.author.avatarURL()).setTimestamp());
await rochelle.setNickname(`☆ ${isim} | ${yas}`)
  rochelle.roles.add("787986337507573800"); 
  rochelle.roles.add("787986338305671198"); 

  rochelle.roles.remove("787986339794124840"); // kadın 1
  rochelle.roles.remove("787986340255760406");

 rochelle.roles.remove("787986342889390090") // kayıtsız 1
  rochelle.roles.remove("787986333742268436") // cezalı 1
  

    message.react("777280411704360970");
db.add('yarteyit.'+message.author.id, 1)
    const kanal = message.guild.channels.cache.find(c => c.id == "787986395515715594") 
    const embed1 = new Discord.MessageEmbed() 
    .setDescription(`${emoji2} ${rochelle.user} **Hoşgeldin, seninle beraber \`${rochelle.guild.memberCount}\` üyeye ulaştık**!`)
    .setColor("BLACK")
    .setFooter(message.author.tag ,message.author.avatarURL())
    .setTimestamp()
  let embed = new Discord.MessageEmbed() 
  .setColor("BLACK")
  .setDescription(`${rochelle.user} kullanıcısı başarıyla kız olarak kayıt edildi.`)                                                          
  .setFooter(message.author.tag ,message.author.avatarURL())
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1));

 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k", "gacı"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "kadın",
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "kayıt isim yaş"
};
