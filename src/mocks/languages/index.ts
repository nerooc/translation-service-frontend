import { rest } from 'msw';

import {languageDeleteResolver, languageGetResolver, languagePostResolver, languagePutResolver} from './resolvers'

export const languageHandlers = [
  rest.get('/languages', languageGetResolver),
  rest.post('/languages', languagePostResolver),
  rest.put('/languages/:id', languagePutResolver),
  rest.delete('/languages/:id', languageDeleteResolver),
];
