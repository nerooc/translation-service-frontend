import { rest } from 'msw';

import {languageDeleteResolver, languageGetResolver, languagePostResolver} from './resolvers'

export const languageHandlers = [
  rest.get('/languages', languageGetResolver),
  rest.post('/languages', languagePostResolver),
  rest.delete('/languages/:id', languageDeleteResolver),
];
