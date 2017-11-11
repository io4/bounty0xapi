const request = require('request-promise');
const bcrypt = require('bcrypt');
const DEFAULT_URL = 'https://api.bounty0x.io/v1/';

function Bounty0xClient(opts = {}){
  let self = {};
  self.opts = opts;
  self.opts.url = self.opts.url || DEFAULT_URL
  self.credentials = {};
  self.skeleton = (url, method = "GET") => {
    return {
      method: method,
      uri: self.opts.url + url,
      headers: {
        "clientIdentifier": "Kzn9ureLQmDrx7AT3Kcd",
        "Authorization": "Bearer " + self.credentials.jwt
      },
      json: true
    };
  };
  self.login = function(username, password) {
    let salt = `$2a$10$${Buffer(username + '\u0000'.repeat(16-username.length)).toString("base64")}`;
    return bcrypt.hash(password, salt).then(hash => {
      let o = self.skeleton("login", "POST");
      o.body = {
        username: username,
        password: hash
      };
      return request(o).then(data => {
        self.credentials.username = data.username;
        self.credentials.jwt = data.jwtToken;
        return data;
      });
    });
  }
  self.listBounties = function(){
    let o = self.skeleton("bounty");
    return request(o);
  }
  self.listSubmissions = function(id){
    let o = self.skeleton(`bounty/${id}`);
    return request(o);
  }
  self.listAllSubmissions = function(){
    let o = self.skeleton(`profile/${self.credentials.username}`);
    return request(o).then(data => data.submissionsMade);
  }
  self.submit = function(id, link, comment){
    let o = self.skeleton("submissions", "POST");
    o.body = {
      submissionLink: link,
      comments: comment,
      username: self.credentials.username,
      bountyID: id
    }
    return request(o);
  }
  self.editSubmission = function(id, link, comment){
    let o = self.skeleton("editsubmission", "PUT");
    o.body = {
      submissionLink: link,
      comments: comment,
      username: self.credentials.username,
      submissionID: id
    }
    return request(o);
  }
  self.deleteSubmission = function(id){
    let o = self.skeleton(`deletesubmission/${id}`, "DELETE");
    return request(o);
  }
  self.logout = function(){
    self.credentials = {};
  }
  return self;
}
module.exports = Bounty0xClient;
