# einbuergerungstest-finder-berlin

## Subject
A tool to help you to check the official page if there are available test slots.

## Description
This small script app is intended to help people finding an available slot for Einbürgerungstest in Berlin. Since usually there are no slots, idea is to run this script to help you find one.

Source code can be found on https://github.com/marqusm/einbuergerungstest-finder-berlin.

## Usage

### Docker
```
docker run \
    -e CHECKING_INTERVAL="3" \
    -e EMAIL_PROVIDER="EmailProviderName" \
    -e EMAIL_HOST="EmailProviderHost" \
    -e EMAIL_PORT="587" \
    -e EMAIL_USERNAME="example@test.com" \
    -e EMAIL_PASSWORD="t0pS3cR3t" \
    -e SEND_TO_EMAIL="myemail@test.com" \
    marqusm/einbuergerungstest-finder-berlin
```

### Docker compose
```
services:
  einbuergerungstest-finder-berlin:
    image: marqusm/einbuergerungstest-finder-berlin
    container_name: einbtest-finder
    restart: unless-stopped
    environment:
      - CHECKING_INTERVAL=3
      - EMAIL_PROVIDER=EmailProviderName
      - EMAIL_HOST=EmailProviderHost
      - EMAIL_PORT=587
      - EMAIL_USERNAME=example@test.com
      - EMAIL_PASSWORD=t0pS3cR3t
      - SEND_TO_EMAIL=myemail@test.com
```

## Parameters
|      Parameter      | Function                                                         |
|:-------------------:|------------------------------------------------------------------|
| `CHECKING_INTERVAL` | Checking interval in minutes. Don't go below 2 to avoid blocking |
|  `EMAIL_PROVIDER`   | Email service provider name. Put any                             |
|    `EMAIL_HOST`     | Email service host                                               |
|    `EMAIL_PORT`     | Email service port                                               |
|  `EMAIL_USERNAME`   | Email service username                                           |
|  `EMAIL_PASSWORD`   | Email service password                                           |
|   `SEND_TO_EMAIL`   | Email of the recipient                                           |


## Versions
* **1.0.0-alpha** - Initial Release.