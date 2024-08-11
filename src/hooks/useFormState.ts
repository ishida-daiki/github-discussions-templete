import { JSX } from "preact";
import { useState } from "preact/hooks";

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
