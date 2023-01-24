import { rest } from 'msw';

import {tagDeleteResolver, tagGetResolver, tagPostResolver, tagPutResolver} from './resolvers'

export const tagHandlers = [
  rest.get('/tags', tagGetResolver),
  rest.post('/tags', tagPostResolver),
  rest.put('/tags/:id', tagPutResolver),
  rest.delete('/tags/:id', tagDeleteResolver),
];
