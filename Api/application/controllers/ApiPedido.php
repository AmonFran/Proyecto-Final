<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiPedido extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function pedido_post()
    {
        // Obtener parametro mediante get
        $data = json_decode(file_get_contents('php://input'));
        $this->QueryModel->insert("pedido", $data->body->pedido);
        $this->set_response(['status' => true, 'message' => 'Pedido añadida correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function pedido_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("pedido", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Pedido actualizada correctamente'], REST_Controller::HTTP_OK);
    }
    public function pedido_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("pedido", $where);
        $this->set_response(['status' => true, 'message' => 'Pedido borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
