# smooch-websdk-auth-demo
User authentication on Web Messenger

## What does it do?
This project is a demo on how to implement user authentication with Sunshine Conversation and the WebMessenger:
1. Using a login form directly on the webpage
1. By sending a webview to the user for authentication 


## How does it work?
The frontend is a webpage with the WebMessenger enabled. The webpage simulates the business/appMaker to avoid having to use another tool (for example Postman).

The login process works that way:
1. The user provides his userId and password on the interface (either on the webpage or on the webview, in the chat) 
2. The frontend passes the credentials to the backend to be validated
3. The backend checks the credential (any credential is valid in this demo) and generates a JWT using the provided key/secret
4. The backend answers by returning the JWT and userID
5. The frontend calls Smooch.login with the given information. If the login is successful, the anonymous appUser is merged with the existing appUser and the history of the conversation is retreive in the WebMessenger.

## How to make it run?

### Prerequisite
1. A Sunshine conversation App
2. An appUser with a userId of your choice that you will use for login

### Installation
After cloning the repo, you need to install the required dependencies:
`npm install`
Then run the NodeJS server (it listens by default to port 8000)

### During runtime
When loading the page, you are prompted to input the appId on which you want to do you test.

Then, start by providing you Sunshine Conversation app key and secret in the "AppMaker configuration" section. Then click on InitAppMaker. You should have a confirmation message saying that the appMaker has been initialized.

![screen shot](https://media.smooch.io/apps/5cd1bb239d361e0010dc18ed/qs-8iCanDk1-iqZmoLMopoIE/Screen%20Shot%202019-11-14%20at%205.23.30%20PM.png)

Then you can either click the "Push a login request" to send the authentication webview to the current user. Or you can directly login on the "User login" form.

![screen shot](https://media.smooch.io/apps/5cd1bb239d361e0010dc18ed/E5f8PAG9gpwNYlPQTxAmxO6P/Screen%20Shot%202019-11-14%20at%205.23.35%20PM.png)

Whenever you want to run a new test, you have the option to reset the WebMessenger and therefore create a new anonymous user using the "New User" button.

![screen shot](https://media.smooch.io/apps/5cd1bb239d361e0010dc18ed/_lEbdWTveQivTwHDeVTQzMfe/Screen%20Shot%202019-11-14%20at%205.23.21%20PM.png)
