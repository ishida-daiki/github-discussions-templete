import { h } from "preact";
import { Container, VerticalSpace, Text, Bold, Muted, FileUploadDropzone, FileUploadButton } from "@create-figma-plugin/ui";
import { Label } from "primitives";
import styles from "./imageuploader.module.css";

type ImageUploaderProps = {
  handleSelectedFiles: (files: Array<File>) => void;
  selectedFiles: Array<File>;
}

export function ImageUploader({ handleSelectedFiles, selectedFiles }: ImageUploaderProps) {
  return (
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
      <div className={styles.container}>
        {selectedFiles.map((file) => {
          const url = URL.createObjectURL(file);
          return (
            <div key={file.name}>
              <VerticalSpace space="medium" />
              <img
                src={url}
                alt={file.name}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
      <VerticalSpace space="large" />
    </Container>
  );
}