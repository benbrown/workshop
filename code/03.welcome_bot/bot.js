 // Import some components from external libraries.
 const { ActivityTypes } = require('botbuilder');

// Define and export the new bot runner class
module.exports.Bot = class Bot {

    constructor () {
        // nothing to do here yet   
    }

    async run(context) {
        // Check message type.
        // If this is a message, echo it back.
        if (context.activity.type === ActivityTypes.Message) {
            await context.sendActivity(`ECHO: ${ context.activity.text }`);
        // Check to see if this is a conversation update.
        } else if (context.activity.type === ActivityTypes.ConversationUpdate) {
            // await context.sendActivity(`Hello! I am a helpful bot.`);

            // Check to see if this message is from the bot
            if (this.isBotJoin(context)) {
                // The bot should introduce itself when it joins a new conversation.
                await context.sendActivity('I am a helpful bot');
            } else if (this.isUserJoin(context)) {
                // The bot should welcome new people when they join the conversation.
                await context.sendActivity('Hello human!');
            }
        } else {
            // if this is NOT a message, do something else
            await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
        }
    }

    isBotJoin(context) {
        // Were any new members added to this conversation?
        if (context.activity.membersAdded.length !== 0) {
            // Iterate over all new members added
            // Since the bot is the recipient for events from the channel,
            // context.activity.membersAdded === context.activity.recipient.Id indicates the
            // bot was added to the conversation
            for (var m in context.activity.membersAdded) {
                if (context.activity.membersAdded[m].id === context.activity.recipient.id) {
                    return true;
                }
            }
        }
        return false;
    }

    isUserJoin(context) {
        // Were any new members added to this conversation?
        if (context.activity.membersAdded.length !== 0) {
            // Iterate over all new members added
            // Since the bot is the recipient for events from the channel,
            // context.activity.membersAdded === context.activity.recipient.Id indicates the
            // bot was added to the conversation
            for (var m in context.activity.membersAdded) {
                // a user other than the bot joined.
                if (context.activity.membersAdded[m].id !== context.activity.recipient.id) {
                    return true;
                }
            }
        }
        return false;
    }    

}