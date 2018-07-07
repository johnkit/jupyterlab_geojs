var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
  "JUPYTERLAB_FILE_LOADER_" is a special file prefix that indicates to
  jupyterlab to use its file loader to load the file, instead of
  bundling it with the rest of the extension files at build time.
  This allows the vtk.js code to be packaged separately, because it
  requries some webpack loaders that are not available using jlpm.

  This config generates two files in the lib folder:
    1. JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.js, which is the
       point cloud implemenation.
    2. JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.d.ts, which is a
       copy of the vtkpointcloude/index.d.ts file. This file has the
       minimal definitions needed to successfully complile the
       extension ("jlpm build").
*/
module.exports = {
  entry: path.join(__dirname, './src/vtkpointcloud/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.js',
    libraryTarget: 'umd',
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/vtkpointcloud/index.d.ts',
      to: 'JUPYTERLAB_FILE_LOADER_vtkpointcloud.bundle.d.ts',
      toType: 'file'
    }])
  ]
};
