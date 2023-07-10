const token = "";

const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(token, {polling:true})
let book;
let type;
let payMethod;
const booksInstore ={
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: 'Товар 1', callback_data: '1'}, {text: 'Товар 2', callback_data: '2'}, {text: 'Товар 3', callback_data: '3'}],
        ]

    })
}

const start = () => {
    bot.setMyCommands([
    {command: '/start', description: "Начальное приветствие"},
])

    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, `Здравствуйте! Я чат-бот компании "". 
Я с радостью:
1) Расскажу вам о товарах
2) Помогу вам сделать заказ
3) Соориентирую вас по ценам

Пожалуйста, подтвердите, что вы согласны на передачу персональных данных (имя, адрес, телефон, почта).
` , {
            reply_markup: {
                keyboard: [["Подтверждаю "]],
                resize_keyboard: true,
            }
        });

    });

    bot.on("message", async msg => {
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        const managerId = "472425602";
        const username = msg.from.username;


        if (text === "Подтверждаю"){
            return bot.sendMessage(msg.chat.id, 'Выберите действие',
                {
                    reply_markup: {
                        keyboard: [["Товары 1 категории ", "Товары 2 категории"],   ["Товары 3 категории", "FAQ "]],
                        resize_keyboard: true,
                    }
                })}

        if (text === "Товары 1 категории"){
            return  bot.sendMessage(chatId, `На данный момент доступны для заказа следующие товары:
1. Товар 1" 
2. Товар 2"
3. Товар 3"
`, booksInstore)
        }

        if (text === "Купить электронный вариант") {
            await bot.sendMessage(chatId, "Стоимость электронного варианта ___ рублей.", {
                reply_markup: {
                    keyboard: [["Купить через перевод", "Купить через QR"]],
                    resize_keyboard: true,
                }
            })
            return type = text;
        }

        if (text === "Купить через перевод") {
            await bot.sendMessage(chatId, "Пожалуйста, впишите свои контактные данные: ФИО, почту и телефон»"
                , {
                    reply_markup: {
                        keyboard: [["Главное меню"]],
                        resize_keyboard: true,
                    }
                })
            return payMethod = text;
        }

        if (text === "Купить через QR") {
            await bot.sendMessage(chatId, "Пожалуйста, впишите свои контактные данные: ФИО, почту и телефон»"
                , {
                    reply_markup: {
                        keyboard: [["Главное меню"]],
                        resize_keyboard: true,
                    }
                })
            return payMethod = text;
        }

        let phoneCheck7 = "7"
        let phoneCheckPlus7 = "+7";
        let phoneCheck8 = "8"
        if (msg.text.includes(phoneCheck7)||msg.text.includes(phoneCheck8)||msg.text.includes(phoneCheckPlus7)) {
            await bot.forwardMessage(managerId, chatId, msg.message_id);
            return bot.sendMessage(managerId, `Книга: ${book} вариант: ${type} способ оплаты: ${payMethod} пользователь: @${username}`)
        }

        if (text === "Главное меню") {
            return bot.sendMessage(chatId, 'Выберите действие',
                {
                    reply_markup: {
                        keyboard: [["Товары 1 категории ", "Товары 2 категории"],   ["Товары 3 категории", "FAQ "]],
                        resize_keyboard: true,
                    }
                })}
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId =  msg.message.chat.id;

        if (data === "1"){
            await bot.sendPhoto(chatId, "Insert pic`s URL")
            await bot.sendMessage(chatId, `description of product
`, {
                reply_markup: {
                    keyboard: [["Купить электронный вариант ", "Купить бумажный вариант"]],
                    resize_keyboard: true,
                }
            })
            return book = "product`s tittle";
        }
    })
}
start();
