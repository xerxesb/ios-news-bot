# iOS News Bot
(Taking the Apple Developer News Feed and filtering just to iOS releases)

This script is used to publish releases of iOS development versions while in beta, and when they're made commercially available.
It reads from the public RSS feed and filters to only include items for iOS releases.

## Development

### Environment Setup

The development of this tool is based on Node v8.

Because the project is based on `libxslt` and its native binaries, you can't build this image on Mac and deploy to Lambda on Linux. If you're developing on Linux that's fine, but MacOS users will need an alternative.

For Mac users: Recommend using Docker for Mac. Install Docker and then in your working directory for this project:
* Run `docker run -v `pwd`:/working -it --rm ubuntu`
  * The -v flag makes your code directory available inside the container in a directory called “working”.
  * The -it flag means you get to interact with this container.
  * The --rm flag means Docker will remove the container when you’re finished. `Ubuntu` is the name of an official container image for Ubuntu.
* Once inside the container, the repo will be mounted to `/working`.
* Run `apt-get update`
* Install Ubuntu build tools
    * `apt-get install build-essential`
* Install cURL
  * `apt-get install curl`
* Install Python
  * `apt-get install python`
* Install nvm
  * `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
* Put `nvm` in your path for the current shell session
  * `source ~/.bashrc`
* Install Node v8
  * `nvm install 8`
* Setup the project dependencies
  * `npm install`
* Install Claudia globally (for convenience)
  * `npm install claudia -g`
  * (Alternatively you can run `claudia` from `./node_modules/claudia/bin`)

**Developing**

Develop locally and you can test the response sent back from the function through `node test.js`. You can pass in args or context to the function if necessary. Response should always be `application/rss+xml`.

Use Claudia to manage deployment of the package to lambda
* Make sure your AWS_PROFILE is set to an account with deploy permissions
  * You can set the default profile in `~/.aws/credentials`
  * OR you can pass the `AWS_PROFILE=<profile>` parameter before issuing any command to `claudia`
* `npm start` will give you a console gui to control which scripts are available in the package
* You can deploy the package to AWS with `npm run deploy` (which is defined in `package.json`)
  * This only needs to be done once for that session.
* You can run a test against Claudia's deployed package with `claudia test-lambda`
  * You can also view the AWS Console to inspect logs of the test result
    * `https://console.aws.amazon.com/cloudwatch/`
* To update any changes made locally, you can simply `claudia update`
  * This will update the live version count but keep the same deployment id