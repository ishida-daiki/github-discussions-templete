import { showUI } from '@create-figma-plugin/utilities';

const owner = process.env.GITHUB_OWNER as string;  // リポジトリ所有者の名前
const repo = process.env.GITHUB_REPO as string;  // リポジトリ名
const accessToken = process.env.GITHUB_ACCESS_TOKEN as string; // GitHub API トークン

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.ui.postMessage({ type: "selection-cleared" });
  } else {
    for (const node of selection) {
      figma.ui.postMessage({ type: "generate-url", nodeId: node.id, fileKey: figma.fileKey, pageName: figma.root.name});
      figma.ui.postMessage({ type: "update-name", name: node.name });
    }
  }
});

interface DiscussionCategory {
  id: string;
  name: string;
  description?: string;
  isAnswerable?: boolean;
}

// カテゴリを取得する関数
async function getDiscussionCategories(owner: string, repo: string, accessToken: string): Promise<DiscussionCategory[]> {
  const apiUrl = 'https://api.github.com/graphql';
  const query = `
    {
      repository(owner: "${owner}", name: "${repo}") {
        discussionCategories(first: 10) {
          nodes {
            id
            name
            description
            isAnswerable
          }
        }
      }
    }
  `;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  const payload = JSON.stringify({ query });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: payload
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API responded with status code: ${response.status}, response: ${errorText}`);
    }
    const jsonContent = await response.json();
    return jsonContent.data.repository.discussionCategories.nodes as DiscussionCategory[];
  } catch (error) {
    throw error;
  }
}

interface Label {
  id: string;
  name: string;
  description?: string;
}

// ラベルを取得する関数
async function getDiscussionLabels(owner: string, repo: string, accessToken: string): Promise<Label[]> {
  const apiUrl = 'https://api.github.com/graphql';
  const query = `
    {
      repository(owner: "${owner}", name: "${repo}") {
        labels(first: 100) {
          nodes {
            id
            name
            description
          }
        }
      }
    }
  `;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  const payload = JSON.stringify({ query });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: payload
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API responded with status code: ${response.status}, response: ${errorText}`);
    }
    const jsonContent = await response.json();
    return jsonContent.data.repository.labels.nodes;
  } catch (error) {
    throw error;
  }
}

// ディスカッションを作成する関数
async function createDiscussionInGitHubRepo(
  owner: string,
  repo: string,
  accessToken: string,
  title: string,
  body: string,
  categoryId: string
): Promise<any> {
  const apiUrl = 'https://api.github.com/graphql';

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  // リポジトリIDを取得
  const repoIdResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: `
      query {
        repository(owner: "${owner}", name: "${repo}") {
          id
        }
      }
      `
    })
  });
  if (!repoIdResponse.ok) {
    const errorText = await repoIdResponse.text();
    throw new Error(`GitHub API responded with status code: ${repoIdResponse.status}, response: ${errorText}`);
  }
  const repoIdJson = await repoIdResponse.json();
  const repositoryId = repoIdJson.data.repository.id;

  const mutation = `
    mutation($input: CreateDiscussionInput!) {
      createDiscussion(input: $input) {
        discussion {
          id
          url
        }
      }
    }
  `;

  const variables = {
    input: {
      repositoryId: repositoryId,
      categoryId: categoryId,
      title: title,
      body: body
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: mutation, variables: variables })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API responded with status code: ${response.status}, response: ${errorText}`);
    }
    const jsonContent = await response.json();
    return jsonContent.data.createDiscussion.discussion;
  } catch (error) {
    throw error;
  }
}

// ディスカッションにラベルを追加する関数
async function addLabelsToDiscussion(
  discussionId: string,
  labelIds: string[],
  accessToken: string
): Promise<void> {
  const apiUrl = 'https://api.github.com/graphql';

  const mutation = `
    mutation($input: AddLabelsToLabelableInput!) {
      addLabelsToLabelable(input: $input) {
        clientMutationId
      }
    }
  `;

  const variables = {
    input: {
      labelableId: discussionId,
      labelIds: labelIds
    }
  };

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: mutation, variables: variables })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API responded with status code: ${response.status}, response: ${errorText}`);
    }
  } catch (error) {
    throw error;
  }
}

// ファイルを GitHub にアップロードする関数
async function uploadFileToGitHub(
  owner: string,
  repo: string,
  path: string,
  fileData: string,
  accessToken: string,
  branch = "main"
): Promise<string> {
  const data = JSON.stringify({
    branch: branch,
    message: "Upload image",
    content: fileData,
  });

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: data,
  };

  const response = await fetch(url, options);
  if (response.ok) {
    const resJson = await response.json();
    return resJson.content.download_url;
  } else {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
}

export default function () {
  figma.ui.onmessage = async (message) => {
    if (message.type === "get-discussion") {
      const categories = await getDiscussionCategories(owner, repo, accessToken);
      const labels = await getDiscussionLabels(owner, repo, accessToken);
      const categoryMap = categories.reduce((acc: Record<string, string>, category: DiscussionCategory) => {
        acc[category.name] = category.id;
        return acc;
      }, {});
      figma.ui.postMessage({ type: "discussion-categories", categories, categoryMap });
      figma.ui.postMessage({ type: "discussion-labels", labels });
    }
    else if (message.type === "upload-image") {
      let imageUrl: string | null = null;
      try {
        imageUrl = await uploadFileToGitHub(owner, repo, message.path, message.fileData, accessToken);
        figma.ui.postMessage({ type: "image-uploaded", imageUrl });
      }
      catch (error) {
        console.error(error);
        figma.notify("Failed to upload image to GitHub😓", { timeout: 3000 });
      }
    }
    else if (message.type === "post-message") {
      const currentUser = figma.currentUser;
      const userName = currentUser ? currentUser.name : 'Unknown User';

      const title = message.title;
      const body = `${message.body}\n\nPosted by: ${userName}`;
      const categoryId = message.categoryId;
      const labelIds = message.labelIds;
      
      try {
        const discussion = await createDiscussionInGitHubRepo(owner, repo, accessToken, title, body, categoryId);

        if (discussion && labelIds && labelIds.length > 0) {
          await addLabelsToDiscussion(discussion.id, labelIds, accessToken);  // ラベルを追加
        }

        figma.notify("Successfully added to GitHub Discussions🎉", { timeout: 3000 });
      } catch (error) {
        console.error(error);
        figma.notify("Failed to post to GitHub Discussions😓", { timeout: 3000 });
      }
    }
  };

  showUI({
    height: 700,
    width: 300,
  });
}