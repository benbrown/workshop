# 01. Setup your bot

In this module, you will get your development environment set up to work with the [Azure Bot Service and the Bot Builder SDK.](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0) First, we
will walk through the tools needed to develop and run a bot locally on your laptop. Then, we'll put together the first pieces
of a brand new bot.

## Install important bot building tools

To build a bot, you need to be able to edit and run code, and you'll need to install some of the tools that come with Azure Bot Service.
If possible, install the following tools before you arrive for the workshop so your laptop is ready to go.

The Bot Framework Emulator is an app that provides a chat interface you can use to preview and test your bot.
It can connect to bots running locally on your laptop.
[Download Bot Framework Emulator](https://aka.ms/botframeworkemulator)

Visual Studio Code is a popular editor for working with code. 
[Download Visual Studio Code](https://code.visualstudio.com/)

Node is the programming language and runtime interpretter that turns your static code into a living bot.
Follow the instructions for your operating system to install Node and its suite of tools.
[Download Node](https://nodejs.org/en/download/)

After installing Node, install the `msbot` command line tool. You'll use this tool in the step to initialize your new bot project.

```
npm install -g msbot
```

## Initialize a bot project:

### Create a new folder for your project:

```
mkdir bot_project ; cd bot_project
```

### Use the [msbot command line tool](https://github.com/Microsoft/botbuilder-tools/blob/master/packages/MSBot/README.md) to create a .bot file:

```
msbot init
```

* Answer "workshop" as bot's name.
* Answer `http://localhost:3978/api/messages` for endpoint
* Answer "no" to "appid".
* Answer "no" to encrypt.

This will result in [workshop.bot](workshop.bot) being createad. This bot file contains information about your bot's configuration,
and works with all of the Azure Bot Services tools like the Bot Framework Emulator.

### Use npm to initialize the package.json file

```
npm init
```

* Answer "workshop_bot" for the package name.
* Accept defaults for all the additional options.

This will result in [package.json](package.json) being created. This file contains informaiton about your Node project,
including a list of modules your project depends on to run. The next step is to install some of those modules.

### Install Bot Builder SDK and extensions

Using npm, install the Bot Builder SDK and all the extension libraries. You won't use some of these until later in the workshop, 
but its easier to get this out of the way up front. 

You will install:
* [botbuilder](https://www.npmjs.com/package/botbuilder) - the core SDK.
* [botbuilder-ai](https://www.npmjs.com/package/botbuilder-ai) - tools for using [LUIS](https://www.luis.ai) and [QnA Maker](https://www.qnamaker.ai).
* [botbuilder-azure](https://www.npmjs.com/package/botbuilder-azure) - tools for integrating with Azure storage.
* [botbuilder-dialogs](https://www.npmjs.com/package/botbuilder-dialogs) - extension to the SDK for handling dialog.
* [botframework-config](https://www.npmjs.com/package/botframework-config) - helper functions for loading information from the .bot file.

```
npm install --save botbuilder botbuilder-ai botbuilder-azure botbuilder-dialogs botframework-config
```

In addition to Bot Builder, you need a few open source libraries.

You will install:
* [restify](https://www.npmjs.com/package/restify) - a web server component.
* [dotenv](https://www.npmjs.com/package/dotenv) - a helper to load environment variables.
* [path](https://www.npmjs.com/package/path) - a helper to handle dealing with files.

```
npm install --save restify dotenv path
```

Now you have everything you need to create the main application file and boot up a bot process.

Note: All as you install these libraries, the associated files files are stored in the `node_modules` folder, and references to them are added to `package.json`. To re-install the libraries in the future, type `npm install`.

## Create the main application file

This new project needs a main file to contain the application definition. 
Create a file called [index.js](index.js) in Visual Studio Code alongside the other files in your project folder. 
Then, follow the steps below to add the code for your bot.

Step 1: Import some components from external libraries.

To use the modules you installed in the last step, you need to "require" them into the main application.
 
 ```javascript
 const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
 const { BotConfiguration } = require('botframework-config');
 const restify = require('restify');
```

Step 2: Initialize the application environment with values from a .env file.

This single line of code imports the `dotenv` library, and at the same time, causes it to load the values from the .env file into an object called `process.env`.
This makes handling runtime settings easier during development - without the .env file, you would be required to pass in the appropriate settings each time you launch the bot.
Once your bot goes into production, these settings will likely be managed via tools provided by your hosting service.

```javascript
 require('dotenv').config();
```

Create a file called [.env](.env) and add the following initial values. `botFilePath` is a variable used to point the application at the .bot file you created earlier.
```
botFilePath=workshop.bot
```

Step 3: Create the bot's adapter. This object is responsible for sending and receiving messages, and provides functionality for dealing with the messaging channel.
In this case, we'll be using a `BotFrameworkAdapter`, which connects a bot to a suite of Azure Bot Service channels like Slack, Skype, and Microsoft Teams.
It also provides compatability with the Bot Framework Emulator.

This is only one type of adapter - developers can build adapters to connect Bot Builder to other messaging channels or protocols. For example, [See this sample app that uses a custom adapter to connect a bot to the console command line](https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/01.console-echo).

```javascript
const adapter = new BotFrameworkAdapter({});
```

Step 4: Create a web server. 

Restify provides an easy to use but feature rich webserver. By default, it will only respond to URLs you specifically define in your code.
The code below will create the server, and configure it to serve content at a specific port (defaulting to 3978, but customizable via the .env file).

```javascript
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});
```

Step 5: Define an endpoint URL used to receive messages from Bot Framework.
The code below creates an endpoint that will accept a POST request to `/api/messages`.

```javascript
server.post('/api/messages', (req, res) => {
    // do something here.
});
```

Step 6: Process the incoming request into a TurnContext using [adapter.processActivity()](https://docs.microsoft.com/en-us/javascript/api/botbuilder/botframeworkadapter?view=botbuilder-ts-latest#processactivity).

The first job the adapter does is turn a raw incoming webhook request into a usable object.
The TurnContext includes the original data from the messaging channel as well as functionality to
track the message as it is processed and a response is delivered. You'll learn more about that in upcoming modules.

```javascript
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {

    });
});
```

Step 7: Send a simple response to the incoming event.

The code below uses the TurnContext's [sendActivity()](https://docs.microsoft.com/en-us/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#sendactivity) method, to send a reply to the incoming event.

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

### Load in emulator

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

* [How Bots Work](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=cs)
* [Bot Builder SDK Quickstart Guide](https://docs.microsoft.com/en-us/azure/bot-service/javascript/bot-builder-javascript-quickstart?view=azure-bot-service-4.0)
* [BotFrameworkAdapter Class reference](https://docs.microsoft.com/en-us/javascript/api/botbuilder/botframeworkadapter?view=botbuilder-ts-latest)
* [Docs for the Restify webserver module](http://restify.com/docs/home/)
* [Sample app: Console bot](https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/01.console-echo) - This sample includes a custom adapter that allows the bot to chat via the console.
* [Sample app: Echobot with Counter](https://github.com/Microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/02.echobot-with-counter) - This sample demonstrates receiving messages, sending replies, and persisting state between messages.

**[NEXT MODULE](../02.echo_bot)**