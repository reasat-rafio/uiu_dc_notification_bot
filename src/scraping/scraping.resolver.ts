import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScrapingService } from './scraping.service';
import { CreateScraping } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';

@Resolver('Scraping')
export class ScrapingResolver {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Mutation('createScraping')
  create(@Args('createScrapingInput') createScrapingInput: CreateScraping) {
    return this.scrapingService.create(createScrapingInput);
  }

  @Query('scraping')
  findAll() {
    return this.scrapingService.findAll();
  }

  @Mutation('scrape')
  scrapeAll(): Promise<void> {
    return this.scrapingService.scrape();
  }

  @Mutation('updateScraping')
  update(
    @Args('updateScrapingInput') updateScrapingInput: UpdateScrapingInput,
  ) {
    return this.scrapingService.update(
      updateScrapingInput.id,
      updateScrapingInput,
    );
  }

  @Mutation('removeScraping')
  remove(@Args('id') id: number) {
    return this.scrapingService.remove(id);
  }
}
