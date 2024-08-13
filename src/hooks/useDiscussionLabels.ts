import { h } from "preact";
import {
  IconOptionCheck16,
  IconOptionDisabled16,
  RadioButtonsOption,
  SegmentedControlOption,
  Text,
} from "@create-figma-plugin/ui";
import { useState, useEffect } from "preact/hooks";

/**
 * useDiscussionLabels フック
 *
 * GitHub Discussions のラベルを取得し、選択状態やロード状態を管理します。
 *
 * @return {boolean} isLoadingLabels - ラベルのロード状態。
 * @return {Record<string, string>} labelMap - ラベル名とラベルIDのマッピング。
 * @return {Array<SegmentedControlOption>} segmentedControlOptions - セグメントコントロール用のオプション。
 * @return {Array<string>} segmentedControlValues - セグメントコントロールの選択状態。
 * @return {function} setSegmentedControlValues - セグメントコントロールの選択状態を更新する関数。
 * @return {Array<RadioButtonsOption>} labelOptions - ラベルオプション。
 * @return {function} createHandleChangeSegmentedControl - セグメントコントロールの選択変更を処理する関数。
*/
export function useDiscussionLabels() {
  const [labelOptions, setLabelOptions] = useState<Array<RadioButtonsOption>>(
    []
  );
  const [segmentedControlValues, setSegmentedControlValues] = useState<
    string[]
  >([]);
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

  /**
   * セグメントコントロールの選択変更を処理する関数を作成
   *
   * @param {number} index - セグメントコントロールのインデックス
   * @return {function} - イベントリスナー関数を返す
   */
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

  // ラベルオプションが更新された際にラベルオプションとラベルマップを更新する副作用フック
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
          (
            acc: Record<string, string>,
            label: { id: string; name: string }
          ) => {
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

  // ラベルオプションが更新された際にデフォルトの選択状態を設定する副作用フック
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