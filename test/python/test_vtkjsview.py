import os
import unittest

from . import utils
from jupyterlab_geojs import VtkJSView

class TestVtkJSView(unittest.TestCase):
    '''Use unit test to generate test data for VtkJSView

    '''

    def test_las_100points(self):
        '''Test creating pointcloud feature'''
        filename = os.path.join(utils.data_folder, '100-points.las')

        vtk_view = VtkJSView()
        pointcloud = vtk_view.create_pointcloud_feature(filename=filename)
        self.assertEqual(pointcloud.get_point_count(), 100)
        self.assertIsNone(pointcloud.get_wkt_string())

        data = vtk_view._build_data()

        utils.write_model(data, 'vtkjsview_pointcloud_100.json')
