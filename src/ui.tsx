import {
  Bold,
  Button,
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  render,
  Text,
  TextboxMultiline,
  VerticalSpace,
  FileUploadDropzone,
  Muted,
  FileUploadButton,
  RadioButtons,
  RadioButtonsOption,
  Textbox,
  Preview,
  SegmentedControlOption,
  SegmentedControl,
  IconOptionCheck16,
  IconOptionDisabled16,
  Stack
} from "@create-figma-plugin/ui";
import Label from "./components/label";
import { Fragment, h, JSX } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import styles from "./ui.module.css";

function Plugin() {
  const [elementName, setElementName] = useState<null | string>(
    "Discussion Select the element you want to discuss"
  );

  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<null | string>(null);
  const [options, setOptions] = useState<Array<DropdownOption>>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [radioOptions, setRadioOptions] = useState<Array<RadioButtonsOption>>(
    []
  );
  const [labelMap, setLabelMap] = useState<Record<string, string>>({});
  const [isLoadingLabels, setIsLoadingLabels] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [segmentedControlvalue, setsegmentedControlValue] = useState<string>('bar');
  const setsegmentedControloptions: Array<SegmentedControlOption> = [{
    children: <IconOptionDisabled16 />,
    value: "icons-size-16--option-check"
  }, {
    children: <IconOptionCheck16 />,
    value:"icons-size-16--option-check"
  }];

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
    radioOptions,
    selectedFiles,
    elementName,
    category,
    body,
    isLoadingLabels,
  ]);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-discussion" } }, "*");
  }, []);

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
      const newRadioOptions: Array<RadioButtonsOption> = filteredLabels.map(
        (label: { name: string }) => ({
          children: <Text>{label.name}</Text>,
          value: label.name,
        })
      );
      setRadioOptions(newRadioOptions);

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
      setElementName(
        "Discussion Select the element you want to discuss"
      );
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
      const labelId = labelMap[radioValue];
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
            postToSlack: value,
            categoryId: categoryId,
            labelIds: [labelId],
          },
        },
        "*"
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setTitle("");
      setBody("");
      setCategory(null);
      setElementName(
        "Discussion Select the element you want to discuss"
      );
      setValue(false);
      setRadioValue("");
      setSelectedFiles([]);
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

  const [value, setValue] = useState<boolean>(false);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setValue(newValue);
  }

  const [radioValue, setRadioValue] = useState<string>("");
  function handleChangeRadio(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setRadioValue(newValue);
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
        style={{
          height: "calc(100% - 77px)",
          overflowY: needsScroll ? "auto" : "hidden",
        }}
      >
        <Preview
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {elementName ===
          "Discussion Select the element you want to discuss" ? (
            <div className={styles.previewPlaceholder}>
              Discussion Select the element you want to discuss
            </div>
          ) : (
            <div className={styles.previewText}>{elementName}</div>
          )}
        </Preview>
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
          <div style={{ width: "100%" }}>
            <Textbox
              onInput={handleInputTitle}
              placeholder="Title"
              value={title}
              variant="border"
            />
          </div>
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
          <Stack space="extraSmall">
            {isLoadingLabels ? (
              <Text>Loading...</Text>
            ) : (
              radioOptions.map((value) => (
                <div key={value} className={styles.label}>
                  {value.children}
                  <SegmentedControl onChange={handleChange} options={setsegmentedControloptions} value={segmentedControlvalue} />
                </div>
              ))
            )}
          </Stack>
          <VerticalSpace space="large" />
        </Container>
        <Divider />
        <Container space="medium">
          <VerticalSpace space="extraSmall" />
          <Label title="Images" />
          <FileUploadDropzone
            acceptedFileTypes={["image/jpeg", "image/png"]}
            multiple
            onSelectedFiles={handleSelectedFiles}
          >
            <Text align="center">
              <Bold>Drop images here</Bold>
            </Text>
            <VerticalSpace space="small" />
            <Text align="center">
              <Muted>or</Muted>
            </Text>
            <VerticalSpace space="small" />
            <FileUploadButton
              acceptedFileTypes={["image/jpeg", "image/png"]}
              onSelectedFiles={handleSelectedFiles}
            >
              Choose Image Files
            </FileUploadButton>
          </FileUploadDropzone>
          <div className={styles.previewContainer}>
            {selectedFiles.map((file) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={file.name}>
                  <VerticalSpace space="medium" />
                  <img
                    src={url}
                    alt={file.name}
                    className={styles.previewImage}
                  />
                </div>
              );
            })}
          </div>
          <VerticalSpace space="large" />
        </Container>
      </div>
      <Container
        space="medium"
        style={{
          position: "absolute",
          left: "0",
          bottom: "0",
          right: "0",
          zIndex: "100",
          background: "var(--figma-color-bg)",
          borderTop: "1px solid var(--figma-color-border)",
        }}
      >
        <VerticalSpace space="large" />
        <Button
          loading={isLoading}
          disabled={!(elementName && body && category)}
          fullWidth
          onClick={handleClick}
        >
          Submit
        </Button>
        <VerticalSpace space="extraLarge" />
      </Container>
    </Fragment>
  );
}

export default render(Plugin);
