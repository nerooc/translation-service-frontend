![Frame](https://user-images.githubusercontent.com/31045802/214465238-eb06f3d3-8281-42cb-affe-b63e80faed0b.png)
# Translation Service - Frontend
Cisco Academy Course final project

The application is used to save **messages** in the original language and add their translations in other languages. We can also add our own **languages** and **tags**, which can then be used to filter our messages.


## Technologies

The project is built using React, a popular JavaScript library for building user interfaces. React allows for the creation of reusable components that can be easily managed and updated, making the development process more efficient. Additionally, this project is using TypeScript, a superset of JavaScript that adds optional static typing and other features. This helps to catch errors early on in the development process, making the code more robust and maintainable.

To enhance the visual design of the project, it makes use of Material UI, a popular library that provides a wide variety of pre-built components that are designed to conform to the Material Design guidelines. This allows the project to have a consistent and professional look and feel, while also making it easier to implement common UI elements.

Furthermore, this project is also using MSW (Mock Service Worker) to mock requests to the backend. This is a useful tool during development as it allows the team to test the frontend without the need for a real backend to be set up. MSW intercepts network requests and returns pre-configured responses, which allows for a more efficient development process and faster feedback.

![image](https://user-images.githubusercontent.com/31045802/214466359-6f94a6eb-340a-425c-8941-87444cc7f9ef.png)



## Catalog structure

```bash
├── public # public folder holding the favicon and main index.html file
│   ├── favicon.ico
│   └── index.html
├── src # directory with the source code
│   ├── App.tsx # application's base component
│   ├── api # directory holding api handling - axios, requests, types
│   ├── assets # holding logo of the app
│   ├── components # all components used in the app
│   ├── constants # app routes
│   ├── hooks # facilitating access to data 
│   └── mocks # using msw to mock backend before integration
│       ├── languages
│       ├── messages
│       └── tags
├── pages # all the page components the app uses
│   ├── MessagePage
│   ├── LanguagePage
│   │   └── components
│   │       ├── CreateLanguageModal
│   │       ├── EditLanguageModal
│   │       └── LanguageCard
│   └── TagPage
│       └── components
│           ├── CreateTagModal
│           ├── EditTagModal
│           └── TagCard
├── styles # mui theme details that set the default styling motive
└── utils # utilitary functions
```

## Design

The initial design of the application was made using `Figma`. The design can be found here: 
https://www.figma.com/file/CP7dxnebzNiUjCv6dMaiyb/CISCO---Translation-Service?node-id=0%3A1&t=chUGRfuRNGaUXXSm-1

![image](https://user-images.githubusercontent.com/31045802/214466469-0973e6cd-3eb9-4f98-ac8c-a69d080977d6.png)



## Interface

The application's interface consists of 3 main parts pages:


### Messages

This page offers a list of messages that have specific content, language and tags.
Initially, the messages were intended to be displayed in a card format, but after carefully evaluating the number of actions required for one instance, it was determined that a list layout would be more suitable for this purpose.

| ![image](https://user-images.githubusercontent.com/31045802/214466669-e18ac764-e2f1-40f3-830d-5dd995647ddc.png) |
|-|



### Languages

On this page we can define the languages we will later use in the messages. The handling is simple and intuitional.
All data we have to pass is the name and code of the language e.g. 'English', 'EN'.

| ![image](https://user-images.githubusercontent.com/31045802/214466693-4056fb74-ce0f-47dc-a077-923f72564164.png) |
|-|

### Tags

We also handle different tags that can be used on messages for filtering purposes.
The only information the application needs to create a tag is it's name.

| ![image](https://user-images.githubusercontent.com/31045802/214466736-55a122aa-90c7-414f-899d-7aafa0894346.png) |
|-|


## Mocks - MSW

> Mock Service Worker enables API mocking on the highest level of the network communication chain. It is the closest thing to a mocking server without having to create one.

Read more -> https://mswjs.io/

If you implement something that needs data from the backend and it is not ready yet or simply you dont want to run it localy you can add couple of simple functions to mock desired requests. As an example you can take mocks created for languages `src/mocks/languages`. Please follow this structure to keep things consistent and dont forget to add created handlers in `src/mocks/handlers.ts` file.

## Testing
TBA
