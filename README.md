## Table of Contents
- [PilgrimBot Overview](#pilgrimbot-overview)
  - [Setup](#setup)
  - [Running the Bot](#running-the-bot)

# PilgrimBot Overview
This is the bot that runs the pilgrims event in UW CSE 2024.
Note: Pilgrim Bot currently does not support users crossing multiple servers with Pilgrim Bot on it

## Setup

1. Install `node`, use latest version over LTS!
2. Clone the repo
3. run `npm install` to install packages specified in `package.json`
4. Have a Discord server where you have admin privileges. (Probably easiest to just create 
   a dedicated private bot testing server if you don't have one already).
5. Follow [these steps here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) 
   to create a Discord application and bot.
6. Connect your bot to your server following [these steps](
   https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link)

   > NOTE: For development it's probably easiest to just give your bot admin privileges.
7. Create a file named `.env` in the root folder of this project.  
   Use the syntax `KEY_NAME=VALUE_SOMETHING` (similar to bash stuff) inside the `.env` file to set 
   the following environment variables the bot needs to run:
      | KEY_NAME        | Description                                                                |
      | --------------- | -------------------------------------------------------------------------- |
      | `token`         | The bot's token, comes from step where you created bot                     |
      | `prefix`        | The prefix for bot commands. If empty bot will not respond to any messages |
      | `mongoURI`      | Your own local development mongoURI                            |
      | `pilgrimRoleId` | Discord ID of the role to be pinged for pilgrimages\*                      |
      | `weisCornerId`  | Discord ID of the channel for that pilgrimages occur in \*                 |
      
      \* These IDs can be obtained by setting Discord to developer mode (User Settings > 
      Advanced > Developer Mode)

Optional: Create a local dev mongoDB cluster
1. Go to [mongoDB](https://www.mongodb.com/cloud/atlas)
2. Create an account and sign in
3. Click 'Create new project' and then 'Build cluster'
4. Select a provider/region with a free tier
5. Create the cluster (it takes a short while to build)
6. Click 'Connect' under the cluster
7. Set up IP address and user
8. Select 'Connect Your Application' on the next page
9. Copy the connection string on the next page, this is your **mongoURI**
10. Replace the items in the mongoURI with your access username and password, set it up in the .env file, and you have connected to mongo!

After this you should be good to run the bot!

## Running the Bot

Run the bot by running `node index.js` (or `node .` to save on keystrokes) in the project root directory.

You should see `Pilgrims is online!` output to the console. 

Try typing `!help` (replacing the `!` with whatever prefix you set in your `.env`) in the server you have
the bot in. It should DM you a list of its commands.
