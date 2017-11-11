# API Client for Bounty0x.io
## Usage
The client, once initialized, holds session data.

Example of usage:
```
const client = new require("bounty0xapi-contrib");
client.login("jdoe", "letmein!").then(d => {
  console.log(d.username);
  client.submit(164, "whatever.test/screenshot.png", "website stops responding if you press all buttons at once").then(r => console.log(r.submissionID));
});
```
### Client (*opts*)
Opts might contain:
* url: the root url for the API. Defaults to `https://api.bounty0x.io/v1`
* credentials: object with credentials

#### Client.login (username, password)
Logs in using username and password.
Returns a object with login data.
Once the login is done, the session token is stored for future requests.
### Client.listBounties ()
Returns list of bounties.
### Client.listSubmissions (id)
Returns a array of all submissions to a specific bounty made by the user that is logged in.
### Client.bountyInfo (id)
Returns information about a bounty.
### Client.listAllSubmissions ()
Returns a array with all submissions made by user that is logged in.
### Client.submit (id, link, comment)
Makes a submission, to bounty with id `id`, where the submission link is `link` and the comment is `comment`.
Returns information about submission.
### Client.editSubmission (id, link, comment)
Edits the submission wtih submission id `id` to have link `link` and comment `comment`.
Returns information about submission.
### Client.deleteSubmission (id)
Deletes submission with submission id `id`
### Client.logout ()
Removes current session.
### Client.credentials
Holds the credentials used to authenticate with server.
This might be a empty object for a logged out user, or for a logged in user will contain:
* jwt: the JSON Web Token used to authenticate
* username: the username
### Client.opts
Options supplied when initializing.
