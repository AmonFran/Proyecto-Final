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
        $this->QueryModel->insert("usuario", $data->body->usuario);
        $this->set_response(['status' => true, 'message' => 'Usuario añadido correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function usuario_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("usuario", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Usuario actualizado correctamente'], REST_Controller::HTTP_OK);
    }
    public function usuario_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("usuario", $where);
        $this->set_response(['status' => true, 'message' => 'Usuario borrado correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
