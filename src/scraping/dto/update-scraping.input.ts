import { CreateScraping } from './create-scraping.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateScrapingInput extends PartialType(CreateScraping) {
  id: number;
}
