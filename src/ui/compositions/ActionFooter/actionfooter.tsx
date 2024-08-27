import { h } from "preact";
import { Button, Container, VerticalSpace } from "@create-figma-plugin/ui";
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
};

export function ActionFooter({ isLoading, disabled, onClick }: ActionFooterProps) {
  return (
    <div className={styles.container}>
      <VerticalSpace space="large" />
      <Container space="medium">
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