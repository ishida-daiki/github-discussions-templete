import { DropdownOption } from "@create-figma-plugin/ui";
import { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";

/**
 * useDiscussionCategories フック
 * 
 * GitHub Discussions のカテゴリを取得し、これらのカテゴリオプションおよび選択状態を管理します。
 * 
 * @return {Array<DropdownOption>} options - ドロップダウン用のカテゴリオプションの配列。
 * @return {null | string} category - 現在選択されているカテゴリ。
 * @return {function} setCategory - 現在選択されているカテゴリを設定する関数。
 * @return {Record<string, string>} categoryMap - カテゴリ名とカテゴリIDのマッピング。
 * @return {function} handleTagChange - カテゴリタグの変更を処理する関数。
 */
export function useDiscussionCategories() {
  const [options, setOptions] = useState<Array<DropdownOption>>([]);
  const [category, setCategory] = useState<null | string>(null);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  /**
   * カテゴリの変更を処理する関数
   * 
   * @param {JSX.TargetedEvent<HTMLInputElement>} event - タグ変更イベント
   */
  function handleTagChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newTag = event.currentTarget.value;
    setCategory(newTag);
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === "discussion-categories") {
        const filteredCategories = pluginMessage.categories;
        const newOptions = filteredCategories.map(
          (category: { name: string }) => ({
            value: category.name,
          })
        );
        setOptions(newOptions);
        setCategoryMap(pluginMessage.categoryMap);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return { options, category, setCategory, categoryMap, handleTagChange };
}