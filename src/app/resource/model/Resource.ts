import {Tag} from '../../tag/model/Tag';

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  rating: number;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}
