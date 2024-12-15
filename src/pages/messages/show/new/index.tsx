import { onMount, type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { nanoid } from "nanoid";
import { $rootTextContent } from "@lexical/text";
import { $getRoot, createEditor } from "lexical";
import { registerPlainText } from "@lexical/plain-text";

import s from "./index.module.css";

import { useAuth } from "../../../../contexts/auth";
import { useI18n } from "../../../../contexts/i18n";
import { IState, useMessages } from "../../../../contexts/messages";

export const New: Component = () => {
  const { authStore } = useAuth();
  const { append, messagesStore } = useMessages();
  const { t } = useI18n();

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
      <div>
        <div class={s.image} style={{ background: authStore.user?.color }}>
          {authStore.user?.abbr}
        </div>
      </div>

      <div>
        <div class={s.field}>
          <div class={s.label}>{authStore.user?.name}</div>

          <div class={s.input} contenteditable={true} ref={editorRef} />
        </div>

        <div class={s.submit}>
          <button
            class={s.button}
            type="button"
            onClick={handleSubmit}
            disabled={form.text.length < 3}
          >
            {t.message.submit()}
          </button>
        </div>
      </div>
    </div>
  );
};
