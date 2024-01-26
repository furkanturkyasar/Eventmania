export interface PaginationType {
    first: number | null;
    prev: number | null;
    next: number | null;
    last: number | null;
    pages: number;
    items: number;
  }
  
  export interface UserReview {
    id: number;
    rating: number;
    comment: string;
  }
  
  export interface UserEvent {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    date: string;
    location: string;
    reviews: UserReview[];
  }
  
  export interface PaginatedEventsData {
    data: UserEvent[];
    pagination: PaginationType;
  }
  