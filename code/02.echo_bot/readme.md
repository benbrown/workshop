# 02. Set up your bot's robot ears

In [module 01](../01.setup), we got a very simple bot application booted up and talking to the Bot Framework Emulator.
Now, we'll learn how to dig into the incoming message event to access and use the text of the user's message.

## Activities

All the details of any event or message to or from your bot takes the form of an `Activity`.  Incoming activities are
found in the `context.activity` field.

## Activity Types

Bots receive all sorts of activities - only some of which represent a message typed out by a human. Some activities represent users joining or quitting a chat session. Others represent non-message actions taken by users - for example files being uploaded, or actions taken by users on other messages - for example a user "liking" a comment.

The SDK comes with a handy `ActivityTypes` object we can use to test incoming activities.

## Message Text

Message activities have a `text` field that contains the text sent by the user. So, we can access it at `context.activity.text`.

In your index.js file, inside the call to `adapter.processActivity`, add:

```javascript
if (context.activity.type === ActivityTypes.Message) {
    await context.sendActivity(`ECHO: ${ context.activity.text }`);
} else {
    await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
}
````

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

* Activity Types reference


## [NEXT MODULE](../03.welcome_bot)