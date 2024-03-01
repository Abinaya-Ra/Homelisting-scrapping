# Homelisting-scrapping
Scrapper using puppeteer and node js 

# Prerequisite 
1. Node js - v16.16.0
2. npm 8.11.0

# Step to execute:
1. npm install
2. node index.js
3. Open postman and import the below curl command
   
      curl --location 'http://localhost:4040/homescraper/' \
      --header 'Content-Type: application/json' \
      --data ' { 
           "state": "tx",
          "zipcode": "75013"
      }'

   OR

Add new HTTP request http://localhost:4040/homescraper/

Method : POST

Payload:
    {
        "state": "TX",
        "zipcode": "75013"
    }

Response payload:

    "data": [
        {
            "address": "1604 Singing Water Dr, Allen TX, 75013",
            "price": "$1,050,000",
            "days": "new - 11 hours on rocket"
        },
        {
            "address": "1604 Singing Water Dr, Allen TX, 75013",
            "price": "$1,050,000",
            "days": "new - 11 hours on rocket"
        },
        {
            "address": "1904 Wilderness Way, Allen TX, 75013",
            "price": "$849,900",
            "days": "new - 2 days on rocket"
        },
        {
            "address": "1904 Wilderness Way, Allen TX, 75013",
            "price": "$849,900",
            "days": "new - 2 days on rocket"
        }
    ]




