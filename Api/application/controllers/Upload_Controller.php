<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Upload_Controller extends REST_Controller
{
    public function upload_post()
    {
        $data = json_decode(file_get_contents('php://input'));

        print_r($_FILES['image']);
        echo "<br><br><br>";
        $config['upload_path'] = './assets/images/posts';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '2000';
        $config['max_width'] = '2000';
        $config['max_height'] = '2000';
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        print_r($this->upload->initialize($config));
        // $uploaded = $this->upload->do_upload($_FILES['image']);
        // print_r($uploaded);
        // if (!$this->upload->do_upload($_FILES['image'])) {
        //     $error = array('error' => $this->upload->display_errors());

        //     $this->response([
        //         'status' => false,
        //         'message' => 'fail',
        //         'data' => $error
        //     ], REST_Controller::HTTP_OK);
        // } else {
        //     $this->upload->$_FILES;
        //     $this->response([
        //         'status' => TRUE,
        //         'message' => 'upload  successful.',

        //     ], REST_Controller::HTTP_OK);
        // }
    }
}
