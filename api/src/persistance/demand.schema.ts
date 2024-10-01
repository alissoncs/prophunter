import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DemandDocument = HydratedDocument<Demand>;

@Schema()
export class Demand {
  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  state: string;

  @Prop()
  userId: string;
}

export const DemandSchema = SchemaFactory.createForClass(Demand);