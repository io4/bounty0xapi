## API Documentation (APIv1)    
As a reference for implementing the API client, a documentation of how the API works is included.    
### Object structures    
A list of all repeated structures are included (such as a Submission)    
* Submission:  
```  
submission {    
    int submissionID, // ID of submission    
    int bountyID, // ID of bounty    
    string bountyTitle, // Title of bounty    
    string username, // Username of user who placed submission    
    string submissionLink, // Link of the submission    
    string comments, // Attached comments    
    string|null status // Status of submission, can be PENDING, REJECTED or APPROVED    
}    
```
* User:
```    
user {    
    int bountyHunterID, // ID of the bounty hunter    
    string username, // Username of hunter    
    null|string password, // The hashed password    
    string fullname, // Full name of the user    
    string emailAddress, // Email address of user    
    string languages, // Languages that the user can manage    
    string country, // Country where the user lives    
    int reviewScore, // Score of reviewScore    
    null|string[] referralCodes, // List (or null of none) of refferal codes the user hash    
    submission[] submissionsMade, // List of submissions made by the user    
    null|string jwtToken, // JWT token of the user    
    string ethwalletAddress // Ethereum wallet address of user    
}  
```  
* Bounty:    
```
bounty {
    int bountyID, // ID of bounty    
    string title, // Title of bounty    
    string description, // Description in HTML    of bounty    
    startUpName, // Name of startup that created bounty    
    int category, // Category of bounty    
    string payout, // Range of payout    
    null|string startDate, // Date of start of the bounty    
    null|string expiryDate, // Date of end of the bounty    
    null|string urlLink, // Link of the bounty    
    null|submission[], // List of submissions to the bounty    
}    
```
### Endpoints    
Endpoints will be listed in the same format as Express, for example `/bounty/:id` where `:id` is variable (such as `/bounty/142`) and are assumed to be prefixed by version (such as `/v1`)

* GET `/profile/:user`  
```  
{    
    user    
}    
```
* PUT `/editprofile`    
PARAMETER:    
```
{    
    user    
}    
```
RESPONSE:  
```  
{    
    user    
}    
```
* GET `/bounty`    
```
{    
    bounty[]    
}    
```
* GET `/bounty/:id`   
```
{    
    bounty    
}    
```
* POST `/submission`    
PARAMETER:    
```
{    
    submission    
}    
```
RESPONSE:   
```
{    
    submission    
}    
```
* PUT `/editsubmission`    
PARAMETER:   
```
{    
    submission    
}    
```
RESPONSE:    
```
{    
    submission    
}
```  
* DELETE `/deletesubmission/:id`    
