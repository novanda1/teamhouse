import { Type } from '../types';
import { SchemaOptions, SchemaDefinitionProperty, SchemaType } from 'mongoose';
import { isTargetEqual } from '../utils/is-target-equal';

export type PropOptions<T = any> =
  | Partial<SchemaDefinitionProperty<T>>
  | SchemaType;

export interface PropertyMetadata {
  target: Function;
  propertyKey: string;
  options: PropOptions;
}

export interface SchemaMetadata {
  target: Function;
  options?: SchemaOptions | undefined;
  properties?: PropertyMetadata[];
}

export class TypeMetadataStorageHost {
  private schemas = new Array<SchemaMetadata>();
  private properties = new Array<PropertyMetadata>();

  getSchemaMetadataByTarget(target: Type<unknown>): SchemaMetadata | undefined {
    return this.schemas.find((item) => item.target === target);
  }

  addSchemaMetadata(metadata: SchemaMetadata) {
    this.compileClassMetadata(metadata);
    this.schemas.push(metadata);
  }

  private compileClassMetadata(metadata: SchemaMetadata) {
    const belongsToClass = isTargetEqual.bind(undefined, metadata);

    if (!metadata.properties) {
      metadata.properties = this.getClassFieldsByPredicate(belongsToClass);
    }
  }

  private getClassFieldsByPredicate(
    belongsToClass: (item: PropertyMetadata) => boolean,
  ) {
    return this.properties.filter(belongsToClass);
  }
}

const globalRef = global as any;
export const TypeMetadataStorage: TypeMetadataStorageHost =
  globalRef.MongoTypeMetadataStorage ||
  (globalRef.MongoTypeMetadataStorage = new TypeMetadataStorageHost());
