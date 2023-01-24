import type { Message, MessageCreateData, MessageUpdate } from "api/types";
import type {
  MessagesGetResolver,
  MessagesPutResolver,
  MessagesPostResolver,
  MessagesDeleteResolver,
  MessageOriginalGetResolver,
  MessageTagDeleteResolver,
} from "./types";

import {languages} from 'mocks/languages/resolvers';
import {tags} from 'mocks/tags/resolvers';

const message1 = {
  id: 1,
  originalMessage: null,
  content: "Hello world",
  language: languages[0],
  tags: tags.slice(0, 2),
};
const message2 = {
  id: 2,
  originalMessage: message1,
  content: "Cześć świecie",
  language: languages[1],
  tags: tags.slice(0, 2),
};
const message3 = {
  id: 3,
  originalMessage: null,
  content: "Home page",
  language: languages[0],
  tags: tags.slice(1, 2),
};
const message4 = {
  id: 4,
  originalMessage: null,
  content: "Cat",
  language: languages[0],
  tags: tags,
};
const message5 = {
  id: 5,
  originalMessage: message4,
  content: "Die Katze",
  language: languages[2],
  tags: tags,
};
const message6 = {
  id: 6,
  originalMessage: message3,
  content: "Das Haus",
  language: languages[2],
  tags: tags.slice(1, 2),
};
const message7 = {
  id: 7,
  originalMessage: message3,
  content: "Dom",
  language: languages[1],
  tags: tags.slice(1, 2),
};
const message8 = {
  id: 8,
  originalMessage: null,
  content: "Healthy lifestyle",
  language: languages[0],
  tags: [],
};

const messages: Message[] = [
  message1,
  message2,
  message3,
  message4,
  message5,
  message6,
  message7,
  message8,
];

export const messageGetResolver: MessagesGetResolver = (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(messages));
};

export const messagePutResolver: MessagesPutResolver = async (
  req,
  res,
  ctx
) => {
  const messageUpdate= await req.json<MessageUpdate>();
  const messageId = parseInt(req.params.id);

  const messageToUpdate = messages.find(message => message.id === messageId);

  if (!messageToUpdate) {
    return res(
      ctx.status(404),
      ctx.json({ error: `Message with id=${messageId} does not exist` })
    );
  }

  messageToUpdate.content = messageUpdate.content;
  messageToUpdate.language = messageUpdate.language;
  messageToUpdate.tags = messageUpdate.tags;
  messageToUpdate.originalMessage = messageUpdate.originalMessage;

  return res(ctx.status(200), ctx.json(messageToUpdate));
};

export const messagePostResolver: MessagesPostResolver = async (
  req,
  res,
  ctx
) => {
  const createdMessageData = await req.json<MessageCreateData>();
  const originalMessage = messages.find(
    (message) => message.id === createdMessageData.originalMessage?.id
  ) || null

  const createdMessage = {
    id: Date.now(),
    ...createdMessageData,
    originalMessage,
  };

  messages.push(createdMessage);

  return res(ctx.status(201), ctx.json(null));
};

export const messageDeleteResolver: MessagesDeleteResolver = async (
  req,
  res,
  ctx
) => {
  const messageId = parseInt(req.params.id);

  const messageToDeleteIndex = messages.findIndex(
    (message) => message.id === messageId
  );
  if (messageToDeleteIndex > -1) {
    const [deletedMessage] = messages.splice(messageToDeleteIndex, 1);
    return res(ctx.status(200), ctx.json(deletedMessage));
  } else {
    return res(
      ctx.status(404),
      ctx.json({ error: `Message with id=${messageId} does not exist` })
    );
  }
};

export const messageOriginalGetResolver: MessageOriginalGetResolver = (_, res, ctx) => {
  const originalMessages = messages.filter(message => message.originalMessage === null);
  return res(ctx.status(200), ctx.json(originalMessages));
};


export const messageDeleteTagResolver: MessageTagDeleteResolver = async (
  req,
  res,
  ctx,
) => {
  const messageId = parseInt(req.params.id);
  const tagId = parseInt(req.params.tagId);

  const message = messages.find(
    (message) => message.id === messageId
  );

  if (!message) {
    return res(
      ctx.status(404),
      ctx.json({ error: `Message with id=${messageId} does not exist` })
    );
  }

  const tagToDeleteIndex = message.tags.findIndex(tag => tag.id === tagId);

  if (tagToDeleteIndex === -1) {
    return res(
      ctx.status(404),
      ctx.json({ error: `Tag with id=${tagId} does not exist` })
    );
  }

  const [deletedTag] = message.tags.splice(tagToDeleteIndex, 1);
  return res(ctx.status(200), ctx.json(deletedTag));
}
