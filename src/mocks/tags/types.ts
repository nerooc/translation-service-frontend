import { rest } from 'msw';

export type TagsGetResolver = Parameters<typeof rest.get>[1];

export type TagsPostResolver = Parameters<typeof rest.post<{name: string}>>[1];

export type TagsPutResolver = Parameters<typeof rest.put<{ name: string }, {id: string}>>[1];

export type TagsDeleteResolver = Parameters<typeof rest.delete<{}, {id: string}>>[1];
