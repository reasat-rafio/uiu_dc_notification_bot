import { CreateScrapingInput } from './create-scraping.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateScrapingInput extends PartialType(CreateScrapingInput) {
  id: number;
}
