import {
  SchemaDefinition,
  SchemaTypeOptions,
  SchemaType,
  Schema,
} from 'mongoose';
import { PropOptions, TypeMetadataStorage } from '../storage/type-metadata';
import { Type } from '../types';

const BUILT_IN_TYPES: Function[] = [Boolean, Number, String, Map, Date];

export class DefinitionsFactory {
  static createForClass(target: Type<unknown>): SchemaDefinition {
    let schemaDefinition: SchemaDefinition = {};
    let parent: Function = target;

    while (parent.prototype !== 'undefined') {
      if (parent === Function.prototype) {
        break;
      }
      const schemaMetadata = TypeMetadataStorage.getSchemaMetadataByTarget(
        parent as Type<unknown>,
      );
      if (!schemaMetadata) {
        parent = Object.getPrototypeOf(parent);
        continue;
      }
      schemaMetadata.properties?.forEach((item) => {
        const options = this.inspectTypeDefinition(item.options as any);
        this.inspectRef(item.options as any);

        schemaDefinition = {
          [item.propertyKey]: options as any,
          ...schemaDefinition,
        };
      });
      parent = Object.getPrototypeOf(parent);
    }

    return schemaDefinition;
  }

  private static inspectTypeDefinition(
    optionsOrType: SchemaTypeOptions<unknown> | Function,
  ): PropOptions | [PropOptions] | Function {
    if (typeof optionsOrType === 'function') {
      if (this.isPrimitive(optionsOrType)) {
        return optionsOrType;
      } else if (this.isMongooseSchemaType(optionsOrType)) {
        return optionsOrType;
      }
      const isClass = /^class\s/.test(
        Function.prototype.toString.call(optionsOrType),
      );
      optionsOrType = isClass ? optionsOrType : optionsOrType();

      const schemaDefinition = this.createForClass(
        optionsOrType as Type<unknown>,
      );
      const schemaMetadata = TypeMetadataStorage.getSchemaMetadataByTarget(
        optionsOrType as Type<unknown>,
      );
      if (schemaMetadata?.options) {
        /**
         * When options are provided (e.g., `@Schema({ timestamps: true })`)
         * create a new nested schema for a subdocument
         * @ref https://mongoosejs.com/docs/subdocs.html
         **/

        return new Schema(schemaDefinition, schemaMetadata.options);
      }
      return schemaDefinition;
    } else if (typeof optionsOrType.type === 'function') {
      optionsOrType.type = this.inspectTypeDefinition(optionsOrType.type);
      return optionsOrType;
    } else if (Array.isArray(optionsOrType)) {
      return optionsOrType.length > 0
        ? [this.inspectTypeDefinition(optionsOrType[0])]
        : (optionsOrType as any);
    }
    return optionsOrType;
  }

  private static inspectRef(
    optionsOrType: SchemaTypeOptions<unknown> | Function,
  ) {
    if (!optionsOrType || typeof optionsOrType !== 'object') {
      return;
    }
    if (typeof optionsOrType?.ref === 'function') {
      try {
        optionsOrType.ref =
          (optionsOrType.ref as Function)()?.name ?? optionsOrType.ref;
      } catch (err) {
        if (err instanceof TypeError) {
          const refClassName = (optionsOrType.ref as Function)?.name;
          throw new Error(
            `Unsupported syntax: Class constructor "${refClassName}" cannot be invoked without 'new'. Make sure to wrap your class reference in an arrow function (for example, "ref: () => ${refClassName}").`,
          );
        }
        throw err;
      }
    } else if (Array.isArray(optionsOrType.type)) {
      if (optionsOrType.type.length > 0) {
        this.inspectRef(optionsOrType.type[0]);
      }
    }
  }

  private static isPrimitive(type: Function) {
    return BUILT_IN_TYPES.includes(type);
  }

  private static isMongooseSchemaType(type: Function) {
    if (!type || !type.prototype) {
      return false;
    }
    const prototype = Object.getPrototypeOf(type.prototype);
    return prototype && prototype.constructor === SchemaType;
  }
}
