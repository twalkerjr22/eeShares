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
###  Features

#### Join Buildings

#### Record Energy Savings

#### Win Prizes

#### Create a Campaign

#### View Energy Statistics 



## Developers Guide

### Ionic

### Firebase

### Angularjs

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
  - targetGoal

### Hard Coded Pizes Page
Currently the Prize Page is the only hard coded html
For purposes of the application at UMD, we are only testing the LaPlata Building
So all users will only have the Laplata campaign
We directly linked the go to prize page button to go to the Laplata prize page
  -here we hard coded the prizes
  -hard coded how to retrieve them 
    -the code looks for starbucks, tv, etc.
Make this dynamic when creating a campaign to give choices to the owner of what prizes and how many 
