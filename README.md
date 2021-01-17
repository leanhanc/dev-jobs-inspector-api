# Dev Job Finder - API

- API para la consulta de los avisos de Computrabajo, Zonajobs y Bumean

La aplicación esta hecha con el siguiente stack:

- Node
- Express
- Mongo DB

## Entorno de desarrollo

```sh
npm install
npm run dev
```

## API Pública - Endpoint

Si querés consumir la <a href="https://dev-job-finder-api.herokuapp.com/api/test">API Pública</a> podés hacerlo desde el siguiente endpoint:

```
- URL: https://dev-job-inspector-api.herokuapp.com/api/search
- METHOD: "GET"
- QUERY PARAMS:
    search=[string] - requerido
    page=[number] - opcional
    locationFilter=[string] - opcional
    dateFilter=[string] - opcional
```

- page: Si los resultados son mayor a 12, se devuelven paginados. Éste parámetro
  indica la página de resultados que se devolverá.
- locationFilter: para filtrar por Provincia
- dateFilter: para filtrar por distancia temporal entre el momento de la
  solicitud y el momento en que se guardó el aviso en la base de datos.
  Opciones:
  - `today` (indexado en las últimas 24 hs)
  - `yesterday` (últimas 48 hs)
  - `this_week` (durante los últimos 7 días)
  - `this_month` (durante el último mes).

#### Ejemplo de consulta

```
http://dev-job-inspector-api.herokuapp.com/api/search?query=java&locationFilter=Mendoza&dateFilter=this_week
```
