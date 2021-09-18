import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScrapingService } from './scraping.service';
import { CreateScrapingInput } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';

@Resolver('Scraping')
export class ScrapingResolver {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Mutation('createScraping')
  create(
    @Args('createScrapingInput') createScrapingInput: CreateScrapingInput,
  ) {
    return this.scrapingService.create(createScrapingInput);
  }

  @Query('scraping')
  findAll() {
    return this.scrapingService.findAll();
  }

  @Query('scrape')
  scrapeAll() {
    return this.scrapingService.scrape();
  }

  @Query('scraping')
  findOne() {
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
