import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { api } from "../../api";

import { MessageForm } from "../../modules/MessageForm";
import { IMessage, IMessages, IStream } from "./entities";

import s from "./index.module.css";

import { useRootContext } from "../../context";
import { Stream } from "./Stream";
import { ReactComponent as NewImg } from "./img/new.svg";

export const StreamPage = () => {
  const { messageStore } = useRootContext();
  const { streamId } = useParams();

  if (streamId === undefined) return;

  // const [activeMessage, setActiveMessage] = useState<IMessage | null>(null);
  const [stream, setStream] = useState<IStream | null>(null);
  const [messages, setMessages] = useState<IMessages | null>(null);

  useEffect(() => {
    (async () => {
      await updateStream();
    })();
  }, [streamId]);

  useEffect(() => {
    messageStore.setStream(stream);
    messageStore.setOnCreate(async () => {
      await updateStream();
    });
  }, [stream]);

  const updateStream = async () => {
    const data = await api.streams.show(streamId);

    setStream(data.stream);
    setMessages(data.messages);
  };

  const handleClick = (message: IMessage) => {
    messageStore.setMessage(message);

    // if (message === activeMessage) {
    //   setActiveMessage(null);
    // } else {
    //   setActiveMessage(message);
    // }
  };

  useEffect(
    () => () => {
      messageStore.setStream(null);
      messageStore.setMessage(null);
      messageStore.setOnCreate(() => {});
    },
    [],
  );

  return (
    <div className={s.root}>
      {stream && messages && (
        <div>
          <div>{stream.text}</div>

          <div className={s.list}>
            {messages.map((message) => (
              <div key={message.id} className={s.item}>
                <div className={s.message}>
                  <div className={s.label}>{message.user?.label}</div>
                  <div className={s.context}>
                    <div className={s.user}>{message.user?.name}</div>
                    <div className={s.text}>{message.text}</div>
                  </div>

                  {!message.stream && (
                    <div className={s.reply}>
                      <button
                        type="button"
                        className={s.new}
                        onClick={() => handleClick(message)}
                      >
                        <NewImg />
                      </button>
                    </div>
                  )}
                </div>

                {message.stream && message.stream.id !== stream.id && (
                  <Stream stream={message.stream} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
