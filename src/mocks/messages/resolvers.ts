import type { Message, MessageCreateData } from "api/types";
import type {
  MessagesDeleteResolver,
  MessagesGetResolver,
  MessagesPostResolver,
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
    ],
  },
  {
    id: 4,
    originalMessage: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut purus eu orci mollis vestibulum quis id quam. Mauris interdum suscipit nisl, ut tincidunt dui molestie quis. Duis vestibulum, erat id congue egestas, lacus purus condimentum justo, vel pretium ipsum nisl sit amet tortor. Pellentesque iaculis purus purus, et elementum dolor pharetra eget. Nam convallis, nibh et gravida blandit, justo est blandit nisl, vel ultricies sem ligula vel arcu. Nullam sit amet elit fringilla dui malesuada lobortis ac nec urna. Nam iaculis lacus sed nisl malesuada, auctor volutpat ipsum aliquet. Integer molestie cursus arcu, id faucibus eros.",
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

export const messagePostResolver: MessagesPostResolver = async (
  req,
  res,
  ctx
) => {
  const createdMessageData = await req.json<MessageCreateData>();

  const createdMessage = {
    id: Date.now(),
    originalMessage: messages.find(
      (message) => message.id === createdMessageData.originalMessageId
    )?.originalMessage!,
    language: {
      id: 1,
      name: "English",
      code: "en",
    },
    ...createdMessageData,
  };

  messages.push(createdMessage);

  return res(ctx.status(201), ctx.json(createdMessage));
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
