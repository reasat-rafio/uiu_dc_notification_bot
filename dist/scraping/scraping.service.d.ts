import { NestCrawlerService } from 'nest-crawler';
import { CreateScraping } from './dto/create-scraping.input';
import { UpdateScrapingInput } from './dto/update-scraping.input';
interface Data {
    title: string;
    content: string;
}
export declare class ScrapingService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    formetData: (data: Data) => CreateScraping[];
    create(createScrapingInput: CreateScraping): string;
    scrape(): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateScrapingInput: UpdateScrapingInput): string;
    remove(id: number): string;
}
export {};
