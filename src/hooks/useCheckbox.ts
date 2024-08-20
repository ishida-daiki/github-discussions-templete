import { JSX } from "preact";
import { useState } from "preact/hooks";

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
