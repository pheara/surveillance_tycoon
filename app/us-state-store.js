var riot = require('riot');
var actions = new (require('./actions.js'))();
var statesData = require('./us-states-data');
var personas = require('./personas');

module.exports = UsStateStore
function UsStateStore() {
  if ( arguments.callee._singletonInstance )
      return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;

  // Make instances observable
  riot.observable(this);



  var statesGeoJSON = statesData;
  //secondary map for easier access
  // actually we should build the geoJSON from
  // this object on demand for the sake of
  // clarity. but w/e. it's a prototype.
  var states = {};


  //enrich data with personas and cctv count
  for(var i = 0; i < statesGeoJSON.features.length; i++){
      var p = statesGeoJSON.features[i].properties;
      p.persona = personas.randomPersona();
      p.cctvCount = 0;
      console.log(p.name);
      states[p.name] = p;
  }

  this.get = function() {