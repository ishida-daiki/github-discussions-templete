![Feedback to Turtle](https://github.com/ishida-daiki/github-discussions/blob/main/_resources/Thumbnail.png)

## Table of content
- [Using](#using)
- [Settings](#settings)
  - [Setting Up the Development Environment](#Setting-Up-the-Development-Environment) 
  - [Creating a Personal Access Token](#Creating-a-Personal-Access-Token) 
- [Build](#build)
  - [Command to Build the Plugin](#Command-to-Build-the-Plugin) 
  - [Command to Automatically Rebuild the Plugin](#Command-to-Automatically-Rebuild-the-Plugin)
- [Plugin Security Notice](#Plugin-Security-Notice)
- [Appendix](#Appendix)

## Using

<img src="https://github.com/ishida-daiki/github-discussions/blob/main/_resources/Icon.png" width="50px"> 
If you want to check the behavior of the plugin before setting up the environment, you can try the following steps:

1. Visit the [Discussions](https://www.figma.com/community/plugin/888356646278934516/Design) page.
2. Click "Open in...".

## Settings
### Setting Up the Development Environment
1. Click "Use this template" > "Create a new repository" to create a new repository.
2. Clone the newly created repository.
3. Navigate to the cloned repository.
4. Install the necessary packages:
```cli
npm install
```
5. Open VS Code:
```cli
code .
```
6. Create a `.env` file in the root directory and set the following values:
```.env
Example for ishida-daiki / github-discussions:

GITHUB_OWNER=ishida-daiki
GITHUB_REPO=github-discussions
GITHUB_ACCESS_TOKEN=#Please set your newly created GitHub personal access token here
```
> [!IMPORTANT]
> If the `GITHUB_ACCESS_TOKEN` is not set in the `.env` file, you will not be able to retrieve GitHub Discussions information or register to GitHub Discussions.
> Please make sure to set the personal access token in the `.env` file after generating it.
>
> For creation instructions, please refer to [Creating a Personal Access Token](#creating-a-personal-access-token).

7. 🎉 Your development environment is set up! When you start development, please refer to [Build](#build) for instructions.

### Creating a Personal Access Token
1. Log in to GitHub and open https://github.com/settings/tokens.
2. Click "Generate new token."
3. Set "Expiration" to "No expiration."
4. Check the boxes for `repo` and `write:discussion` under "Select scopes."
5. Click "Generate token."
6. Copy the generated token and set it as `GITHUB_ACCESS_TOKEN` in the `.env` file.
> [!WARNING]
> Instead of creating multiple `GITHUB_ACCESS_TOKEN`, it is recommended to generate a single token and share it within your team.

## Build
### Command to Build the Plugin
```cli
npm run build
```
Executing this command will generate a `build/` directory containing the [`manifest.json`](https://figma.com/plugin-docs/manifest/)  file and a JavaScript bundle for the plugin.

### Command to Automatically Rebuild the Plugin
```cli
npm run watch
```
This command monitors changes in the source code and automatically rebuilds the plugin when updates are detected.

## Plugin Security Notice
Originally, this plugin was designed to save configuration settings in a `.env` file using `figma.clientStorage`, allowing a single plugin to post to various users' GitHub Discussions. However, as stated in the Figma official documentation:

> ⚠ The data is stored privately for stability, not security. It prevents other plugins from accessing your data. It does not, however, prevent > users from seeing data stored on their own client given sufficient effort.

[figma.clientStorage](https://www.figma.com/plugin-docs/api/figma-clientStorage/#:~:text=%E2%9A%A0%20The%20data%20is%20stored%20privately%20for%20stability%2C%20not%20security.%20It%20prevents%20other%20plugins%20from%20accessing%20with%20your%20data.%20It%20does%20not%2C%20however%2C%20prevent%20users%20from%20seeing%20data%20stored%20on%20their%20own%20client%20given%20sufficient%20effort.)

Considering this explanation, I decided that storing access tokens could be risky. Therefore, I am providing this plugin as a template. Please build and use this plugin in your environment as a private or organization-specific plugin rather than a public one.


## Appendix

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Official Figma documentation and code samples:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)
