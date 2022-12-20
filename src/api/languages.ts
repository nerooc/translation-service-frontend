import axios from './axiosInstance';

import type { Language, LanguageCreateData, LanguageUpdate } from './types';

export const fetchLanguages = async (): Promise<Language[]> => {
  try {
    const result = await axios.get<Language[]>('/languages');
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to fetch languages');
  }
}

export const createLanguage = async (data: LanguageCreateData): Promise<Language> => {
  try {
    const result = await axios.post<Language>('/languages', data);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to create language');
  }
}

export const updateLanguage = async (id: number, update: LanguageUpdate): Promise<Language> => {
  try {
    const result = await axios.put<Language>(`/languages/${id}`, update);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to update language');
  }
}

export const deleteLanguage = async (id: number): Promise<Language> => {
  try {
    const result = await axios.delete<Language>(`/languages/${id}`);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to delete language');
  }
}
