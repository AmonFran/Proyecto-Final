<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiUsuario extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function usuario_post()
    {
        // Obtener parametro mediante get
        $data = json_decode(file_get_contents('php://input'));
        $this->QueryModel->insert("usuario", $data);
        $this->set_response(['status' => true, 'message' => 'Usuario añadida correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function usuario_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['Id'] = $data['Id'];
        $this->QueryModel->update("usuario", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Usuario actualizada correctamente'], REST_Controller::HTTP_OK);
    }
    public function usuario_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['Id'] = $data;
        $this->QueryModel->delete("usuario", $where);
        $this->set_response(['status' => true, 'message' => 'Usuario borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
