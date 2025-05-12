# einbuergerungstest-berlin-checker

This small script app is intended to help people finding an available slot for Einbürgerungstest in Berlin. Since usually there are no slots, idea is to run this script to help you find one.


## How to run

### Locally

1. Checkout the project locally
2. Copy .env.template file to .env  
    ``` Shell
    cp .env.template .env
    ```
3. Enter correct values to the .env file. If you skip Email part or email sending fails, you'll get a message locally in the logs.
4. Install NPM dependencies
    ``` Shell
    npm install
    ```
4. Run NPM project
    ``` Shell
    npm start
    ```
