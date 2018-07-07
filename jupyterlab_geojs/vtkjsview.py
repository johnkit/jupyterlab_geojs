import logging

from IPython.display import display, JSON

from .pointcloudfeature import PointCloudFeature


# A display class for vtk.js that can be used in JupyterLab notebooks:
#   from jupyterlab_geojs import VtkJSView
#   VtkJSView()

MIME_TYPE = 'application/vtkjs+json'


class VtkJSView(JSON):
    def __init__(self, **kwargs):
        """A display class for displaying vtk.js visualizations in JupyterLab notebooks
        """
        super(VtkJSView, self).__init__()
        self._logger = None
        self._pointcloud_feature = None


    def create_logger(self, folder, filename='vtkjsview.log'):
        '''Initialize logger with file handler

        @param folder (string) directory to store logfile
        '''
        os.makedirs(folder, exist_ok=True)  # create folder if needed

        log_name, ext = os.path.splitext(filename)
        self._logger = logging.getLogger(log_name)
        self._logger.setLevel(logging.INFO)  # default

        log_path = os.path.join(folder, filename)
        fh = logging.FileHandler(log_path, 'w')
        self._logger.addHandler(fh)
        return self._logger

    def create_pointcloud_feature(self, **kwargs):
        ''''''
        if self._pointcloud_feature:
            raise Exception('Sorry - current version only supports 1 pointcloud')

        self._pointcloud_feature = PointCloudFeature(**kwargs)
        return self._pointcloud_feature


    def _build_data(self):
        data = dict()  # return value
        if self._pointcloud_feature:
            data = self._pointcloud_feature._build_data()
        return data

    def _ipython_display_(self):
        ''''''
        if self._logger is not None:
            self._logger.debug('Enter VtkJSView._ipython_display_()')

        data = self._build_data()

        bundle = {
            MIME_TYPE: data,
            'text/plain': '<jupyterlab_geojs.VtkJSView object>'
        }
        metadata = {
            MIME_TYPE: self.metadata
        }
        if self._logger is not None:
            self._logger.debug('display bundle: {}'.format(bundle))
            self._logger.debug('metadata: {}'.format(metadata))
        display(bundle, metadata=metadata, raw=True)
