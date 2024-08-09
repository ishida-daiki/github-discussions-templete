import { h } from "preact";
import styles from "./preview.module.css";
import { Preview as UIPreview } from "@create-figma-plugin/ui";

type Props = {
  elementName: string | null;
};

function Preview({ elementName }: Props) {
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

export default Preview;
