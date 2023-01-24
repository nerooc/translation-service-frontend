import type {Language, LanguageCreateData, LanguageUpdate} from 'api/types';
import type {LanguagesDeleteResolver, LanguagesGetResolver, LanguagesPostResolver, LanguagesPutResolver} from './types';

export const languages: Language[] = [
  {
    id: 1,
    name: 'English',
    code: 'EN',
  },
  {
    id: 2,
    name: 'Polish',
    code: 'PL',
  },
  {
    id: 3,
    name: 'German',
    code: 'DE',
  },
  {
    id: 4,
    name: 'Romanian',
    code: 'RO',
  },
  {
    id: 5,
    name: 'Swedish',
    code: 'SE',
  },
  {
    id: 6,
    name: 'Dutch',
    code: 'NL',
  },
  {
    id: 7,
    name: 'French',
    code: 'FR',
  },
  {
    id: 8,
    name: 'Spanish',
    code: 'ES',
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

export const languagePutResolver: LanguagesPutResolver = async (req, res, ctx) => {
  const updateLanguageData = await req.json<LanguageUpdate>();
  const languageId = parseInt(req.params.id);

  const foundLang = languages.find(lang => lang.id === languageId);

  if (!foundLang) {
    return res(
      ctx.status(404),
      ctx.json({error: `Language with id=${languageId} does not exist`}),
    );
  }

  foundLang.code = updateLanguageData.code;
  foundLang.name = updateLanguageData.name;

  return res(
    ctx.status(201),
    ctx.json(updateLanguageData),
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
      ctx.json({error: `Language with id=${languageId} does not exist`}),
    );
  }
}