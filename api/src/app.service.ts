import { Injectable, Logger } from '@nestjs/common';
import { DemandDto, LoadDto } from './demand/interface';
import { InjectModel } from '@nestjs/mongoose';
import { Demand, DemandDocument } from './persistance/demand.schema';
import { Model } from 'mongoose';
import { page } from './main';
import { AgentService } from './modules/agent.service';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectModel(Demand.name) private demandModel: Model<Demand>,
    private agentService: AgentService
  ) {}

  async createDemand(data: DemandDto) {

    const demand = await this.demandModel.create({
      city: data.city,
      district: data.district,
      userId: data.userId,
    });

    return {
      id: demand.id,
    }

  }

  async loadProperties(data: LoadDto) {

    const demand = await this.demandModel.findOne();
    this.logger.log("demand found", demand);

    await this.agentService.openSearch(demand.toJSON());
  }
}
