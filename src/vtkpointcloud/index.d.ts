// Generic declarations
// export var LASFile: any;
// export var ParticleSystem: any;

// Allows some type checking
export class LASFile {
  constructor(lasData: ArrayBuffer);
  public versionAsString: string;
  public formatId: number;
}

export class ParticleSystem {
  constructor();
}
