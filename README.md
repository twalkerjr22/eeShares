# eeShares

Contact: Julien Homble : jhomble7@gmail.com

## What is it

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
