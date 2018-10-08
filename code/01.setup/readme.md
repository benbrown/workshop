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
* Answer "http://localhost:3978/api/messages" for endpoint
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

* botbuilder - the main library
* botbuilder-ai - tools for using LUIS and QnA Maker
* botbuilder-azure - tools for integrating with Azure storage
* botbuilder-dialogs - extension to the SDK for handling dialog
* botframework-config - helper functions for loading information from the .bot file

```
npm install --save botbuilder botbuilder-ai botbuilder-azure botbuilder-dialogs botframework-config
```

In addition to Bot Builder, we need a few open source libraries. 

We'll install:
* restify - a http server 
* dotenv - a helper to load environment variables
* path - a helper to handle dealing with files

```
npm install --save restify dotenv path
```

Now we've got everything we need to create the main application file and boot up a bot process.

Note: All of these files got stored in the `node_modules` folder, and references to them are added to `package.json`.

## Create the main application file

Our project needs an [index.js](index.js) file to start. Create it in visual studio code along side the other files.


### Create .env file

Add the following
```
botFilePath=workshop.bot
```

Save to [.env](.env)


