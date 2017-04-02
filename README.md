# Push Notification Test Tool

Simple CLI tool to send push notifications to Android and iOS devices.

## Install

`npm install -g push-notification-test-tool`

## Setup

To set up the tool run:
```
pushtester setup --androidSenderAPIKey YOUR_API_KEY --bundle YOUR_BUNDLE_ID --iosCert ABSOLUTE_PATH_TO_p8 --iosTeamId YOUR_TEAM_ID --iosKeyId YOUR_KEY_ID --iosEnv PRODUCTION_OR_DEVELOPMENT
```
**Note: this wipes and rebuilds the config file each time so make sure you include all fields.**

## Sending a Push Notification

```
pushtester send ios -t TITLE -m MESSAGE tool -d YOUR_DEVICE_TOKEN
```

```
pushtester send ios -t TITLE -m MESSAGE tool -d YOUR_DEVICE_TOKEN
```
