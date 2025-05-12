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
5. Run NPM project
    ``` Shell
    npm start
    ```


### Docker

1. Checkout the project locally
2. Copy .env.template file to .env
    ``` Shell
    cp .env.template .env
    ```
3. Enter correct values to the .env file. If you skip Email part or email sending fails, you'll get a message locally in the logs.
4. Build Docker image
    ``` Shell
    docker build -t einbuergerungstest-berlin-checker .
    ```
5. Run Docker container from the created image
    ``` Shell
    docker run --env-file .env einbuergerungstest-berlin-checker
    ```


### Docker Compose

1. Checkout the project locally
2. Change the mock values in docker-compose.yaml file 
3. Run Docker Compose
    ```
    docker compose up -d


## Happy testing
Feel free to use, share, and modify this tool. I wish you luck with finding a free testing slot and passing the exam.

With ❤️ Marko