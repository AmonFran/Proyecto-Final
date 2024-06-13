<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiComentario extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function comentario_post()
    {
        // Obtener parametro mediante get
        $data = json_decode(file_get_contents('php://input'));
        $this->QueryModel->insert("comentario", $data);
        $this->set_response(['status' => true, 'message' => 'Comentario añadido correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function comentario_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("comentario", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Comentario actualizado correctamente'], REST_Controller::HTTP_OK);
    }
    public function comentario_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("comentario", $where);
        $this->set_response(['status' => true, 'message' => 'Comentario borrado correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
