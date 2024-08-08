import { Bold, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import styles from "./label.css";

interface labelProps {
  title: string;
  required?: boolean;
}

function Label(props: labelProps) {
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

export default Label;
