import axios from './axiosInstance';

import type { Tag, TagCreateData, TagUpdate } from './types';

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const result = await axios.get<Tag[]>('/tags');
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to fetch tags');
  }
}

export const createTag = async (data: TagCreateData): Promise<Tag> => {
  try {
    const result = await axios.post<Tag>('/tags', data);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to create tag');
  }
}

export const updateTag = async (id: number, update: TagUpdate): Promise<Tag> => {
  try {
    const result = await axios.put<Tag>(`/tags/${id}`, update);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to update tag');
  }
}

export const deleteTag = async (id: number): Promise<Tag> => {
  try {
    const result = await axios.delete<Tag>(`/tags/${id}`);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to delete tag');
  }
}
