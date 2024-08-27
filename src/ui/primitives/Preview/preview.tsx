import { h } from "preact";
import styles from "./preview.module.css";
import { Preview as UIPreview } from "@create-figma-plugin/ui";

type PreviewProps = {
  /**
   * 現在選択されている要素の名前
   * 選択されていない場合、デフォルトでは "Discussion Select the element you want to discuss" が設定されます。
   * @default "Discussion Select the element you want to discuss"
   */
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