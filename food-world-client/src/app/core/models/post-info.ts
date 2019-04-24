import { Title } from '@angular/platform-browser';

export interface PostInfo {
  url: string,
  imageUrl?: string,
  title: string,
  author: string,
  _id: string,
  description?: string
}
