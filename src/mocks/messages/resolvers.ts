import type { Message, MessageCreateData, MessageUpdate } from "api/types";
import type {
  MessagesGetResolver,
  MessagesPutResolver,
  MessagesPostResolver,
  MessagesDeleteResolver,
  MessageTagDeleteResolver,
} from "./types";

const messages: Message[] = [
  {
    id: 1,
    originalMessage: 1,
    content: "Hello world",
    language: {
      id: 1,
      name: "English",
      code: "en",
    },
    tags: [
      {
        id: 1,
        name: "Hello",
      },
      {
        id: 2,
        name: "World",
      },
    ],
  },
  {
    id: 2,
    originalMessage: 1,
    content: "Cześć świecie",
    language: {
      id: 2,
      name: "Polish",
      code: "pl",
    },
    tags: [
      {
        id: 1,
        name: "Hello",
      },
      {
        id: 2,
        name: "World",
      },
    ],
  },
  {
    id: 3,
    originalMessage: 1,
    content: "Cześć świecie",
    language: {
      id: 2,
      name: "Polish",
      code: "pl",
    },
    tags: [
      {
        id: 1,
        name: "Hello",
      },
      {
        id: 2,
        name: "World",
      },
      {
        id: 3,
        name: "Dupppa",
      },
    ],
  },
  {
    id: 4,
    originalMessage: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut purus eu orci mollis vestibulum quis id quam. Mauris interdum suscipit nisl, ut tincidunt dui molestie quis. Duis vestibulum, erat id congue egestas, lacus purus condimentum justo",
    language: {
      id: 2,
      name: "Polish",
      code: "pl",
    },
    tags: [
      {
        id: 1,
        name: "Hello",
      },
      {
        id: 2,
        name: "World",
      },
      {
        id: 3,
        name: "Hello",
      },
      {
        id: 4,
        name: "World",
      },
      {
        id: 5,
        name: "Hello",
      },
      {
        id: 6,
        name: "World",
      },
    ],
  }
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
    (message) => message.id === createdMessageData.originalMessage
  )?.id || null

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
