import { rest } from 'msw';

export const handlers = [
  rest.get('/languages', (_, res, ctx) => {

    const languages = [
      {
        id: 1,
        name: 'Poland',
        code: 'PL',
      },
      {
        id: 2,
        name: 'United States',
        code: 'US',
      },
    ];

    return res(
      ctx.status(200),
      ctx.json(languages),
    );
  }),
];
