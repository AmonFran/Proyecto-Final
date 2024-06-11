<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiDetallePedido extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function detalle_post()
    {
        // Obtener parametro mediante get
        $data = json_decode(file_get_contents('php://input'));
        $this->QueryModel->insert("detallePedido", $data->body->detallePedido);
        $this->set_response(['status' => true, 'message' => 'Detalle Pedido añadida correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function detalle_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("detallePedido", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Detalle Pedido actualizada correctamente'], REST_Controller::HTTP_OK);
    }
    public function detalle_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("detallePedido", $where);
        $this->set_response(['status' => true, 'message' => 'Detalle Pedido borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
