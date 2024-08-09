import { Bold, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import styles from "./label.module.css";

interface LabelProps {
  title: string;
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
