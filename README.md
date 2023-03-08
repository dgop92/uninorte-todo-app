# Prueba-CRD

Another todo application with the following features:

The data model of a todo item is:

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
}
```

The requirements of the application are

- Add and remove todo items
- Search todo’s by title
- Filter by completed

[Instructions repository](https://github.com/LuisGalviz/Prueba-CRD)

## Project setup

Create a .env file

### Download the dependencies with npm

```
npm install
```

### Start the JSON server

Before starting the json server copy the contents of `db.base.json` into `db.json`

```
json-server --delay 50 --port 3004 db.json
```

You can ignore this step if you use InMemory Repository (look .env file)

### Run the app in localhost

```
npm run dev
```

## Testing

I decided to just add a few tests to showcase the test framework.

_Note:_ The tests only work for JsonServer Repository

### Start the JSON server

```
json-server --delay 500 --port 3004 db.json
```

### Execute the test command

```
npm run test
```

## General notes

- The sorting logic is incorrect because the JsonServer Repository does not support date comparison.
- State management can be improved by utilizing React context.
- Currently, the project is deployed using an InMemory Repository. It may be worth considering hosting a dedicated server for the backend instead.
