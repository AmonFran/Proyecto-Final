<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiCategoria extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function categoria_post()
    {
        // Obtener parametro mediante get
        $data = json_decode(file_get_contents('php://input'));
        $this->QueryModel->insert("categoria", $data);
        $this->set_response(['status' => true, 'message' => 'Categoria añadida correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function categoria_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("categoria", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Categoria actualizada correctamente'], REST_Controller::HTTP_OK);
    }
    public function categoria_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("categoria", $where);
        $this->set_response(['status' => true, 'message' => 'Categoria borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
