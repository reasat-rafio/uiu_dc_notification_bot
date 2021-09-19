import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScrapingService } from './scraping.service';
import { CreateScraping } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';
import { Cron } from '@nestjs/schedule';

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

  // @Cron('0 */30 * * * *')
  // @Cron('5 * * * * *')
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
