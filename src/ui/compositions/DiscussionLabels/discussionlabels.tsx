import { h } from "preact";
import { Stack, Text, SegmentedControl, SegmentedControlOption, RadioButtonsOption } from "@create-figma-plugin/ui";
import styles from "./discussionlabels.module.css";

interface DiscussionLabelsProps {
  isLoadingLabels: boolean;
  labelOptions: Array<RadioButtonsOption>;
  createHandleChangeSegmentedControl: (index: number) => (event: Event) => void;
  segmentedControlOptions: Array<SegmentedControlOption>;
  segmentedControlValues: string[];
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