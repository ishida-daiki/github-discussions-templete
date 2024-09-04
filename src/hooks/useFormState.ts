import { JSX } from "preact";
import { useState } from "preact/hooks";

type UseFormStateResult = {
  /**
   * 現在のタイトルの値
   */
  title: string;
  /**
   * タイトル値を更新する関数
   */
  setTitle: (title: string) => void;
  /**
   * 現在の本文の値
   */
  body: string;
  /**
   * 本文値を更新する関数
   */
  setBody: (body: string) => void;
  /**
   * タイトルの入力変更を処理する関数
   */
  handleInputTitle: (event: JSX.TargetedEvent<HTMLInputElement>) => void;
  /**
   * 本文の入力変更を処理する関数
   */
  handleInputBody: (event: JSX.TargetedEvent<HTMLTextAreaElement>) => void;
}

/**
 * useFormState フック
 * 
 * フォームの状態を管理するためのカスタムフックです。
 * タイトルと本文の入力値を管理し、入力値が更新されたらそれぞれの内容を更新します。
 * 
 * @param {string} [initialTitle=""] - タイトルの初期値。
 * @param {string} [initialBody=""] - 本文の初期値。
 * @returns {UseFormStateResult} 結果オブジェクトには以下のプロパティが含まれます:
 * - title: 現在のタイトルの値
 * - setTitle: タイトル値を更新する関数
 * - body: 現在の本文の値
 * - setBody: 本文値を更新する関数
 * - handleInputTitle: タイトルの入力変更を処理する関数
 * - handleInputBody: 本文の入力変更を処理する関数
 */
export function useFormState(initialTitle: string = "", initialBody: string = ""): UseFormStateResult {
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