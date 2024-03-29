const { Telegraf, Markup } = require("telegraf");
const cron = require("node-cron");
const channelId = "-1001854007813";
require("dotenv").config();

const bot = new Telegraf("5962910623:AAEFxAKXgf2T_8AOcp3hmkHgxWR4YJAi4jQ");
let allRegUsers = [
  { userId: 1, username: "danbazarbekov" },
  { userId: 2, username: "Reable16" },
  { userId: 3, username: "Nurtilek" },
  { userId: 4, username: "Aknazarr" },
  { userId: 5, username: "nursa_tn" },
  { userId: 6, username: "ulookbek" },
  { userId: 7, username: "azimzki" },
  { userId: 8, username: "Temka" },
  { userId: 9, username: "dan4ik_ky" },
  { userId: 10, username: "kane2701" },
  { userId: 11, username: "abdirov_era" },
  { userId: 12, username: "Nurik" },
  { userId: 13, username: "Abdusomadblog7" },
  { userId: 14, username: "blade00" },
  { userId: 15, username: "Narboto" },
  { userId: 16, username: "spader1maan" },
  { userId: 17, username: "Marat0vi" },
  { userId: 18, username: "mamataliev11" },
  { userId: 19, username: "seidaliev" },
  { userId: 20, username: "yolikmak" },
  { userId: 21, username: "AzhimamatovAr" },
  { userId: 22, username: "nu4asssyl" },
  { userId: 23, username: "aktaann" },
  { userId: 24, username: "matmusaim" },
  { userId: 25, username: "hulioFernandos" },
  { userId: 26, username: "ernoboy" },
  { userId: 27, username: "Nurik_Mubarakov" },
  { userId: 28, username: "aky1chik" },
  { userId: 29, username: "adiletkamal" },
  { userId: 30, username: "Aky1chik" },
  { userId: 31, username: "AlexandYukunin" },
  { userId: 32, username: "Nurtilekov06" },
  { userId: 33, username: "erkhan14" },
  { userId: 34, username: "elnurtvvv" },
  { userId: 35, username: "mirlanrr" },
  { userId: 36, username: "ErzhigitAbdyzhaparov" },
  { userId: 37, username: "Atavaliev" },
  { userId: 38, username: "DmitriAndrr" },
  { userId: 39, username: "arynbekov" },
  { userId: 40, username: "azamatkylychev01" },
  { userId: 41, username: "rusllann989" },
  { userId: 42, username: "true_temka" },
  { userId: 43, username: "masterminddaykg" },
  { userId: 44, username: "Spader1maan" },
  { userId: 45, username: "kh_iln" },
];

let allUsers = [];

// 1: @nu4asssyl - 3 балл
// 2: @seidaliev - 0 балл
// 3: @kane2701 - 0 балл
// 4: @nursa_tn - 1 балл
// 5: @abdirov_era - 1 балл
// 6: @yolikmak - 0 балл
// 7: @dan4ik_ky - 3 балл
// 8: @danbazarbekov - 2 балл
// 9: @matmusaim - 0 балл
// 10: @Nurik_Mubarakov - 4 балл
// 11: @azimzki - 2 балл
// 12: @hulioFernandos - 0 балл
// 13: @blade00 - 1 балл
// 14: @ernoboy - 0 балл
// 15: @Reable16 - 1 балл
// 16: @Narboto - 0 балл
// 17: @adiletkamal - 0 балл
// 18: @Aky1chik - 2 балл
// 19: @AlexandYukunin - 4 балл
// 20: @erkhan14 - 1 балл
// 21: @Nurtilekov06 - 0 балл
// 22: @elnurtvvv - 2 балл
// 23: @ErzhigitAbdyzhaparov - 0 балл
// 24: @AzhimamatovAr - 1 балл
// 25: @Atavaliev - 3 балл
// 26: @DmitriAndrr - 0 балл
// 27: @arynbekov - 0 балл
// 28: @rusllann989 - 1 балл
// 29: @true_temka - 3 балл
// 30: @Spader1maan - 0 балл
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
    ctx.reply(
      "Чтобы стать участников проекта #PROJECT50 обращайтесь к @danbazarbekov"
    );
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
      ctx.reply(
        `Я чат-бот #PROJECT50: и я твой персональный помощник на следующие дни`
      );
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
    if (
      ctx.from.username === "danbazarbekov" ||
      ctx.from.username === "Nasirdin1"
    ) {
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
    if (
      ctx.from.username === "danbazarbekov" ||
      ctx.from.username === "Nasirdin1"
    ) {
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
    if (
      ctx.from.username === "danbazarbekov" ||
      ctx.from.username === "Nasirdin1"
    ) {
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
    if (
      ctx.from.username === "danbazarbekov" ||
      ctx.from.username === "Nasirdin1"
    ) {
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
// bot.command("checkUsersIDID", (ctx) => {
//   try {
//     if (
//       ctx.from.username === "Nasirdin1"
//     ) {
//       const a = allUsers.map((e) => {
//         return `${user.chatId} : ${e.userId}: @${e.username} - ${e.bonus} балл`;
//       });
//       ctx.reply(`Данные участников
// ${a.join(`
// `)}

// Общее количество пользователей: ${allUsers.length}`);
//     } else {
//       ctx.reply(`Жаль( что вы не Дастан!!

// ${help}`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });
bot.command("checkUsers", (ctx) => {
  try {
    if (
      ctx.from.username === "danbazarbekov" ||
      ctx.from.username === "Nasirdin1"
    ) {
      const a = allUsers.map((e) => {
        return `${e.userId}: ${e.chatId} || @${e.username} - ${e.bonus} балл`;
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
      if (point.length === 0) {
        ctx.replyWithHTML(`Упс! Перезапустите бот /start`);
      } else if (point.length === 1) {
        ctx.replyWithHTML(`Вы набрали ${point[0].bonus} баллов`);
      } else {
        ctx.replyWithHTML(`Упс! Перезапустите бот /start`);
      }
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
      ctx.telegram.forwardMessage(
        channelId,
        ctx.message.chat.id,
        ctx.message.message_id
      );
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
      ctx.telegram.forwardMessage(
        channelId,
        ctx.message.chat.id,
        ctx.message.message_id
      );
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
  if (userArray.length === 0) {
    ctx.replyWithHTML(`Упс! Перезапустите бот /start`);
  } else if (!userArray[0].timeOutTraining) {
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
  if (userArray.length === 0) {
    ctx.replyWithHTML(`Упс! Перезапустите бот /start`);
  } else if (!userArray[0].timeOutFood) {
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
  if (userArray.length === 0) {
    ctx.replyWithHTML(`Упс! Перезапустите бот /start`);
  } else if (!userArray[0].timeOutClock) {
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
let textOfTheDay = 6;

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
      !wordsForEveryDay[textOfTheDay]
        ? wordsForEveryDay[7]
        : wordsForEveryDay[textOfTheDay]
    );
  });
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
