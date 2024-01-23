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
`npm install`<br>
Then run the NodeJS server (it listens by default to port 8000)

### Run it with your account
 1. Copy index.html file under file under '/public' directory and replace "index" to your subdomain

 2. Change the values for the following variable at the respective lines:
     - L7 : Webwidget `integration_id` can be found in debuggler or the logs
     - L32, L33 : SunCo API key/secret can be generated on the Admin Center > Account > End user authentication > Messaging tab
     - L74 : Uncomment `configBaseUrl` parameter and add your subdomain URL eg. `configBaseUrl`: `https://<subdomain>.zendesk-staging.com/sc/sdk`
     - L76 : Set `canUserSeeConversationList` to true for multi-convo capability

 3. Run 'node index.js'

 4. Open http://localhost:8000/<subdomain>.html in the browser

### During runtime
When loading the page, you are prompted to input the appId on which you want to do you test.

Then, start by optionally modifying your Sunshine Conversation app key and secret in the "AppMaker configuration" section. Then click on InitAppMaker. You should have a confirmation message saying that the appMaker has been initialized.

<img width="354" alt="image" src="https://github.com/zendesk/sunshine-conversations-websdk-auth-demo/assets/97223593/81c15b17-2471-4245-90e3-e95e4b6156df">

The widget will be loaded and initialized and you may start a conversation right away.

<img width="186" alt="image" src="https://github.com/zendesk/sunshine-conversations-websdk-auth-demo/assets/97223593/fce609d2-a86e-489e-9f35-45a50082895b">

Use the login form to simulate a login on the customer's website, providing the following details:<br>
1. UserId: (External ID)
2. Email: (Email)
3. Verified: (whether or not email is verified by the customer)
<br>Note that in the real use case, the end user simply logs in using their credentials and the above details are sent to Zendesk by the customer on the end user's behalf.

<img width="355" alt="image" src="https://github.com/zendesk/sunshine-conversations-websdk-auth-demo/assets/97223593/b356a465-4332-4a74-95e9-3debde38d01c">

Whenever you want to run a new test, you have the option to reset the WebMessenger and therefore create a new anonymous user using the "New User" button.

<img width="246" alt="image" src="https://github.com/zendesk/sunshine-conversations-websdk-auth-demo/assets/97223593/f3c1f0d6-6243-48ea-96bb-e0370ca8b6d5">

