# 02. Teach your bot some manners

all bots should welcome users, and introduce themselves

## Create bot.js file

Before we start to get too complicated, break out the handler code into its own function, module or class.  Just something that we call run(context) instead of putting all the code into one amorphous code file.  We'll put this in a new file called [bot.js](bot.js)

```javascript
 const { ActivityTypes } = require('botbuilder');

module.exports.Bot = class Bot {
    constructor () {
        // nothing to do here yet   
    }

    async run(context) {
        if (context.activity.type === ActivityTypes.Message) {
            await context.sendActivity(`ECHO: ${ context.activity.text }`);
        } else {
            await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
        }
    }
}
```

## Update index.js

Go back into index.js and add a new import.

```javascript
// Import custom bot runner class
const { Bot } = require('./bot');
const bot = new Bot();
```

And replace the inline handler code with a call to our new bot.run method:

```javascript
await bot.run(context);
```

## Define welcome behavior

Add a check to see if event is a conversationUpdate

Add code so that bot will send a welcome message for every conversationUpdate

Try it in the emulator.  Oops, we get 2!  Explain that you have to be aware of the MULTI-USER ENVIRONMENT, and that the bot might receive messages and events from itself and other users aside from the main person.

Add code to check and make sure we only send a welcome message to the NON-BOT user.   (TBD - this is slightly complicated because of the code necessary to 100% confirm the user is not the bot. There is an easy but not “correct” way to do this, and a complex but correct way)

Try it again.  Now only one greeting appears!

## MODULE COMPLETE!

## Extra credit Reading


## [NEXT MODULE](../04.menu_bot)