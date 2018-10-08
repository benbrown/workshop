# 02. Set up your bot's robot ears

Let’s add some very simple functionality to have the bot understand what type of event it is receiving, then reply with an echo.

Add a line that checks the type of activity, explain how there are lots of different types of events a bot might see. 

```javascript
if (context.activity.type === ActivityTypes.Message) {

} else {
    await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
}
````

Add code to send an echo back to the user. Talk about context.activity.message.text

```javascript
    await context.sendActivity(`ECHO: ${ context.activity.text }`);
```

Restart the app, start again in the emulator.

```
node index.js
```

Now, notice that the ACKs are not sent, but rather bot will echo what users send.  

We also see 2 conversationUpdate events whenever it starts.

There ARE some of those non-message events that are useful! Like the conversationUpdate event.

We'll use those to greet users when they connect.


## MODULE COMPLETE!

## Extra credit Reading


## [NEXT MODULE](../03.welcome_bot)