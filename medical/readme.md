# Medical Prices API

## Description
Very quick and dirty api for the developer factory. Most things are dumped in 1 file and no testing or front end avalible.
No error checking

## To Run App
- cd C:\Users\Kal\Desktop\Angularjs\PhoneGapApps\MedFind2\medical into medical folder
- npm install (this install dependencies)
- node server.js (runs the server)
- wait for all the commadline stuff to finish
- endpoint now is http://localhost:3002/api/search/p/2

## New medical data?
- transform xls sheet into CSV (use excel)
- adjust so the top row is column names (ie delete any rows before column names)
- save as medicine.csv 
- run the server

## Endpoint
- http://localhost:3002/api/search/searchterm/pageno (eg http://localhost:3002/api/search/pando/1)
	- search term is the medicine name or start of the name
	- pageno is a number for the result page
- it will return a nice json object with paging info and medicine array of matches
