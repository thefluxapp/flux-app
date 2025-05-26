import { registerPlainText } from "@lexical/plain-text";
import { $rootTextContent } from "@lexical/text";
import { $getRoot, createEditor } from "lexical";
import { nanoid } from "nanoid";
import { type Component, type JSX, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import SubmitImg from "./../../wrapper/new/right.svg";
import AttachImg from "./../../wrapper/new/attach.svg";

import { useAuth } from "../../../../contexts/auth";
// import { useI18n } from "../../../../contexts/i18n";
import { IState, useMessages } from "../../../../contexts/messages";

export const New: Component = () => {
  const { authStore } = useAuth();
  const { append, messagesStore } = useMessages();
  // const { t } = useI18n();

  let editorRef!: HTMLDivElement;
  const editor = createEditor({});
  const [form, setForm] = createStore({
    text: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (authStore.user === null || messagesStore.rootStore === null)
      return null;

    append([
      {
        message_id: messagesStore.rootStore.messageStore.message_id,
        text: form.text,
        code: nanoid(),
        stream: null,
        state: IState.New,
        order: (performance.timeOrigin + performance.now()) * 1000,
        user: authStore.user,
      },
    ]);

    editor.update(() => {
      const root = $getRoot();
      root.clear();
    });
  };

  onMount(() => {
    editor.setRootElement(editorRef);

    registerPlainText(editor);

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setForm("text", $rootTextContent());
      });
    });
  });

  return (
    <div class={s.root}>
      <div class={s.media}>
        <button class={s.attach} disabled={true}><AttachImg /></button>
      </div>

      <div class={s.field}>
        <div class={s.input} contenteditable={true} ref={editorRef} />

        <div class={s.submit}>
          <button
            class={s.save}
            type="button"
            disabled={form.text.length < 3}
            onClick={handleSubmit}
          >
            <SubmitImg />
          </button>
        </div>
      </div>
    </div>
  );
};
