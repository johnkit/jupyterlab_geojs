// Placeholder for will become the vtkjs pointcloud viewer code
// Exposes 2 public objects:

var LASFile = function(arraybuffer) {
  console.log('LASFile constructor');
  this.arraybuffer = arraybuffer;
}


var ParticleSystem = function() {
  console.log('ParticleSystem constructor');
}

export { LASFile, ParticleSystem }
