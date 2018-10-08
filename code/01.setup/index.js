/**
 * Main bot application file.
 */

 // STEP 1:
 // Import some components from external libraries.
 // UNCOMMENT TO ACTIVATE
//  const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
//  const { BotConfiguration } = require('botframework-config');
//  const restify = require('restify');

 // STEP 2: 
 // Initialize our application environment with values from the .env file
 // UNCOMMENT TO ACTIVATE
//  require('dotenv').config();

// STEP X:
// Create the bot's adapter. It is responsible for sending and receiving messages for the bot.
// UNCOMMENT TO ACTIVATE
// const adapter = new BotFrameworkAdapter({});

// STEP X:
// Create a web server. 
// UNCOMMENT TO ACTIVATE
// const server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function() {
//     console.log(`\n${ server.name } listening to ${ server.url }`);
// });

// STEP X:
// Define an endpoint URL used to receive messages from Bot Framework
// UNCOMMENT TO ACTIVATE
// server.post('/api/messages', (req, res) => {

//     // STEP X:
//     // Process the incoming request into a TurnContext
//     // UNCOMMENT TO ACTIVATE
//     // adapter.processActivity(req, res, async (context) => {

//     //     // STEP X:
//     //     // Send a simple response to the incoming event.
//     //     // UNCOMMENT TO ACTIVATE
//     //     // await context.sendActivity(`RECEIVED: ${ context.activity.type }`);

//     //     // Log the incoming activity to the console
//     //     // console.log('Incoming activity: ', context.activity);

//     // });

// });