# Whats those decorator do?

### Schema decorator

Creating mongoose schema.
Convert the class syntax into the Mongoose schema syntax, so in the end, the result of the conversion would be like this:

```
const schema = new mongoose.Schema({
    name: { type: String } // Notice that `String` is now uppercase.
});

```

### Prop Decorator

Mark the value on Mongo schema, basically when you do:

```javascript
@Prop()
name: string;
```

name will be add on schema.

Prop function would be called, in this case with no arguments.

```
const type = Reflect.getMetadata(TYPE_METADATA_KEY, target, propertyKey);
```

Using the Reflect API, we can get the data type that you use when you do name: string. The value of type variable is now set to String. Notice that it’s not string, the Reflect API will always return the constructor version of the data type so:

- number will be serialized as Number
- string will be serialized as String
- boolean will be serialized as Boolean
- and so on

otherwise, when you didn't add @Prop decorator, the value wouldn't added on mongo document.