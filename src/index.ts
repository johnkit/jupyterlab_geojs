import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

import { GeoJSExtension } from './geojsextension';
import { VtkJSExtension } from './vtkjsextension';

const extensions: Array<IRenderMime.IExtension> = [GeoJSExtension, VtkJSExtension];
export default extensions;
