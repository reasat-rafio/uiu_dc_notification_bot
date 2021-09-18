import { ScrapingService } from './scraping.service';
import { CreateScraping } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';
export declare class ScrapingResolver {
    private readonly scrapingService;
    constructor(scrapingService: ScrapingService);
    create(createScrapingInput: CreateScraping): string;
    findAll(): string;
    scrapeAll(): Promise<void>;
    update(updateScrapingInput: UpdateScrapingInput): string;
    remove(id: number): string;
}
