import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

import { Widget } from '@phosphor/widgets';

import '../style/index.css';

import * as vtkpointcloud from '../lib/JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.js';


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

    const data:ArrayBuffer = new ArrayBuffer(0);
    const lasFile = new vtkpointcloud.LASFile(data);
    console.log('LASFile instance:');
    console.dir(lasFile);

    this.node.textContent = this._mimeType;
    return Promise.resolve();
  }  // renderModel()

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
