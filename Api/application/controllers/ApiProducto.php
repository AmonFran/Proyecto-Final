<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class ApiProducto extends REST_Controller
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
        $producto = $this->QueryModel->ListarProductos();
        $categoria = $this->QueryModel->ListarCategoria();
        $usuario = $this->QueryModel->ListarUsuarios();
        $imagenes = $this->QueryModel->ListarIMagenes();
        $datos = array(
            'producto' => $producto,
            'categoria' => $categoria,
            'usuarios' => $usuario,
            'imagenes' => $imagenes,
        );
        $output['data'] = [
            'datos' => $datos
        ];

        $this->set_response($output, REST_Controller::HTTP_OK);
    }

    public function producto_get()
    {
        // Obtener parametro mediante get
        $producto = $this->QueryModel->ListarProductos();
        $datos = array(
            'producto' => $producto,
        );
        $output['data'] = [
            $datos
        ];

        $this->set_response($output, REST_Controller::HTTP_OK);
    }

    public function producto_post()
    {
        // Recibo los datos
        $data = json_decode(file_get_contents('php://input'));
        if ($data->body->producto) {
            $this->QueryModel->insert("producto", $data->body->producto);
        }
        $this->set_response(['status' => true, 'message' => 'Producto añadido correctamente'], REST_Controller::HTTP_CREATED);
    }

    public function producto_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $where['id'] = $data['id'];
        $this->QueryModel->update("producto", $data, $where);
        $this->set_response(['status' => true, 'message' => 'Producto actualizado correctamente'], REST_Controller::HTTP_OK);
    }

    public function producto_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['id'] = $data;
        $this->QueryModel->delete("producto", $where);
        $this->set_response(['status' => true, 'message' => 'Producto borrado correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }
}
