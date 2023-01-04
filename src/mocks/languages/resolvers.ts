import type { Language, LanguageCreateData } from 'api/types';
import type { LanguagesDeleteResolver, LanguagesGetResolver, LanguagesPostResolver } from './types';

const languages: Language[] = [
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

export const languageGetResolver: LanguagesGetResolver = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(languages),
  );
}

export const languagePostResolver: LanguagesPostResolver = async (req, res, ctx) => {
  const createdLanguageData = await req.json<LanguageCreateData>();

  const createdLanguage = {
    id: Date.now(),
    ...createdLanguageData,
  };

  languages.push(createdLanguage);

  return res(
    ctx.status(201),
    ctx.json(createdLanguage),
  );
}

export const languageDeleteResolver: LanguagesDeleteResolver = async (req, res, ctx) => {
  const languageId = parseInt(req.params.id);

  const languageToDeleteIndex = languages.findIndex(language => language.id === languageId);
  if (languageToDeleteIndex > -1) {
    const [deletedLanguage] = languages.splice(languageToDeleteIndex, 1);
    return res(
      ctx.status(200),
      ctx.json(deletedLanguage),
    );
  } else {
    return res(
      ctx.status(404),
      ctx.json({ error: `Language with id=${languageId} does not exist` }),
    );
  }
}