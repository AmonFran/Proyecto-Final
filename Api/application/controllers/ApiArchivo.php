<?php
defined('BASEPATH') or exit('No direct script access allowed');

use FontLib\Table\Type\name;
use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiArchivo extends REST_Controller
{
    public function archivo_post()
    {
        $data = json_decode(file_get_contents('php://input'));
        // print_r($_FILES);
        $config['upload_path'] = FCPATH . '/assets/images/productos';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '20000000';
        $config['max_width'] = '2000';
        $config['max_height'] = '2000';
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if (FCPATH . '/assets/images/productos/' . $_FILES['image']['name']) {
            unlink(FCPATH . 'assets/images/productos/' . $_FILES['image']['name']);
        }

        if (!$this->upload->do_upload('image')) {
            $error = array('error' => $this->upload->display_errors());
            $this->response([
                'status' => false,
                'message' => 'fail',
                'data' => $error
            ], REST_Controller::HTTP_BAD_REQUEST);
        } else {
            foreach ($_FILES as $file) {
                print_r($file);
                $this->upload->$file;
            }
            $this->response([
                'status' => TRUE,
                'message' => 'upload  successful.',
            ], REST_Controller::HTTP_OK);
        }
    }
}
