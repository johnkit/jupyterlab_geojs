import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

import { Widget } from '@phosphor/widgets';

import * as b64ab from 'base64-arraybuffer';

import * as vtkpointcloud from '../lib/JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.js';

import '../style/index.css';


/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/vtkjs+json';


/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'jp-OutputWidgetVtkJS';


/**
 * A widget for rendering vtk.js
 */
export
class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    //console.log(`OutputWidget.renderModel() ${this._mimeType}`);
    //console.dir(model);
    const stringData = model.data[this._mimeType] as string;
    const lasFile: vtkpointcloud.LASFile = this._newLASFile(stringData);
    console.log(`LASFile instance:`);
    console.log(`  version ${lasFile.versionAsString}`);
    console.log(`  formatId ${lasFile.formatId}`);
    console.dir(lasFile);

    this.node.textContent = this._mimeType;
    return Promise.resolve();
  }  // renderModel()


  /**
   * Creates LASFile instance.
   */
  _newLASFile(stringData: string): vtkpointcloud.LASFile {
    let lasFile: vtkpointcloud.LASFile;
    try {
      const binaryData: ArrayBuffer = b64ab.decode(stringData);
      lasFile = new vtkpointcloud.LASFile(binaryData);
      return lasFile;
    }
    catch(err) {
      alert(err);
      return;
    }
  }

  private _mimeType: string;
}  // OutputWidget


/**
 * A mime renderer factory for GeoJS data.
 */
export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

export
const VtkJSExtension: IRenderMime.IExtension = {
  id: 'jupyterlab_geojs:vtkjs_factory',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  documentWidgetFactoryOptions: {
    name: 'VtkJSView',
    primaryFileType: 'vtk',  // las?
    fileTypes: ['vtk'],
    defaultFor: []
  },
  fileTypes: [
    {
      name: 'vtk',
      mimeTypes: [MIME_TYPE],
      extensions: ['.vtk']
    }
  ]

};
