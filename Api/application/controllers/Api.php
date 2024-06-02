<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Api extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('QueryModel', 'QueryModel');
    }

    public function index()
    {
    }

    public function todo_get()
    {
        // Obtener parametro mediante get
        $vinos = $this->QueryModel->ListarProductos();
        $bodegas = $this->QueryModel->ListarBodegas();
        $tipos = $this->QueryModel->ListarTipo();
        $regiones = $this->QueryModel->ListarRegion();
        $uvas = $this->QueryModel->ListarUva();
        $datos = array(
            'vinos' => $vinos,
            'bodegas' => $bodegas,
            'tipos' => $tipos,
            'regiones' => $regiones,
            'uvas' => $uvas,
        );
        $output['data'] = [
            'datos' => $datos
        ];

        $this->set_response($output, REST_Controller::HTTP_OK);
    }

    public function vino_get()
    {
        // Obtener parametro mediante get
        $vinos = $this->QueryModel->ListarProductos();
        $datos = array(
            'vinos' => $vinos,
        );
        $output['data'] = [
            'prueba1' => 'prueba1',
            'prueba2' => 'prueba2',
            'prueba3' => $datos
        ];

        $this->set_response($output, REST_Controller::HTTP_OK);
    }

    public function vino_post()
    {
        // Recibo los datos
        $data = json_decode(file_get_contents('php://input'));
        // $this->QueryModel->insert("vino", $data);
        $this->set_response(['status' => true, 'message' => 'Vino añadido correctamente'], REST_Controller::HTTP_OK);
    }

    public function vino_update()
    {
        $data = json_decode(file_get_contents('php://input'));
        echo '<pre>' . print_r($data) . '<pre>';
        $this->set_response(['status' => true, 'message' => 'Vino actualizado correctamente'], REST_Controller::HTTP_OK);
    }
}