import { JSX } from "preact";
import { useState } from "preact/hooks";

/**
 * useFormState フック
 * 
 * フォームの状態を管理するためのカスタムフックです。
 * タイトルと本文の入力値を管理し、入力値が更新されたらそれぞれの状態を更新します。
 * 
 * @param {string} [initialTitle=""] - タイトルの初期値。
 * @param {string} [initialBody=""] - 本文の初期値。
 * @return {string} title - 現在のタイトルの値。
 * @return {function} setTitle - タイトル値を更新する関数。
 * @return {string} body - 現在の本文の値。
 * @return {function} setBody - 本文値を更新する関数。
 * @return {function} handleInputTitle - タイトルの入力変更を処理する関数。
 * @return {function} handleInputBody - 本文の入力変更を処理する関数。
 */
export function useFormState(initialTitle: string = "", initialBody: string = "") {
  // タイトルの状態を管理
  const [title, setTitle] = useState<string>(initialTitle);
  
  // 本文の状態を管理
  const [body, setBody] = useState<string>(initialBody);

  /**
   * タイトルの入力変更を処理
   * 
   * @param {JSX.TargetedEvent<HTMLInputElement>} event - タイトル入力の変更イベント
   */
  const handleInputTitle = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setTitle(newValue);
  };

  /**
   * 本文の入力変更を処理
   * 
   * @param {JSX.TargetedEvent<HTMLTextAreaElement>} event - 本文入力の変更イベント
   */
  const handleInputBody = (event: JSX.TargetedEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setBody(newValue);
  };

  return { title, setTitle, body, setBody, handleInputTitle, handleInputBody };
}