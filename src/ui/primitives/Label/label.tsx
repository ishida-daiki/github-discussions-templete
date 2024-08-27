import { Bold, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import styles from "./label.module.css";

type LabelProps = {
  /**
   * ラベルのタイトル
   */
  title: string;
  /**
   * 必須フラグ
   */
  required?: boolean;
}

export function Label(props: LabelProps) {
  const { title, required } = props;
  return (
    <Text className={styles.text}>
      <Bold>{title}</Bold>
      {required && (
        <div className={styles.required} >
          *
        </div>
      )}
    </Text>
  );
}
