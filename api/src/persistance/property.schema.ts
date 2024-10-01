import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VivaRealProperty } from 'src/demand/vivareal';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
    @Prop({ index: true })
    reference: string;
    
    @Prop({ type: VivaRealProperty })
    data: VivaRealProperty;
}

export const PropertySchema = SchemaFactory.createForClass(Property);