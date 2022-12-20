import axios from './axiosInstance';

import type { Message, MessageCreateData, MessageUpdate } from './types';

export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const result = await axios.get<Message[]>('/messages');
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to fetch messages');
  }
}

export const createMessage = async (data: MessageCreateData): Promise<Message> => {
  try {
    const result = await axios.post<Message>('/messages', data);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to create message');
  }
}

export const updateMessage = async (id: number, update: MessageUpdate): Promise<Message> => {
  try {
    const result = await axios.put<Message>(`/messages/${id}`, update);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to update message');
  }
}

export const deleteMessage = async (id: number): Promise<Message> => {
  try {
    const result = await axios.delete<Message>(`/messages/${id}`);
    return result.data;
  } catch (error) {
    // TODO: Add axios error parser
    throw new Error('Failed to delete message');
  }
}
