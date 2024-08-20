import { JSX } from "preact";
import { useState } from "preact/hooks";

/**
 * useCheckbox フック
 * 
 * ActionFooter コンポーネントで使用されるチェックボックスの状態を管理します。
 * 
 * @return {[boolean, (event: JSX.TargetedEvent<HTMLInputElement>) => void]} - チェックボックスの状態と変更関数
 */
export function useCheckbox(): [
  boolean,
  (event: JSX.TargetedEvent<HTMLInputElement>) => void
] {
  const [value, setValue] = useState<boolean>(false);
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    setValue(newValue);
  }
  return [value, handleChange];
}
