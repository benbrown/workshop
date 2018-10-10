# 02. Set up your bot's robot ears

In [module 01](../01.setup), we got a very simple bot application booted up and talking to the Bot Framework Emulator.
Now, we'll learn how to dig into the incoming message event to access and use the text of the user's message.

## Activities

All the details of any event or message to or from your bot takes the form of an `Activity`.  Incoming activities are
found in the `context.activity` field. 

Bots receive all sorts of activities - only some of which represent a message typed out by a human. Some activities represent users joining or quitting a chat session. Others represent non-message actions taken by users - for example files being uploaded, or actions taken by users on other messages - for example a user "liking" a comment. **Not every activity has a "text" field with a free form message.**

Every activity has a type field, found at `context.activity.type`. Before trying to access any other values in the activity, it is important that you first ensure you've got the right type of activity.

The Bot Builder SDK comes with a handy `ActivityTypes` object that you can use to test incoming activities. [Here's the full list of activity types you might see](https://docs.microsoft.com/en-us/javascript/api/botframework-schema/activitytypes?view=botbuilder-ts-latest).

## Message Text

Message activities have a `text` field that contains the text sent by the user. So, after ensuring you've got a message activity, you can access it at `context.activity.text`.

In your index.js file, inside the call to `adapter.processActivity`, add:

```javascript
if (context.activity.type === ActivityTypes.Message) {
    await context.sendActivity(`ECHO: ${ context.activity.text }`);
} else {
    await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
}
```

Your `index.js` file should [now match this file](index.js).

Save your changes, then  restart the Node app in your console by pressing `CTRL-C` on your keyboard. This will bring you back to the command line.

<!-- TODO: Do we maybe want to use the Visual Studio built in console? Could we make the instructions more specific? -->

Restart the Node app, and click "Start Over" in the emulator.

```
node index.js
```

(screenshot?)

Now, notice that when you send a message, instead of saying "RECEIVED: message", the bot will echo whatever text you send it.
This is a simple use of user input, but at this point hopefully you can start to see how your bot will interact with the world,
and all of the things made possible by this seemingly simple exchange of messages between human and machine.

Ah!

In addition to the echos our bot now sends, you will have noticed 2 messages about conversationUpdate events. These are caused by some of those non-message activities mentioned before. conversationUpdate activities are sent for a variety of reasons, but the 2 you see when at this point are something that every bot should recognize and be ready to respond to.

In the next module, we'll learn how to these conversationUpdate activities to send greetings to users when they first meet your bot.

## MODULE COMPLETE!

**[NEXT MODULE](../03.welcome_bot)**: Teach your bot some manners

## Extra credit Reading

* [Activity Types reference](https://docs.microsoft.com/en-us/javascript/api/botframework-schema/activitytypes?view=botbuilder-ts-latest)
* [TurnContext Class Reference](https://docs.microsoft.com/en-us/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest)
* [sendActivity() Method](https://docs.microsoft.com/en-us/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#sendactivity)