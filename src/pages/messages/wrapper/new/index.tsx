import { useMatch, useNavigate } from "@solidjs/router";
import { createEffect, onMount, Show, type JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { useAuth } from "../../../../contexts/auth";
import { useAPI } from "../../../../contexts/api";

import SubmitImg from "./right.svg";

import s from "./index.module.css";
import { nanoid } from "nanoid";
import { $getRoot, $setSelection, createEditor } from "lexical";
import { registerPlainText } from "@lexical/plain-text";
import { $rootTextContent } from "@lexical/text";

export const MessagesNew = () => {
  const navigate = useNavigate();
  const { authStore } = useAuth();
  const api = useAPI();
  const isNew = useMatch(() => "/messages/new");

  let editorRef!: HTMLDivElement;
  const editor = createEditor({});
  const [form, setForm] = createStore({
    text: "",
  });

  const handleFocus: JSX.EventHandler<HTMLDivElement, FocusEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (!isNew()) {
      navigate("/messages/new");
    }
  };

  createEffect(async () => {
    if (!isNew()) {
      editor.update(() => {
        $getRoot().clear();
        $setSelection(null);
      });
    }
  }, [isNew]);

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    e,
  ) => {
    e.preventDefault();

    const res = await api.messages.create_message({
      message_id: null,
      text: form.text,
      code: nanoid(),
    });

    if (res) {
      navigate(`/messages/${res.message.message_id}`);
    } else {
      // TODO: handle error
    }
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
    <div class={s.root} classList={{ [s.active]: Boolean(isNew()) }}>
      <div
        class={s.input}
        onFocus={handleFocus}
        contentEditable="plaintext-only"
        ref={editorRef}
      />

      <Show when={authStore.user !== null}>
        <div class={s.submit}>
          <button
            class={s.button}
            type="button"
            disabled={form.text.length < 3}
            onClick={handleSubmit}
          >
            <SubmitImg />
          </button>
        </div>
      </Show>
    </div>
  );
};
