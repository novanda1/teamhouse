import { Document, Schema } from 'mongoose';
import { TypeMetadataStorage } from '../storage/type-metadata';
import { Type } from '../types';
import { DefinitionsFactory } from './definitionFactory';

export class SchemaFactory {
  static createForClass<
    TClass extends any = any,
    TDocument extends Document = TClass extends Document
      ? TClass
      : Document<TClass>,
  >(target: Type<TClass>): Schema<TDocument> {
    const schemaDefinition = DefinitionsFactory.createForClass(target);
    const schemaMetadata =
      TypeMetadataStorage.getSchemaMetadataByTarget(target);

    return new Schema<TDocument>(
      schemaDefinition,
      schemaMetadata && schemaMetadata.options,
    );
  }
}
