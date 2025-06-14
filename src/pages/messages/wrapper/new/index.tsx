import { registerPlainText } from "@lexical/plain-text";
import { $rootTextContent } from "@lexical/text";
import { useMatch, useNavigate } from "@solidjs/router";
import { $getRoot, $setSelection, createEditor } from "lexical";
import { nanoid } from "nanoid";
import { type JSX, createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import SaveImg from "./save.svg";

import { useAPI } from "../../../../contexts/api";
import { useAuth } from "../../../../contexts/auth";
import { useI18n } from "../../../../contexts/i18n";

export const MessagesNew = () => {
  const navigate = useNavigate();
  const { authStore } = useAuth();
  const { t } = useI18n();
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
      <div class={s.field}>
        <div
          class={s.input}
          onFocus={handleFocus}
          contentEditable="plaintext-only"
          data-placeholder={t.new.placeholder()}
          ref={editorRef}
        />

        <div class={s.submit}>
          <button
            class={s.save}
            type="button"
            disabled={form.text.length < 3 || authStore.user === null}
            onClick={handleSubmit}
          >
            <SaveImg />
          </button>
        </div>
      </div>
    </div>
  );
};
