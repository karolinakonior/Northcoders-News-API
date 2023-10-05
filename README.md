#***NORTHCODERS NEWS API***

Northcoders News API is built for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

##LINK TO THE HOSTED VERSION OF NORTHCODERS NEWS API CAN BE FOUND HERE: https://northcoders-news-api-ibfk.onrender.com

If you wish to contribute to this repository please follow this steps.

###**FORK THIS REPOSITORY:** 
        - On GitHub.com, navigate to the karolinakonior/Northcoders-News-API repository.
        - In the top-right corner of the page, click Fork.
        - Under "Owner," select the dropdown menu and click an owner for the forked repository.
        - Click Create fork.

###**CLONE YOUR FORK LOCALLY:**
        - On GitHub.com, navigate to your fork of the Northcoders-News-API.
        - Above the list of files, click Code.
        - Copy the URL for the repository.
        - Open Terminal.
        - Change the current working directory to the location where you want the cloned directory.
        - Type git clone, and then paste the URL you copied earlier.
        - Press Enter. Your local clone will be created.

###**INSTALL DEPENDENCIES:**
        - after opening the repository in VS Code navigate to your terminal and run the following commands:
            * npm install

###**ADD THE FOLLOWING FILES AT THE TOP LEVEL OF THE MAIN FOLDER:**
        - .env.test with PGDATABASE=nc_news_test as the environment variable.
        - .env.development with PGDATABASE=nc_news_development as the environment variable.

###**SEED THE DATABASE:**
        - in your terminal run following commands:
            * npm run setup-dbs
            * npm run seed        

###**RUN THE TESTS:**
        - in your terminal run following commands:
            * npm run test utils.test.js (to run utils tests)
            * npm run test app.test.js (to run app tests)
            OR
            * npm run test (to run all test files)

The minimum version of Node.js to run the project is >=27.2.5
The minimum version of Postgres to run the project is >=8.0