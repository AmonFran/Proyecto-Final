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
        echo $data;
        foreach ($data as $imagen) {
            $this->QueryModel->insert("imagen", $imagen);
        }
        $this->set_response(['status' => true, 'message' => 'Imagen actualizada correctamente'], REST_Controller::HTTP_OK);
    }

    public function imagen_delete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $where['idProducto'] = $data;
        $imagenes = $this->QueryModel->ListarImagenes();
        foreach ($imagenes as $imagen) {
            if ($imagen['idProducto'] == $data) {
                $ruta = explode("/", $imagen['ImagenPath']);
                unlink(FCPATH . '\assets\images\productos\\' . array_pop($ruta));
            }
        }
        $this->QueryModel->delete("imagen", $where);
        $this->set_response(['status' => true, 'message' => 'Imagen borrada correctamente'], REST_Controller::HTTP_NO_CONTENT);
    }

    public function imagen_put()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        // echo $data;
        $where['idProducto'] = $data['idProducto'];
        $idesImagenes = array();
        foreach ($data['nuevasImagenes'] as $imagen) {
            array_push($idesImagenes, $imagen['id']);
        }
        // $imagenes = $this->QueryModel->ListarImagenesQueEliminar($idesImagenes, $where['idProducto']);
        // foreach ($imagenes as $imagen) {
        //     $ruta = explode("/", $imagen['imagenPath']);
        //     unlink(FCPATH . '\assets\images\productos\\' . array_pop($ruta));
        // }
        $this->QueryModel->delete("imagen", $where);
        foreach ($data['nuevasImagenes'] as $imagen) {
            $this->QueryModel->insert("imagen", $imagen);
        }
        $this->set_response(['status' => true, 'message' => 'Imagen actualizada correctamente'], REST_Controller::HTTP_OK);
    }
}
