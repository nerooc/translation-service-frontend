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

const messages: Message[] = [
  {
    id: 1,
    originalMessage: null,
    content: "Hello world",
    language: languages[0],
    tags: tags.slice(0, 2),
  },
  {
    id: 2,
    originalMessage: "Hello world",
    content: "Cześć świecie",
    language: languages[1],
    tags: tags.slice(0, 2),
  },
  {
    id: 3,
    originalMessage: null,
    content: "Home page",
    language: languages[0],
    tags: tags.slice(1, 2),
  },
  {
    id: 4,
    originalMessage: null,
    content: "Cat",
    language: languages[0],
    tags: tags,
  },
  {
    id: 5,
    originalMessage:  "Cat",
    content: "Die Katze",
    language: languages[2],
    tags: tags,
  },
  {
    id: 6,
    originalMessage: "Home page",
    content: "Das Haus",
    language: languages[2],
    tags: tags.slice(1, 2),
  },
  {
    id: 7,
    originalMessage: "Home page",
    content: "Dom",
    language: languages[1],
    tags: tags.slice(1, 2),
  },
  {
    id: 8,
    originalMessage: null,
    content: "Healthy lifestyle",
    language: languages[0],
    tags: [],
  },
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
    (message) => message.content === createdMessageData.originalMessage
  )?.content || null

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
  return res(ctx.status(200), ctx.json(messages));
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
