import { h } from "preact";
import { Stack, Text, SegmentedControl, SegmentedControlOption, RadioButtonsOption } from "@create-figma-plugin/ui";
import styles from "./discussionlabels.module.css";

type DiscussionLabelsProps = {
  /**
   * ラベルのロード状態
   */
  isLoadingLabels: boolean;
  /**
   * ラベルオプション
   */
  labelOptions: Array<RadioButtonsOption>;
  /**
   * セグメントコントロールの選択状態
   */
  segmentedControlValues: string[];
  /**
   * セグメントコントロール用のオプション
   */
  segmentedControlOptions: Array<SegmentedControlOption>;
  /**
   * セグメントコントロールの選択変更を処理する関数
   */
  createHandleChangeSegmentedControl: (index: number) => (event: Event) => void;
}

export function DiscussionLabels({
  isLoadingLabels,
  labelOptions,
  createHandleChangeSegmentedControl,
  segmentedControlOptions,
  segmentedControlValues,
}: DiscussionLabelsProps) {
  return (
    <Stack space="extraSmall">
      {isLoadingLabels ? (
        <Text>Loading...</Text>
      ) : (
        labelOptions.map((option, index) => (
          <div key={option.value} className={styles.label}>
            {option.children}
            <SegmentedControl
              onChange={createHandleChangeSegmentedControl(index)}
              options={segmentedControlOptions}
              value={segmentedControlValues[index]}
            />
          </div>
        ))
      )}
    </Stack>
  );
}