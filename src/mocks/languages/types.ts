import { rest } from 'msw';

export type LanguagesGetResolver = Parameters<typeof rest.get>[1];

export type LanguagesPostResolver = Parameters<typeof rest.post<{name: string, code: string}>>[1];

export type LanguagesDeleteResolver = Parameters<typeof rest.delete<{}, {id: string}>>[1];
