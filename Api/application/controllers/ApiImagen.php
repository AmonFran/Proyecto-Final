<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiImagen extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function imagen_post()
    {
        $data = json_decode(file_get_contents('php://input'));
        foreach ($data as $imagen) {
            $this->QueryModel->insert("imagen_vino", $imagen);
        }
        $this->set_response(['status' => true, 'message' => 'Imagen actualizada correctamente'], REST_Controller::HTTP_OK);
    }

    public function imagen_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['IdVino'] = $data;
        $this->QueryModel->delete("imagen_vino", $where);
        $this->set_response(['status' => true, 'message' => 'Imagen borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
