import axios, { AxiosResponse } from 'axios';
import { PaginatedEventsData, UserEvent } from '../types/events';

interface PaginationOptions {
  page?: number;
  perPage?: number;
}

export const getEvents = async (options?: PaginationOptions): Promise<{ data: UserEvent[]; pagination: any } | undefined> => {
  try {
    const { page = 1, perPage = 6 } = options || {};
    const response: AxiosResponse<PaginatedEventsData> = await axios.get(`http://localhost:3000/events?_page=${page}&_per_page=${perPage}`);
    const pagination = { totalPages: 2, currentPage: page, perPage };
    
    return { data: response.data.data, pagination };
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};

export const getEventById = async (eventId: number): Promise<UserEvent | undefined> => {
  try {
    const response: AxiosResponse<UserEvent> = await axios.get(`http://localhost:3000/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
