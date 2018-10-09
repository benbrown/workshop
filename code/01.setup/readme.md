# 01. Setup your bot


## Install important bot building tools

This workshop uses NodeJS. Follow the instructions for your operating system at the link below to install Node on your computer.

[Download Node](https://nodejs.org/en/download/)

Install msbot command line tool:

```
npm install -g msbot
```

Install the Bot Framework Emulator:

[Download Bot Framework Emulator](https://aka.ms/botframeworkemulator)

We'll use Visual Studio Code to edit code:

[Install Visual Studio Code](https://code.visualstudio.com/)


## Initialize the project:

### Use the msbot command line tool to create a .bot file:

```
msbot init
```

* Answer "workshop" as bot's name.
* Answer `http://localhost:3978/api/messages` for endpoint
* Answer "no" to "appid"
* Answer "no" to encrypt

This will result in [workshop.bot](workshop.bot) being createad. This bot file contains information about your bot's configuration,
and works across all of the Azure Bot Services tools like the Bot Framework Emulator.

### Use npm to initialize the package.json file

```
npm init
```

* Answer "workshop_bot" as package name
* Accept defaults for additional options

This will result in [package.json](package.json) being created. This file contains informaiton about your Node project,
including a list of modules your project depends on to run. The next step is to install some of those modules!

### Install Bot Builder and associated tools into the library

Using npm, install all of the Bot Builder libraries. We won't use some of these til much later in the workshop, but its easier to just get this out of the way up front. 

We'll install:

* [botbuilder](https://www.npmjs.com/package/botbuilder) - the main library
* [botbuilder-ai](https://www.npmjs.com/package/botbuilder-ai) - tools for using LUIS and QnA Maker
* [botbuilder-azure](https://www.npmjs.com/package/botbuilder-azure) - tools for integrating with Azure storage
* [botbuilder-dialogs](https://www.npmjs.com/package/botbuilder-dialogs) - extension to the SDK for handling dialog
* [botframework-config](https://www.npmjs.com/package/botframework-config) - helper functions for loading information from the .bot file

```
npm install --save botbuilder botbuilder-ai botbuilder-azure botbuilder-dialogs botframework-config
```

In addition to Bot Builder, we need a few open source libraries. 

We'll install:
* [restify](https://www.npmjs.com/package/restify) - a http server 
* [dotenv](https://www.npmjs.com/package/dotenv) - a helper to load environment variables
* [path](https://www.npmjs.com/package/path) - a helper to handle dealing with files

```
npm install --save restify dotenv path
```

Now we've got everything we need to create the main application file and boot up a bot process.

Note: All of these files got stored in the `node_modules` folder, and references to them are added to `package.json`.

## Create the main application file

Our project needs an [index.js](index.js) file to start. Create it in visual studio code along side the other files.

Step 1: Import some components from external libraries.
 
 ```javascript
 const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
 const { BotConfiguration } = require('botframework-config');
 const restify = require('restify');
```

Step 2: Initialize our application environment with values from the .env file

```javascript
 require('dotenv').config();
```

Create a file called [.env](.env) and the following:
```
botFilePath=workshop.bot
```

Step 3: Create the bot's adapter. It is responsible for sending and receiving messages for the bot. 

```javascript
const adapter = new BotFrameworkAdapter({});
```


Step 4: Create a web server. 

```javascript
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});
```

Step 5: Define an endpoint URL used to receive messages from Bot Framework.
```javascript
server.post('/api/messages', (req, res) => {

});
```

Step 6: Process the incoming request into a TurnContext.
```javascript
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {

    });
});
```

Step 7: Send a simple response to the incoming event.
```javascript
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        console.log('Incoming activity: ', context.activity);

        await context.sendActivity(`RECEIVED: ${ context.activity.type }`);
    });
});
```

Your resulting file should match [index.js](index.js).

## Boot the bot!

From the command line, run:

```
node index.js
```

You should see output like:
```
restify listening to http://[::]:3978
```

IF YOU DON'T:

what could go wrong? 
common errors?

## Load in emulator

* Open the Bot Framework Emulator
* Select "Open Bot"
* Choose workshop.bot

The framework will connect to your bot. You'll see it send a few messages immediately, demonstrating that your bot is receiving activities.  

Any time you send a message, the bot should reply immediately with a confirmation.

IF IT DOESN'T:

* make sure app is running
* make sure bot framework bot configuration is loaded (should see Live Chat (Workshop) in title bar)


## MODULE COMPLETE!

You now have the essential tools for building a bot installed and ready to extend.

## Extra credit Reading

* Console Bot Sample
* Echobot with counter sample
* Docs about Bot Adapters
* Restify docs

## [NEXT MODULE](../02.echo_bot)