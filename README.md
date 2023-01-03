# translation-service-frontend
Cisco Academy Course final project - Translation Service

## MSW

> Mock Service Worker enables API mocking on the highest level of the network communication chain. It is the closest thing to a mocking server without having to create one.

Read more -> https://mswjs.io/

If you implement something that needs data from the backend and it is not ready yet or simply you dont want to run it localy you can add couple of simple functions to mock desired requests. As an example you can take mocks created for languages `src/mocks/languages`. Please follow this structure to keep things consistent and dont forget to add created handlers in `src/mocks/handlers.ts` file