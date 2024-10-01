import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Demand, DemandSchema } from './persistance/demand.schema';
import { AgentService } from './modules/agent.service';
import { Property, PropertySchema } from './persistance/property.schema';

const MONGO_CONNECTION_URL = 'mongodb://localhost:27017/prophunter_db';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION_URL),
    MongooseModule.forFeature([
      { name: Demand.name, schema: DemandSchema },
      { name: Property.name, schema: PropertySchema }
    ])
  ],
  controllers: [AppController],
  providers: [AgentService, AppService],
})
export class AppModule {}
