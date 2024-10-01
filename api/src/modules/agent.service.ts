import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { DemandDto } from 'src/demand/interface';
import { VivaRealResponse } from 'src/demand/vivareal';
import { Property } from 'src/persistance/property.schema';

@Injectable()
export class AgentService implements OnApplicationBootstrap  {

  private readonly logger = new Logger(AgentService.name);
  constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {}

  private page: Page = undefined;

  async onApplicationBootstrap() {
    await this.initialize();
  }

  async openSearch(demand: DemandDto) {
    await this.page.goto('??');
    await this.page.select('select#sort-by', 'preco:ASC');

    const page = this.page;

    while (true) {
      console.info("FIRST WHILE LOOP");
      await page.waitForSelector('.js-change-page', { visible: true });
        const changePageButtons = await page.$$('.js-change-page');
        if (changePageButtons.length === 0) {
            console.log('No change page buttons found.');
            break;
        }
        console.log('Buttons found', changePageButtons.length);

        const lastButton = changePageButtons[changePageButtons.length - 1];
        const isDisabled = await page.evaluate(el => el.hasAttribute('data-disabled'), lastButton);
        if (isDisabled) {
            console.log('No more pages to navigate.');
            break;
        }
        await lastButton.click();
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating async work
    }
    
  }

  async initialize() {

    const browser = await puppeteer.launch({
      headless: false
    });
    this.page = await browser.newPage();  
    this.page.on('response', async (response) => {
      const status = response.status();
      if (response.url().includes('/v2/listings') && status >= 200 && status < 300 && response.request().method() == 'GET') {
        try {
          const body = await response.json() as VivaRealResponse;
          console.info("ON RESPONSE", response.request().method());          
          this.persistRawJson(body);
        } catch(err) {
          console.error("CANNOT READ BODY", err.message);
        }      
      }    
    });

    // Your asynchronous initialization logic here
    console.log('Running async initialization...');
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating async work
    console.log('Initialization complete!');
  }


  async persistRawJson(json: VivaRealResponse) {
    const listings = json.search.result.listings.map(i => i.listing);
    console.info("Properties persisted", listings.length);
    

    const models = listings.map((item) => {
      return new this.propertyModel({
        reference: item.id,
        data: item,
      });
    });


    await this.propertyModel.bulkSave(models);   

    console.info(`SAVED ${models.length}`);

  }

}
