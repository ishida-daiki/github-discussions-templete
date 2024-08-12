import { h } from "preact";
import { IconOptionCheck16, IconOptionDisabled16, RadioButtonsOption, SegmentedControlOption, Text } from "@create-figma-plugin/ui";
import { useState, useEffect } from "preact/hooks";

/**
 * useDiscussionLabels フック
 *
 * ディスカッションに設定するラベルオプションを管理するためのカスタムフック。
 * GitHub Discussions のラベルを取得、選択状態の管理、ロード状態の管理を行う。
 */
export function useDiscussionLabels() {
  const [labelOptions, setLabelOptions] = useState<Array<RadioButtonsOption>>([]);
  const [segmentedControlValues, setSegmentedControlValues] = useState<string[]>([]);
  const [labelMap, setLabelMap] = useState<Record<string, string>>({});
  const [isLoadingLabels, setIsLoadingLabels] = useState<boolean>(true);

  const segmentedControlOptions: Array<SegmentedControlOption> = [
    {
      children: h(IconOptionDisabled16, null),
      value: "icons-size-16--option-disabled",
    },
    {
      children: h(IconOptionCheck16, null),
      value: "icons-size-16--option-check",
    },
  ];
  
  function createHandleChangeSegmentedControl(index: number) {
    return (event: Event) => {
      const newValue = (event as any).currentTarget.value; // 型キャスト
      setSegmentedControlValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = newValue;
        return newValues;
      });
    };
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "discussion-labels") {
        const filteredLabels = pluginMessage.labels;
        const newLabelOptions: Array<RadioButtonsOption> = filteredLabels.map(
          (label: { name: string }) => ({
            children: h(Text, null, label.name),
            value: label.name,
          })
        );
        setLabelOptions(newLabelOptions);

        const newLabelMap = pluginMessage.labels.reduce(
          (acc: Record<string, string>, label: { id: string; name: string }) => {
            acc[label.name] = label.id;
            return acc;
          },
          {}
        );
        setLabelMap(newLabelMap);
        setIsLoadingLabels(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (labelOptions.length > 0) {
      const defaultValues = labelOptions.map(
        () => "icons-size-16--option-disabled"
      );
      setSegmentedControlValues(defaultValues);
    }
  }, [labelOptions]);

  return {
    isLoadingLabels,
    labelMap,
    segmentedControlOptions,
    segmentedControlValues,
    setSegmentedControlValues,
    labelOptions,
    createHandleChangeSegmentedControl,
  };
}