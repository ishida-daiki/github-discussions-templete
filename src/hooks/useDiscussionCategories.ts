import { DropdownOption } from "@create-figma-plugin/ui";
import { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";

/**
 * useDiscussionCategories フック
 *
 * ディスカッションに設定するカテゴリオプションを管理するためのカスタムフック。
 * GitHub Discussions のカテゴリを取得、選択状態の管理を行う。
 */
export function useDiscussionCategories() {
  const [options, setOptions] = useState<Array<DropdownOption>>([]);
  const [category, setCategory] = useState<null | string>(null);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

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
  return { handleTagChange, options, category, setCategory, categoryMap };
}
