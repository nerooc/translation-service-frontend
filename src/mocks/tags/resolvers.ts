import type {Tag, TagCreateData, TagUpdate} from 'api/types';
import type {TagsDeleteResolver, TagsGetResolver, TagsPostResolver, TagsPutResolver} from './types';

const tags: Tag[] = [
  {
    id: 1,
    name: 'Formal',
  },
  {
    id: 2,
    name: 'Informal',
  }
];

export const tagGetResolver: TagsGetResolver = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(tags),
  );
}

export const tagPostResolver: TagsPostResolver = async (req, res, ctx) => {
  const createdTagData = await req.json<TagCreateData>();

  const createdTag = {
    id: Date.now(),
    ...createdTagData,
  };

  tags.push(createdTag);

  return res(
    ctx.status(201),
    ctx.json(createdTag),
  );
}

export const tagPutResolver: TagsPutResolver = async (req, res, ctx) => {
  const updateTagData = await req.json<TagUpdate>();
  const tagId = parseInt(req.params.id);

  const foundTag = tags.find(tag => tag.id === tagId);

  if (!foundTag) {
    return res(
      ctx.status(404),
      ctx.json({error: `Tag with id=${tagId} does not exist`}),
    );
  }

  foundTag.name = updateTagData.name;

  return res(
    ctx.status(201),
    ctx.json(foundTag),
  );
}

export const tagDeleteResolver: TagsDeleteResolver = async (req, res, ctx) => {
  const tagId = parseInt(req.params.id);

  const tagToDeleteIndex = tags.findIndex(tag => tag.id === tagId);
  if (tagToDeleteIndex > -1) {
    const [deletedTag] = tags.splice(tagToDeleteIndex, 1);
    return res(
      ctx.status(200),
      ctx.json(deletedTag),
    );
  } else {
    return res(
      ctx.status(404),
      ctx.json({error: `Tag with id=${tagId} does not exist`}),
    );
  }
}