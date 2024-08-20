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
  isLoading: boolean;
  disabled: boolean;
  onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
  value: boolean;
};

export function ActionFooter({
  isLoading,
  disabled,
  onClick,
  handleChange,
  value,
}: ActionFooterProps) {
  return (
    <div className={styles.container}>
      <Container space="medium">
        <VerticalSpace space="large" />
        <Checkbox onChange={handleChange} value={value}>
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
