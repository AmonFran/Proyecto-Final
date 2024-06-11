<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;
use SebastianBergmann\Environment\Console;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Test extends REST_Controller
{
	public function __construct()
	{
		parent::__construct();

		$this->load->model('QueryModel', 'QueryModel');
	}

	public function index()
	{
	}

	public function prueba_get()
	{
		$output;
		// Obtener parametro mediante get
		$clienteId = $this->input->get('clienteId');

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

	public function prueba_post()
	{
		// Recibo los datos
		$data = json_decode(file_get_contents('php://input'));
		// $clienteId = $data->clienteId;
		// echo'<pre>'.print_r($data).'<pre>';
		$this->QueryModel->insert("vino",$data);
		$this->set_response(['status' => true, 'message' => 'Cliente añadido correctamente'], REST_Controller::HTTP_OK);
	}
}
