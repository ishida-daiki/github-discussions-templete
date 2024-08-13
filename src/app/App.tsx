import {
  Container,
  Divider,
  Dropdown,
  render,
  TextboxMultiline,
  VerticalSpace,
  Textbox,
} from "@create-figma-plugin/ui";
import { Label, Preview } from "primitives";
import { ActionFooter, DiscussionLabels, ImageUploader } from "compositions";
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styles from "./App.module.css";
import {
  useDiscussionCategories,
  useDiscussionLabels,
  useElementName,
  useFormState,
  useHandleClick,
  useImageUpload,
  useScrollDetection,
} from "hooks";

function Plugin() {
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-discussion" } }, "*");
  }, []);

  const { elementName, setElementName, generatedUrl } = useElementName();
  const { handleTagChange, options, category, setCategory, categoryMap } =
    useDiscussionCategories();
  const {
    isLoadingLabels,
    labelMap,
    segmentedControlOptions,
    segmentedControlValues,
    setSegmentedControlValues,
    labelOptions,
    createHandleChangeSegmentedControl,
  } = useDiscussionLabels();
  const { title, setTitle, body, setBody, handleInputTitle, handleInputBody } =
    useFormState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedFiles, setSelectedFiles, fileToBase64, handleSelectedFiles } =
    useImageUpload();
  const { contentRef, needsScroll } = useScrollDetection({
    options,
    labelOptions,
    selectedFiles,
    elementName,
    category,
    body,
    isLoadingLabels,
  });
  const { handleClick } = useHandleClick({
    elementName,
    setElementName,
    generatedUrl,
    fileToBase64,
    selectedFiles,
    setSelectedFiles,
    category,
    categoryMap,
    labelOptions,
    labelMap,
    segmentedControlValues,
    body,
    title,
    setIsLoading,
    setTitle,
    setBody,
    setCategory,
    setSegmentedControlValues,
    isLoadingLabels,
  });

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
            onInput={handleInputBody}
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
