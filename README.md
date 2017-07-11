# eeShares

Contact: Julien Homble : jhomble7@gmail.com
Link to proposal: https://github.com/jhomble/eeShares/blob/master/EeShares%20Project.docx
## What is it
EeShares stands for Energy Efficiency Sharing
It is a mobile application designed to connect facility managers with the residents of its buildings.
By connecting these two groups, the application aims to increase the energy awareness of the residents.
Residents of buildings such as dorms, offices, labs, etc. do not have to pay utility bills, and thus do not consider them. There is plenty of simple tasks the residents could do to reduce energy costs but have no incentive to.
The application makes it possible for residents to view the energy statistics of the building and complete tasks to save energy
Each time a task is logged or the user uses the app, points are earned
Points are used as a raffle to a prize list that will be released if the campaign goal is reached (More on this below)
Ideally, the energy savings from the building will pay for the prizes and incentives themselves making the application self sustaining
###  Features

### Campaigns
This application is built on the concept of campaigns
A campaign is a created to save energy for a building by connecting the owner of the building with those who use it
In the future, the owner will speak with us and set certain goals, prizes, and data streams to customize their campaigns
As of now, because the application is only running in UMD, we are setting all of the parameters (More on this below)
Once the campaign is created, the owner will invite the users of his or her building to the campaign by telling them the password to the campaign
Users can then join the campaign and start participating in the energy savings goals
Users will accumulate points by completing tasks, and by the end of the campaign if the goal was reached, the owner can release the prizes

#### Join Buildings
Every building in the database of the application is shown to the users
Users can select any building and view the energy statistics of that building
A graph will show a time series breakdown of the utility information of the building as well as a target goal
In addition users will be able to join a campaign on the building if they have the correct password (each campaign owner will create a password for their campaign)

As of now, buildings are added by us developers because we need to connect their utility information which can only be done outside the application


#### Record Energy Savings
When a user joins a campaign, it appears on there home personal page
When the campaign is selected, they are brough to the campaign page that displays the current energy costs and whether or not as a whole, if the campaign is on track to acheive the goal
Below this is the tasks users can complete
The owner of the campaign will have the option to give as many opportunities to save energy as he or she wants
Each task will be reset daily and acts as a reminder to the users to be more energy concious
By the end of the day, if the user logged the tasks as completed, they will earn points
Points can be spent to win prizes at the end of the campaign if the goal is reached
This method of earning points through action allows the campaign owner to reward those who were more active in energy savings than others

#### Create a Campaign
This is option is included if a building is added but does not have a campaign set for it yet
However this is not fully developed and not fully setup and should just be set in the database by us developers for now
#### Win Prizes
When a campaign comes to a close and the target goal was reached, the owner of the campaign will give the prizes posted
However, most likely there will not be enough prizes for everyone
To give the prizes and to reward those who put more effort into the campaign, we went with a lottery system for rewarding prizes
A certain number of prizes will be posted for the campaign and users will distribute the points they earned in the campaigns into each prize
When prizes are being chosen, those who put in more points will have a higher of change winning, those rewarding those who did more

*****
This is the most hard coded aspect of the project and needs to be changed
As of now, the only building we are testing on is LaPlata and therefore the prize button link on the campaign page is hard coded only for LaPlata
Both the prizes and link and hard coded in and should be dynamic for creating different prizes and for other campaigns
In addition, there is no functionality to know whether the goal was reached or to distribute the prizes
However whether the goal was reached can be obviously seen through the data and distributing the prizes can be down through a simple random number generator outside of the application and an email


## Developers Guide

### Ionic
Current Ionic Version: V1
The application was built using an Ionic framework
We utilized the Ionic Creator tool to do a basic design of the mobile application and Ionic services in general for the rest of the design
Ionic made it easy to build both the Android and IOS application at the same time
Instead of building two seperate apps in their native languages, Ionic lets us build a web application and convert them to the mobile devices
Ionic uses angular JS and their native libraries to build the web app, then a Cordova plugin to convert to mobile apps
### Firebase
Firebase is Googles Backend as a service (BaaS)
Firebase serves for us as our user authentication, security, and database 
Firebase database is structured as a JSON tree  
API can be found here: https://firebase.google.com/docs/web/setup
### UMD Data Warehouse 
In order for our application to work, we need facility utility information
For UMD, the utility information is found in the UMD Data Warehouse: https://www.oit.umd.edu/dataadmin/DataWarehouse/index.html
We have been given login information and direct contacts with managers there to access the information we need
In the warehouse we look for... 
### Angularjs
Ionic uses AngularJS as its framework
Angular allows us to manipulate the HTML page while receiving the information in the JS
### Node Web Server Backend


## TO BE DONE

### Overall UI Layout
All the UI is up for change
Better Spacing, coloring, bordering, fonts, etc.

### Added Buildings 
Only Buildings we add can be put in
  This is because we have to configure the energy statistics of the buildings outside the app then manually link it 
  So currently only us developers can add buildings
### Added Campaigns
It is allowed if the building does not have a campaign but incomplete
There are certain fields in the firebase database on campaigns that are hard coded in 
  - dailyCostGoal

### Hard Coded Pizes Page
Currently the Prize Page is the only hard coded html
For purposes of the application at UMD, we are only testing the LaPlata Building
So all users will only have the Laplata campaign
We directly linked the go to prize page button to go to the Laplata prize page
  -here we hard coded the prizes
  -hard coded how to retrieve them 
    -the code looks for starbucks, tv, etc.
Make this dynamic when creating a campaign to give choices to the owner of what prizes and how many 
