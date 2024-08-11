import { JSX } from "preact";
import { useState } from "preact/hooks";

/**
 * useFormState フック
 * 
 * フォームの状態を管理するためのカスタムフック。
 * タイトルと本文の入力値を管理し、入力値が更新されたときにはそれぞれの状態を更新する。
 */
export function useFormState(
  initialTitle: string = "",
  initialBody: string = ""
) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [body, setBody] = useState<string>(initialBody);

  const handleInputTitle = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setTitle(newValue);
  };

  const handleInputBody = (event: JSX.TargetedEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setBody(newValue);
  };

  return { title, setTitle, body, setBody, handleInputTitle, handleInputBody };
}
