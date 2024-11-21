import { h } from "preact";
import {
  Button,
  Checkbox,
  Container,
  VerticalSpace,
  Text,
  Bold,
} from "@create-figma-plugin/ui";
import { JSX } from "preact";
import styles from "./actionfooter.module.css";

type ActionFooterProps = {
  /**
   * ボタンがローディング中かどうかを示すフラグ
   */
  isLoading: boolean;
  /**
   * ボタンが無効かどうかを示すフラグ
   */
  disabled: boolean;
  /**
   * ボタンがクリックされたときに呼び出される関数
   */
  onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  onChange: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
  value: boolean;
};

export function ActionFooter({
  isLoading,
  disabled,
  onClick,
  onChange,
  value,
}: ActionFooterProps) {
  return (
    <div className={styles.container}>
      <Container space="medium">
        <VerticalSpace space="large" />
        <Checkbox onChange={onChange} value={value}>
          <Text>
            <Bold>#Slack</Bold> に投稿する
          </Text>
        </Checkbox>
        <VerticalSpace space="large" />
        <Button
          loading={isLoading}
          disabled={disabled}
          fullWidth
          onClick={onClick}
        >
          Submit
        </Button>
      </Container>
      <VerticalSpace space="extraLarge" />
    </div>
  );
}
