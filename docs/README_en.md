<div align="center">
  <img src="../_resources/Thumbnail.png" />
  <br>
  <h1>github-discussions-templete</h1>
  <p>
    github-discussions-template is a template project for a Figma plugin that allows you to post directly from Figma to GitHub Discussions. Customize the code and use it to fit your team's workflow.
  </p>
  <br>
  <div>
    <img src="https://github.com/ishida-daiki/github-discussions-templete/actions/workflows/build.yml/badge.svg" alt="workflow: Build and Attest" />
    <img src="https://github.com/ishida-daiki/github-discussions-templete/actions/workflows/cleanup-images.yml/badge.svg" alt="workflow: cleanup-images" />
    <img src="https://github.com/ishida-daiki/github-discussions-templete/actions/workflows/notify-slack-chat-write.yml/badge.svg" alt="workflow: notify-slack-chat-write" />
    <img src="https://github.com/ishida-daiki/github-discussions-templete/actions/workflows/notify-slack-incoming-webhook.yml/badge.svg" alt="workflow: notify-slack-incoming-webhook" />
  </div>
  <br>
  <div>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="License: MIT" />
    </a>
  </div>
  <br>
</div>

## Table of contents

1. 🔌&nbsp;&nbsp;[Figma Sample Plugin](#figma-sample-plugin)
2. 🚀&nbsp;&nbsp;[Features](#features)
3. 👀&nbsp;&nbsp;[Usecase](#usecase)
4. 🔍&nbsp;&nbsp;[Benefits](#benefits)
5. 🤔&nbsp;&nbsp;[Intended Use](#intended-use)
6. ⚙️&nbsp;&nbsp;[Settings](#settings)
7. 🔨&nbsp;&nbsp;[Build](#build)
8. 🔐&nbsp;&nbsp;[Plugin Security Notice](#Plugin-Security-Notice)
9. 📝&nbsp;&nbsp;[Credits](#credits)
10. 💬&nbsp;&nbsp;[Appendix](#Appendix)


<div align="center">
  <h2>🔌&nbsp;&nbsp;Figma Sample Plugin</h2>
  <p>This plugin is a private plugin built from <code>github-discussions-templete</code>.</p>
  <br>

[![Figma Developer](https://img.shields.io/badge/Figma-Developers-8A2BE2?logo=figma&logoColor=white)](https://www.figma.com/developers) [![Figma private organization plugins](https://img.shields.io/badge/Figma-private--organization--plugins-0d99ff?logo=figma&logoColor=white)](https://help.figma.com/hc/en-us/articles/4404228629655-Create-private-organization-plugins)

[![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fishida1897%2Fstatus%2F1826207464674718061&style=social&label=Watch%20Demo&link=https%3A%2F%2Fx.com%2Fishida1897%2Fstatus%2F1826207464674718061)](https://x.com/ishida1897/status/1826207464674718061)
</div>

> [!NOTE]
> 
> Members of the [`DMM.com`](https://dmm-corp.com/) organization can try the plugin by following these steps:
> 1. Access [Discussions](https://www.figma.com/community/plugin/1402940367964187567/discussions).
> 2. Click "Open in...".


<h2 align="center">🚀&nbsp;&nbsp;Features</h2>

- **Seamless Posting**: You can post requests, feedback, and discussion topics directly from `Figma Design`, `FigJam`, and `Dev Mode` to GitHub Discussions.
  - The content of the post can include a link to the selected Figma element, title, content, labels, and images. The name of the person who sent the post is also included, making it clear who submitted what.
- **Notification Feature**: When a new post is added to GitHub Discussions, it automatically sends a notification to the specified `Slack channel`. This feature ensures that the entire team is immediately aware of the latest discussion content.

<h2 align="center">👀&nbsp;&nbsp;Use Case</h2>

- **Efficient Operation of Design Systems**
  - This is useful when designers and engineers are developing multiple projects using a single design system and have questions, improvements, or requests.
  - Feedback, questions, and requests can be posted to the design system development team without leaving the Figma tool.
  - Designers can submit questions and improvements that arise during design work with screenshots and details attached. Engineers can quickly post questions or issues related to design system specifications during development and get early resolution.
- **Differentiation of Usage Scenarios**
  - Figma Comment Functionality:
    - Suitable for quick feedback and discussion within a single or a few Figma files. You can add and display comments on the details of the design on the spot and get immediate reactions.
    - However, in projects like design systems that span multiple Figma files, it can be difficult to centrally manage all feedback and questions.
  - GitHub Discussions:
    - Ideal for discussions in large-scale projects or those involving multiple Figma files. It supports comprehensive collaboration between multiple projects and long-term information management, bridging design and development.
    - By utilizing GitHub Discussions, project transparency is improved, and feedback and question history can be managed centrally. This is particularly useful in projects that span long periods or involve numerous team members.

<h2 align="center">🔍&nbsp;&nbsp;Benefits</h2>

- **Aggregation and Management of Opinions**:
  - You can aggregate and manage users' opinions regarding the design system in one place. This allows easy review of past feedback and questions, and provides an immediate understanding of the response history.

- **Knowledge Sharing**:
  - When new members join the project, they can review past decisions and inquiries, facilitating smooth entry into the project. This information also helps maintain consistency in future design and development.

- **Efficiency**:
  - Users can send feedback without leaving the Figma tool, eliminating time lost in switching between tools, thus improving work efficiency. Real-time feedback exchange enables early detection and resolution of issues.

<h2 align="center">🤔&nbsp;&nbsp;Intended Use</h2>

We envision using GitHub Discussions as a place to aggregate various opinions related to design and development, similar to the [Figma Community Forum](https://forum.figma.com/). By gathering discussions about the design system in one place, we promote more effective collaboration.


<h2 align="center">⚙️&nbsp;&nbsp;Settings</h2>

#### Setting Up the Development Environment

1. Click "Use this template" and select "Create a new repository" to create a new repository.
2. Clone the newly created repository.
3. Navigate to the cloned repository.
4. Install the necessary packages:

```cli
npm install
```

5. Open your preferred IDE (e.g., VS Code, Cursor):

6. Create a `.env` file in the root directory and set the following values:<br>
Example for ishida-daiki / github-discussions-templete:
```.env
GITHUB_OWNER=ishida-daiki
GITHUB_REPO=github-discussions-templete
GITHUB_ACCESS_TOKEN=#Set the newly created GitHub Personal access token here.
```

> [!IMPORTANT]
> If the `GITHUB_ACCESS_TOKEN` in the `.env` file does not have a `Personal access token` set, you will not be able to retrieve information from or post to GitHub Discussions.<br />
> After generating a `Personal access token` , be sure to set it in the `GITHUB_ACCESS_TOKEN` in the `.env` file.
>
> For instructions on creating a Personal access token, refer to [Creating a Personal Access Token](#Creating-a-Personal-Access-Token).

7. 🎉 The development environment setup is complete! To start development, please refer to [Build](#build).

#### Creating a Personal Access Token

1. Log in to GitHub and navigate to https://github.com/settings/tokens.
2. Click "Generate new token" and select `Generate new token (classic)`.
3. Set "Expiration" to `No expiration`.
4. In the "Select scopes" section, select the checkboxes for `repo` and `write:discussion`.
5. Click "Generate token".
6. Copy the generated token and set it in the `GITHUB_ACCESS_TOKEN` field of your `.env` file.
> [!WARNING]
> Instead of creating multiple `GITHUB_ACCESS_TOKEN` , it is recommended to generate a single token and share it within the team.


<h2 align="center">🔨&nbsp;&nbsp;Build</h2>

#### Command to Build the Plugin

```cli
npm run build
```

Running this command will generate a `build/` directory containing the [`manifest.json`](https://figma.com/plugin-docs/manifest/) file and the JavaScript bundle of the plugin.

#### Command to Automatically Rebuild the Plugin

```cli
npm run watch
```

This command watches for changes in the source code and automatically rebuilds the plugin when updates are detected.


<h2 align="center">🔐&nbsp;&nbsp;Plugin Security Notice</h2>

Initially, the plan was to create a plugin that saves data to the user's local machine using `figma.clientStorage` and posts it to GitHub Discussions. However, the official Figma documentation states the following:

> ⚠ The data is stored privately for stability, not security. It prevents other plugins from accessing with your data. It does not, however, prevent users from seeing data stored on their own client given sufficient effort.

[figma.clientStorage](https://www.figma.com/plugin-docs/api/figma-clientStorage/#:~:text=%E2%9A%A0%20The%20data%20is%20stored%20privately%20for%20stability%2C%20not%20security.%20It%20prevents%20other%20plugins%20from%20accessing%20with%20your%20data.%20It%20does%20not%2C%20however%2C%20prevent%20users%20from%20seeing%20data%20stored%20on%20their%20own%20client%20given%20sufficient%20effort.)

Considering this explanation, we determined that saving data such as access tokens poses a risk. Therefore, we are providing this plugin as a template. The plugin should be built and used in your environment as a private or organization-exclusive plugin, rather than a public one.


<h2 align="center">📝&nbsp;&nbsp;Credits</h2>

This project is developed based on the [create-figma-plugin](https://github.com/yuanqing/create-figma-plugin) provided by Yuan Qing Lim. We used the original source code and are offering it as a new template under a new MIT license. For the full text of the new MIT license, please refer to the LICENSE file within this repository.


<h2 align="center">💬&nbsp;&nbsp;Appendix</h2>

- [Create Figma Plugin docs](https://yuanqing.github.io/create-figma-plugin/)
- [`yuanqing/figma-plugins`](https://github.com/yuanqing/figma-plugins#readme)

Official Figma Documentation and Code Samples:

- [Plugin API docs](https://figma.com/plugin-docs/)
- [`figma/plugin-samples`](https://github.com/figma/plugin-samples#readme)
