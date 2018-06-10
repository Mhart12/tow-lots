## Quick Start

1. yarn (or npm install)
2. node src/server/update_db.js (populate local mysql db with current month's vehicles)
3. yarn dev (or npm run dev)

##Heroku App not working currently
https://kctowlots.herokuapp.com/

##Auction site where pictures are stored
http://oaiauctions.hibid.com/

## Problem Statement

KCMO runs monthly auctions of cars and other items (boats,
scooters, etc) that are unclaimed from city tow lots, but
information about the items up for auction isn’t easily accessible
by salvage dealers. A list of the vehicles up for auction is available online that includes limited information about the condition of the vehicles. The minimal user interface fosters a limited market of buyers, reducing revenue and resulting in fewer vehicles being sold.

There is an opportunity to increase revenue, increase sales, reduce waste (into the
landfill), or even connect more people to low cost vehicles with
better access to more, relevant data.

## What we need

Is a person or team to take ownership of this project and create a KC Auto Auction site with timely, searchable info about items
available at auction.

A MVP might allow the buyer is able to see all items, narrow items by search & filter, and see the time and date of the upcoming auction.


### Avaliable Data

The list of auction items is online at  [https://data.kcmo.org/Traffic/Kansas-City-Monthly-Car-Auction/2uje-k9n5](https://data.kcmo.org/Traffic/Kansas-City-Monthly-Car-Auction/2uje-k9n5).  This page will show you the existing data
and how to download it or ascdess it using a RESTful API (JSON).  It also contains documentation about the data.

* Lot#
* Make
* Model
* Year
* VIN
* Keys (if the vehicle comes with keys)
* Reason vehicle is for sale
* Vehicle number (to identify during auction)

## Future Opportunities

* Addition of photos to vehicle listings (may be available in second version, will not be included in first)
* Wishlist - ability to select desired items from a "frequently sold" list, where the site will send the buyer a notification when one of these items is listed for sale (via email or tweet?)

## Possible steps:

* Review the existing data source
* Design a system
* Wireframe a user interface
* Create a road map and issues that can be followed to implement
* Implement


* See [Issues](https://github.com/codeforkansascity/tow-lots/issues)

## How to help

* Come to [Code for KC HackNights](http://www.meetup.com/KCBrigade/)
