# Prueba-CRD

Another todo application with the following features:

The data model of a todo item is:

```javascript
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
- search todo’s by title
- filter by completed

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
json-server --delay 500 --port 3004 db.json
```

### Run the app in localhost

```
npm run dev
```

## Testing

### Start the JSON server

```
json-server --delay 500 --port 3004 db.json
```

### Execute the test command

```
npm run test
```
