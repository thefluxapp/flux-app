import { Title } from "@solidjs/meta";

import s from "./index.module.css";
import { useI18n } from "../../contexts/i18n";
import { For } from "solid-js";


export const AboutPage = () => {
  const { t } = useI18n()

  return <>
    <Title>{t.about.meta.title()}</Title>

    <main class={s.main}>
      <section class={s.intro}>
        <h1>{t.about.title()}</h1>
        <p>{t.about.desc()}</p>
      </section>

      <section class={s.summary}>
        <h2>{t.about.summary.title()}</h2>
        <For each={t.about.summary.text()}>
          {p => <p>{p}</p>}
        </For>

      </section>

      <section class={s.streams}>
        <h2>{t.about.streams.title()}</h2>
        <For each={t.about.streams.text()}>
          {p => <p>{p}</p>}
        </For>
      </section>

      <section class={s.adhoc}>
        <h2>{t.about.adhoc.title()}</h2>
        <For each={t.about.adhoc.text()}>
          {p => <p>{p}</p>}
        </For>
      </section>

      <section class={s.rhythm}>
        <h2>{t.about.rhythm.title()}</h2>
        <For each={t.about.rhythm.text()}>
          {p => <p>{p}</p>}
        </For>
      </section>

      <section class={s.ai}>
        <h2>{t.about.ai.title()}</h2>
        <For each={t.about.ai.text()}>
          {p => <p>{p}</p>}
        </For>
      </section>
    </main >
  </>
}
