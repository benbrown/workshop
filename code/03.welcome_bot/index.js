/**
 * Main bot application file.
 */

 // Import some components from external libraries.
 const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
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

// Import custom bot runner class
// UNCOMMENT TO ACTIVATE
const { Bot } = require('./bot');
const bot = new Bot();

// Define an endpoint URL used to receive messages from Bot Framework
server.post('/api/messages', (req, res) => {

    // Process the incoming request into a TurnContext
    adapter.processActivity(req, res, async (context) => {

        // Log the incoming activity to the console
        console.log('Incoming activity: ', context.activity);

        // Call the bot runner's turn handler function
        // UNCOMMENT TO ACTIVATE        
        await bot.run(context);

    });

});