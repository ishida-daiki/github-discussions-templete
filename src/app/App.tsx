import {
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  render,
  Text,
  TextboxMultiline,
  VerticalSpace,
  RadioButtonsOption,
  Textbox,
  SegmentedControlOption,
  IconOptionCheck16,
  IconOptionDisabled16,
} from "@create-figma-plugin/ui";
import { Label, Preview } from "primitives";
import { ActionFooter, DiscussionLabels, ImageUploader } from "compositions";
import { Fragment, h, JSX } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import styles from "./App.module.css";

function Plugin() {
  const [elementName, setElementName] = useState<null | string>(
    "Discussion Select the element you want to discuss"
  );
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<null | string>(null);
  const [options, setOptions] = useState<Array<DropdownOption>>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [labelOptions, setLabelOptions] = useState<Array<RadioButtonsOption>>(
    []
  );
  const [labelMap, setLabelMap] = useState<Record<string, string>>({});
  const [isLoadingLabels, setIsLoadingLabels] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [segmentedControlValues, setSegmentedControlValues] = useState<
    string[]
  >([]);
  const segmentedControlOptions: Array<SegmentedControlOption> = [
    {
      children: <IconOptionDisabled16 />,
      value: "icons-size-16--option-disabled",
    },
    {
      children: <IconOptionCheck16 />,
      value: "icons-size-16--option-check",
    },
  ];

  const [body, setBody] = useState<string>("");
  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    setBody(newValue);
  }

  // スクロールが必要かどうかを判定するための状態とref
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    // 初回レンダリング後にスクロールが必要かどうか判定
    if (contentRef.current) {
      setNeedsScroll(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [
    options,
    labelOptions,
    selectedFiles,
    elementName,
    category,
    body,
    isLoadingLabels,
  ]);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-discussion" } }, "*");
  }, []);

  useEffect(() => {
    if (labelOptions.length > 0) {
      // labelOptions が設定された後に default 値を設定
      const defaultValues = labelOptions.map(
        () => "icons-size-16--option-disabled"
      );
      setSegmentedControlValues(defaultValues);
    }
  }, [labelOptions]);

  window.onmessage = async (event) => {
    const { pluginMessage } = event.data;
    if (pluginMessage.type === "discussion-categories") {
      const filteredCategories = pluginMessage.categories;
      const newOptions = filteredCategories.map(
        (category: { name: string }) => ({
          value: category.name,
        })
      );
      setOptions(newOptions);
      setCategoryMap(pluginMessage.categoryMap);
    } else if (pluginMessage.type === "discussion-labels") {
      const filteredLabels = pluginMessage.labels;
      const newLabelOptions: Array<RadioButtonsOption> = filteredLabels.map(
        (label: { name: string }) => ({
          children: <Text>{label.name}</Text>,
          value: label.name,
        })
      );
      setLabelOptions(newLabelOptions);

      const newLabelMap = pluginMessage.labels.reduce(
        (acc: Record<string, string>, label: { id: string; name: string }) => {
          acc[label.name] = label.id;
          return acc;
        },
        {}
      );
      setLabelMap(newLabelMap);

      setIsLoadingLabels(false);
    } else if (pluginMessage.type === "selection-cleared") {
      setElementName("Discussion Select the element you want to discuss");
      setGeneratedUrl(null); // 選択クリア時にURLをリセット
    } else if (pluginMessage.type === "update-name") {
      setElementName(pluginMessage.name);
    } else if (pluginMessage.type === "generate-url") {
      const { nodeId, fileKey, pageName } = pluginMessage;
      const encodedPageName = encodeURIComponent(pageName);
      const url = `https://www.figma.com/design/${fileKey}/${encodedPageName}?node-id=${nodeId.replace(
        /:/g,
        "-"
      )}`; // ノードIDの形式をエンコード（": -> "-"）
      setGeneratedUrl(url); // 状態を更新
    }
  };

  function handleTagChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newTag = event.currentTarget.value;
    setCategory(newTag);
  }

  // ファイルを base64 に変換する関数
  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64str = (reader.result as string).replace(
          /data:.*\/.*;base64,/,
          ""
        );
        resolve(base64str);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  async function handleClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    setIsLoading(true);
    try {
      let imageUrl: string | null = null;
      if (selectedFiles && selectedFiles.length > 0) {
        setIsLoading(true);
        const file = selectedFiles[0];
        const path = `awesome_images/${file.name}`;
        const content = await fileToBase64(file);
        imageUrl = await new Promise((resolve) => {
          let handler: (event: MessageEvent) => void;
          // Update the current onmessage function
          let _oldListener: ((this: Window, ev: MessageEvent) => any) | null =
            window.onmessage;
          window.onmessage = (event) => {
            _oldListener?.call(window, event);
            handler(event);
          };
          // Submit the file to be uploaded.
          parent.postMessage(
            {
              pluginMessage: {
                type: "upload-image",
                fileData: content,
                path: path,
              },
            },
            "*"
          );

          // Once the file is uploaded, this function will be called.
          handler = function (event: MessageEvent) {
            if (event.data.pluginMessage.type === "image-uploaded") {
              // If this is the response we were waiting for, resolve the promise with the image url
              resolve(event.data.pluginMessage.imageUrl);
              // Clean up by removing the event listener
              if (!_oldListener) {
                window.onmessage = _oldListener;
              }
            }
          };
        });
      }
      const categoryId = category ? categoryMap[category] : undefined;

      // 選択されたすべての "icons-size-16--option-check" のラベルIDを格納
      const labelIds: string[] = segmentedControlValues.reduce(
        (ids: string[], value: string, index: number) => {
          if (value === "icons-size-16--option-check" && labelOptions[index]) {
            const labelId = labelMap[labelOptions[index].value];
            if (labelId) {
              ids.push(labelId);
            }
          }
          return ids;
        },
        []
      );

      let messageBody: string = "";
      if (imageUrl) {
        messageBody += `![image](${imageUrl})\n\n`;
      }
      messageBody += `${body}\n\n`;
      if (generatedUrl) {
        messageBody += `${generatedUrl}`;
      }
      parent.postMessage(
        {
          pluginMessage: {
            type: "post-message",
            title: title,
            body: messageBody,
            elementName: elementName,
            categoryId: categoryId,
            labelIds: labelIds,
          },
        },
        "*"
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setTitle("");
      setBody("");
      setCategory(null);
      setElementName("Discussion Select the element you want to discuss");
      setSelectedFiles([]);
      const defaultValues = labelOptions.map(
        () => "icons-size-16--option-disabled"
      );
      setSegmentedControlValues(defaultValues);
    } catch (error) {
      console.error("Error uploading file or sending message:", error);
      setIsLoading(false);
    }
  }

  const [title, setTitle] = useState<string>("");
  function handleInputTitle(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setTitle(newValue);
  }

  function createHandleChangeSegmentedControl(index: number) {
    return (event: Event) => {
      const newValue = (event as any).currentTarget.value; // 型キャスト
      setSegmentedControlValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = newValue;
        return newValues;
      });
    };
  }

  function formatFileName(fileName: string): string {
    // 拡張子を分離
    const parts = fileName.split(".");
    const extension = parts.pop();
    const baseName = parts.join(".");

    // スペースをハイフンに置換
    const formattedName = baseName.replace(/\s+/g, "-");

    return `${formattedName}.${extension}`;
  }

  function handleSelectedFiles(files: Array<File>) {
    const formattedFiles = files.map((file) => {
      const formattedName = formatFileName(file.name);
      return new File([file], formattedName, { type: file.type });
    });
    setSelectedFiles(formattedFiles);
  }

  return (
    <Fragment>
      <div
        ref={contentRef}
        className={`${styles.content} ${
          needsScroll ? styles["allow-scroll"] : styles["no-scroll"]
        }`}
      >
        <Preview elementName={elementName} />
        <Container space="medium">
          <VerticalSpace space="extraSmall" />
          <Label title="Select a discussion category" required />
          <Dropdown
            onChange={handleTagChange}
            options={options}
            placeholder="Select a category"
            value={category}
          />
          <VerticalSpace space="small" />
          <Label title="Add a title" required />
          <Textbox
            onInput={handleInputTitle}
            placeholder="Title"
            value={title}
            variant="border"
          />
          <VerticalSpace space="small" />
          <Label title="body" required />
          <TextboxMultiline
            onInput={handleInput}
            placeholder="Ask a question, start a conversation, or make an announcement"
            value={body}
            variant="border"
          />
          <VerticalSpace space="small" />
          <Label title="Labels" />
          <VerticalSpace space="extraSmall" />
          <DiscussionLabels
            isLoadingLabels={isLoadingLabels}
            labelOptions={labelOptions}
            createHandleChangeSegmentedControl={
              createHandleChangeSegmentedControl
            }
            segmentedControlOptions={segmentedControlOptions}
            segmentedControlValues={segmentedControlValues}
          />
          <VerticalSpace space="large" />
        </Container>
        <Divider />
        <ImageUploader
          handleSelectedFiles={handleSelectedFiles}
          selectedFiles={selectedFiles}
        />
      </div>
      <ActionFooter
        isLoading={isLoading}
        disabled={!(elementName && body && category)}
        onClick={handleClick}
      />
    </Fragment>
  );
}

export default render(Plugin);
