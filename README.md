# La carte des DPO

## Scripts disponibles

Dans ce projet, vous pouvez lancer :

### `npm start`

Lance l'application en développement.
Ouvrir [http://localhost:3000](http://localhost:3000) pour la voir dans le navigateur.

La page va se recharger automatiquement en cas de modifications.
Les erreurs seront affichées dans la console.

### `npm run build`

Construit l'application en production dans le dossier `build`.
Cela va créer un bundle de React en production et optimiser la construction pour de meilleures performances.

## Outils externes

### Leaflet

[Leaflet](https://leafletjs.com/) est l'outil utilisé afin de créer une carte avec laquelle l'utilisateur peut interagir. Pour la compatibilité avec React, [react-leaflet](https://github.com/PaulLeCam/react-leaflet) est utilisé, l'application se basant principalement sur les objets *Map*, *TileLayer* et *Icon* de ce plugin.

Le style graphique actuel est obtenu grâce au service [World Street Map](https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer).
La gestion des groupes de profils n'est pas gérée directement dans Leaflet mais par le wrapper [react-leaflet-markcluster](https://github.com/YUzhva/react-leaflet-markercluster).

### Algolia Places

[react-algolia-places](https://github.com/csauvage/react-algolia-places) est utilisé afin de proposer des localisations à l'utilisateur et de lier celles choisies à des coordonnées positionnables sur Leaflet.

### CK Editor

Afin que l'utilisateur puisse entrer une description avec un texte riche, l'éditeur CK Editor est utilisé avec [react-ckeditor-component](https://github.com/codeslayer1/react-ckeditor). Un code HTML est renvoyé et utilisé afin d'afficher une description détaillée.

### Axeptio

Un module React d'Axeptio est maintenu à l'intérieur du projet et est utilisé afin de récupérer le consentement des utilisateurs concernant les conditions générales d'utilisation de l'application web.