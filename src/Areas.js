import r from './GeoJSON/regions.json'
import d from './GeoJSON/departements.json'
import dpoData from './Data/dpo.json'

var ids = 0;

function updateAreaData (area) {

  var subareas = {};
	var a = Object.assign({}, area);
	a.features.forEach(e => {
    var polygon = Object.assign({}, e.geometry)
    polygon.coordinates = polygon.coordinates.reduce((acc, val) => acc.concat(val), []);
    if (polygon.type === "MultiPolygon")
      polygon.coordinates = polygon.coordinates.reduce((acc, val) => acc.concat(val), []);
    e.center = centroid(polygon)
    e.size = size(polygon)
    e.profiles = []
    subareas[e.properties.code] = e;
  });
  dpoData.dpo.forEach(e => {
    e.areas.forEach(subarea => {
      if (subareas[subarea] !== undefined)
        subareas[subarea].profiles.push(e);
    })
  })
  a.id = ids++;
	return a;
}

function centroid (polygon) {

  	var center = [0, 0]
  	polygon.coordinates.forEach(e => {
  		center[0] += e[1]
  		center[1] += e[0]
  	})
  	center[0] /= polygon.coordinates.length
  	center[1] /= polygon.coordinates.length
  	return center
}

function size (polygon) {
  
  var min, max;
  polygon.coordinates.forEach(e => {
    if (min === undefined || min > e[0])
      min = e[0];
    if (max === undefined || max < e[0])
      max = e[0];
  })
  return max-min;
}

var regions = updateAreaData(r)
var departements = updateAreaData(d)

export { regions, departements }