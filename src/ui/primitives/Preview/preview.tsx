import { h } from "preact";
import styles from "./preview.module.css";
import { Preview as UIPreview } from "@create-figma-plugin/ui";

type PreviewProps = {
  elementName: string | null;
};

export function Preview({ elementName }: PreviewProps) {
  return (
    <UIPreview
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {elementName === "Discussion Select the element you want to discuss" ? (
        <div className={styles.placeholder}>
          Discussion Select the element you want to discuss
        </div>
      ) : (
        <div className={styles.text}>{elementName}</div>
      )}
    </UIPreview>
  );
}