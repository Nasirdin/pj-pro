const { Telegraf, Markup } = require("telegraf");
const cron = require("node-cron");
const channelId = "-1001854007813";
require("dotenv").config();

const bot = new Telegraf("5468032704:AAHm4jMXFBQnpPDEI3ZoQuDgf74g-8Sr5Hg");
let allRegUsers = [
  { userId: 1, username: "Nasirdin1" },
  { userId: 2, username: "danbazarbekov" },
  { userId: 3, username: "satymkulow" },
  { userId: 4, username: "aktaann" },
];
let allUsers = [
];
const wordsForEveryDay = [
  "- Не могу дождаться, чтобы собрать тусовку в эти выходные",
  "- А если бы мы сейчас держались за руки 😏",
  "- Иногда самые совершенные вещи не имеют никакого смысла. Это нормально ",
  "- Прости, я потерялся, глядя в твои глаза",
  "- 🦈🦈 Эти ребята классные",
  "- Махаться будешь?",
  "- С тобой так хорошо, а без тебя ещё лучше 😊",
  "- Добро пожалуйста в проект самых крутых ребят",
  "- Прекрасный мир, ведь в нём есть такие красивые люди как ты и твоя дальная тётя",
  "- Ты не возражаешь? Я пытался не влюбится сегодня, не вышло",
  "- Давай посидим всю ночь и вместе встретим восход солнца. Потом будем спать до 6-вечера как убитые",
  "- Давай состаримся вместе",
  "- Я хочу дать тебе лучшую версию себя",
  "- О, наша любовь? это наш маленький секрет",
  "- Не всё начинается с понедельника! Кроме учёбы",
  "- Вы можете мне помочь? У меня сломался телефон и в нем нет вашего номера",
  "- У вас очень много красивых изгибов, но улыбка лучший из них",
  "- Здесь жарко или вы горячий, словно огонь?",
  "- Ёлки палки, проснись уже",
  "- Ну и как спалось сегодня? 🙃",
  "- Чё, проспал как и я?",
];

const checkUser = async (ok, ctx) => {
  const findUser = allRegUsers.filter((user) => {
    return ctx.from.username === user.username;
  });
  if (!findUser[0]) {
    ctx.reply("Чтобы стать участников проекта #PROJECT21 обращайтесь к @danbazarbekov");
    return false;
  } else {
    return true;
  }
};

const COMMANDS = [
  {
    command: "/start",
    description: "Перезапустить бота",
  },
  {
    command: "/help",
    description: "Помощь",
  },
  {
    command: "/mypoints",
    description: "Мои баллы",
  },
  {
    command: "/checkUsers",
    description: "Данные участиков",
  },
  {
    command: "/checkRegUsers",
    description: "Список участников",
  },
  {
    command: "/delete",
    description: "Удалить участника",
  },
  {
    command: "/deleteReg",
    description: "Удалить участника из списка",
  },
  {
    command: "/add",
    description: "Добавить участника в список",
  },
];
const help = `У вас есть доступ только к этим командам -
/start - Перезапустить бота
/mypoints - Мои баллы
`;

bot.start(async (ctx) => {
  try {
    let ok = false;
    const findUser = await checkUser(ok, ctx);
    if (findUser) {
      ctx.reply(`Я чат-бот #PROJECT PRO: и я твой персональный помощник на следующие дни`);
      const username = ctx.message.from.username;
      const chatId = ctx.message.chat.id;
      const newUser = {
        chatId: chatId,
        username: username,
        bonus: 0,
        timeOutTraining: true,
        timeOutFood: true,
        timeOutClock: true,
      };
      if (!allUsers[0]) {
        const newUsers = [{ userId: 1, ...newUser }];
        allUsers = newUsers;
      } else {
        let findUser = false;
        allUsers.filter((element) => {
          if (element.username === username) {
            findUser = true;
          }
        });
        if (!findUser) {
          const newArr = allUsers.map((el) => {
            return el.userId;
          });
          userId = Math.max(...newArr) + 1;

          const newUsers = [...allUsers, { userId, ...newUser }];
          allUsers = newUsers;
        }
      }
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
});

// ADD and DELETE ==============================================
bot.command("add", async (ctx) => {
  try {
    if (ctx.from.username === "danbazarbekov" || ctx.from.username === "Nasirdin1") {
      const message = ctx.message.text.split(" ");
      if (message.length <= 1) {
        ctx.reply(`Проверьте правильность написания.
Пример: /add danbazarbekov`);
        return false;
      }

      if (!allRegUsers[0]) {
        const newUser = [{ userId: "1" * 1, username: message[1] }];
        allRegUsers = newUser;
        ctx.reply("Пользователь успешно добавлен!");
      } else {
        let findUser = false;
        allRegUsers.filter((element) => {
          if (element.username === message[1]) {
            findUser = true;
          }
        });
        if (!findUser) {
          const newArr = allRegUsers.map((el) => {
            return el.userId;
          });
          userId = Math.max(...newArr) + 1;
          allRegUsers = [...allRegUsers, { userId, username: message[1] }];
          ctx.reply("Пользователь успешно добавлен!");
        } else {
          ctx.reply("Ползователь уже добавлен!");
        }
      }
    } else {
      ctx.reply(`Дастан это ты? 🤨
  
${help}`);
    }
  } catch (error) {
    console.error(error);
  }
});
bot.command("delete", async (ctx) => {
  try {
    if (ctx.from.username === "danbazarbekov" || ctx.from.username === "Nasirdin1") {
      const message = ctx.message.text.split(" ");
      const deleteUser = allUsers.filter((user) => {
        return `${user.username}` !== message[1];
      });
      if (message.length == 1) {
        ctx.reply(`Ауу где половина? )
Пример: /delete ${ctx.from.username}`);
        return false;
      }
      if (allUsers.length === deleteUser.length) {
        ctx.reply(`Пользователь не найден!
Проверьте правильность написания.
Пример: /delete ${ctx.from.username}`);
      } else {
        allUsers = deleteUser;
        ctx.reply(`Пользователь @${message[1]} успешно удален`);
      }
    } else {
      ctx.reply(`Хмм! Где Дастан? 😠

${help}`);
    }
  } catch (error) {
    console.error(error);
  }
});
bot.command("deleteReg", async (ctx) => {
  try {
    if (ctx.from.username === "danbazarbekov" || ctx.from.username === "Nasirdin1") {
      const message = ctx.message.text.split(" ");
      const deleteUser = allRegUsers.filter((user) => {
        return `${user.username}` !== message[1];
      });
      if (message.length == 1) {
        ctx.reply(`Ауу где половина? )
Пример: /deleteofthelist ${ctx.from.username}`);
        return false;
      }
      if (allRegUsers.length === deleteUser.length) {
        ctx.reply(`Пользователь не найден!
Проверьте правильность написания.
Пример: /delete ${ctx.from.username}`);
      } else {
        allRegUsers = deleteUser;
        ctx.reply(`Пользователь @${message[1]} успешно удален`);
      }
    } else {
      ctx.reply(`Вы кто? да да Вы!

${help}`);
    }
  } catch (error) {
    console.error(error);
  }
});
//  END ADD and DELETE =========================================

// CHECK USERS =================================================
bot.command("checkRegUsers", (ctx) => {
  try {
    if (ctx.from.username === "danbazarbekov" || ctx.from.username === "Nasirdin1") {
      const res = allRegUsers.map((user) => {
        return `${user.userId} : @${user.username}`;
      });
      ctx.replyWithHTML(`All users ethparisbot:
            
${res.join(`
`)}
            
Общее количество пользователей: ${allRegUsers.length}`);
    } else {
      ctx.reply(`Жаль( что вы не Дастан!!
      
  ${help}`);
    }
  } catch {
    console.error(error);
  }
});
bot.command("checkUsers", (ctx) => {
  try {
    if (ctx.from.username === "danbazarbekov" || ctx.from.username === "Nasirdin1") {
      const a = allUsers.map((e) => {
        return `${e.userId}: @${e.username} - ${e.bonus} балл`;
      });
      ctx.reply(`Данные участников
${a.join(`
`)}
    
Общее количество пользователей: ${allUsers.length}`);
    } else {
      ctx.reply(`Жаль( что вы не Дастан!!
    
${help}`);
    }
  } catch (error) {
    console.error(error);
  }
});
//END  CHECK USERS =============================================

// USERS COMMANDS ==============================================
bot.command("mypoints", async (ctx) => {
  try {
    let ok = false;
    const findUser = await checkUser(ok, ctx);
    if (findUser) {
      const point = allUsers.filter((user) => {
        return user.username === ctx.from.username;
      });
      ctx.replyWithHTML(`Вы набрали ${point[0].bonus} баллов`);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
});
bot.on("video_note", async (ctx) => {
  try {
    let ok = false;
    const findUser = await checkUser(ok, ctx);
    if (findUser) {
      await ctx.replyWithHTML(
        "Это отчёт за...",
        Markup.inlineKeyboard([
          [Markup.button.callback("- Тренировку ", "training")],
          [Markup.button.callback("- Рацион питания", "food")],
          [Markup.button.callback("- Подъём в 06:00", "clock")],
        ])
      );
      ctx.telegram.forwardMessage(channelId, ctx.message.chat.id, ctx.message.message_id);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
});
bot.on("video", async (ctx) => {
  try {
    let ok = false;
    const findUser = await checkUser(ok, ctx);
    if (findUser) {
      await ctx.replyWithHTML(
        "Это отчёт за...",
        Markup.inlineKeyboard([
          [Markup.button.callback("- Тренировку ", "training")],
          [Markup.button.callback("- Рацион питания", "food")],
          [Markup.button.callback("- Подъём в 06:00", "clock")],
        ])
      );
      ctx.telegram.forwardMessage(channelId, ctx.message.chat.id, ctx.message.message_id);
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
});

const report = async (ctx, type) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    await ctx.replyWithHTML("✅ Отчёт принят! + балл");
    const addBonus = allUsers.map((element) => {
      if (element.username === ctx.from.username) {
        const newBonus = {
          userId: element.userId,
          chatId: element.chatId,
          username: element.username,
          bonus: element.bonus + 1,
          timeOutTraining: type == "training" ? false : element.timeOutTraining,
          timeOutFood: type == "food" ? false : element.timeOutFood,
          timeOutClock: type == "clock" ? false : element.timeOutClock,
        };
        return newBonus;
      } else {
        return element;
      }
    });
    allUsers = addBonus;
  } catch (error) {
    console.error(error);
  }
};
bot.action(`training`, async (ctx) => {
  const userArray = allUsers.filter((e) => {
    return e.username === ctx.from.username;
  });
  if (!userArray[0].timeOutTraining) {
    await ctx.replyWithHTML("Вы уже отправили отчет о тренировке!");
  } else {
    let type = ctx.update.callback_query.data;
    report(ctx, type);
  }
});
bot.action(`food`, async (ctx) => {
  const userArray = allUsers.filter((e) => {
    return e.username === ctx.from.username;
  });
  if (!userArray[0].timeOutFood) {
    await ctx.replyWithHTML("Вы уже отправили отчет!");
  } else {
    let type = ctx.update.callback_query.data;
    report(ctx, type);
  }
});
bot.action(`clock`, async (ctx) => {
  const userArray = allUsers.filter((e) => {
    return e.username === ctx.from.username;
  });
  if (!userArray[0].timeOutClock) {
    await ctx.replyWithHTML("Вы уже отправили отчет");
  } else {
    let type = ctx.update.callback_query.data;
    report(ctx, type);
  }
});
bot.command("help", (ctx) => {
  const res = COMMANDS.map((e) => {
    return `${e.command} - ${e.description}`;
  });
  ctx.reply(
    res.join(`
`)
  );
});

// END USERS COMMANDS ==============================================

// CRON ===============================================
let textOfTheDay = 3;

cron.schedule("0 0 0 * * *", async () => {
  const timeOut = allUsers.map((element) => {
    const newBonus = {
      userId: element.userId,
      chatId: element.chatId,
      username: element.username,
      bonus: element.bonus,
      timeOutTraining: true,
      timeOutFood: true,
      timeOutClock: true,
    };
    return newBonus;
  });
  allUsers = timeOut;
  if (textOfTheDay == 21) {
    textOfTheDay = 0;
  } else {
    textOfTheDay += 1;
  }
  allUsers.map((user) => {
    bot.telegram.sendMessage(
      user.chatId,
      !wordsForEveryDay[textOfTheDay] ? wordsForEveryDay[7] : wordsForEveryDay[textOfTheDay]
    );
  });
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
