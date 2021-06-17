import * as mongoose from 'mongoose';
import { TypeMetadataStorage } from '../storage/type-metadata';

export const DEFAULT_DB_CONNECTION = 'DatabaseConnection';
export const MONGOOSE_MODULE_OPTIONS = 'MongooseModuleOptions';
export const MONGOOSE_CONNECTION_NAME = 'MongooseConnectionName';
export const RAW_OBJECT_DEFINITION = 'RAW_OBJECT_DEFINITION';

export class CannotDetermineTypeError extends Error {
  constructor(hostClass: string, propertyKey: string) {
    super(
      `Cannot determine a type for the "${hostClass}.${propertyKey}" field (union/intersection/ambiguous type was used). Make sure your property is decorated with a "@Prop({ type: TYPE_HERE })" decorator.`,
    );
  }
}

const TYPE_METADATA_KEY = 'design:type';
/**
 * Interface defining property options that can be passed to `@Prop()` decorator.
 */
export type PropOptions<T = any> =
  | Partial<mongoose.SchemaDefinitionProperty<T>>
  | mongoose.SchemaType;

/**
 * @Prop decorator is used to mark a specific class property as a Mongoose property.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export function Prop(options?: PropOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    options = (options || {}) as mongoose.SchemaTypeOptions<unknown>;

    const isRawDefinition = options[RAW_OBJECT_DEFINITION];
    if (!options.type && !Array.isArray(options) && !isRawDefinition) {
      const type = Reflect.getMetadata(TYPE_METADATA_KEY, target, propertyKey);

      if (type === Array) {
        options.type = [];
      } else if (type && type !== Object) {
        options.type = type;
      } else if (!type) {
        // if type not provided, by default will returning string
        options.type = String;
      } else {
        throw new CannotDetermineTypeError(
          target.constructor?.name,
          propertyKey as string,
        );
      }
    }

    TypeMetadataStorage.addPropertyMetadata({
      target: target.constructor,
      propertyKey: propertyKey as string,
      options: options as PropOptions,
    });
  };
}
