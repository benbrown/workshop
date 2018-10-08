/**
 * Main bot application file.
 */

 // Import some components from external libraries.
 const { ActivityTypes, BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
 const { BotConfiguration } = require('botframework-config');
 const restify = require('restify');

 // Initialize our application environment with values from the .env file
 require('dotenv').config();

// Create the bot's adapter. It is responsible for sending and receiving messages for the bot.
const adapter = new BotFrameworkAdapter({});

// Create a web server. 
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});

// Define an endpoint URL used to receive messages from Bot Framework
server.post('/api/messages', (req, res) => {

    // Process the incoming request into a TurnContext
    adapter.processActivity(req, res, async (context) => {

        // Log the incoming activity to the console
        console.log('Incoming activity: ', context.activity);

        // Send a simple response to the incoming event.
        // COMMENT OUT THIS LINE
        // await context.sendActivity(`RECEIVED: ${ context.activity.type }`);

        // UNCOMMENT TO ACTIVATE
        if (context.activity.type === ActivityTypes.Message) {
            await context.sendActivity(`ECHO: ${ context.activity.text }`);
        } else {
            await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
        }

    });

});