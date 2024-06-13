<?php
defined('BASEPATH') or exit('No direct script access allowed');

class QueryModel extends CI_Model
{
    private $db = null;
    function __construct()
    {
        parent::__construct();

        $this->db = $this->load->database('default', true);
    }
    public function ExecuteArrayResults($sql)
    {
        $query = $this->db->query($sql);
        $rows = $query->result_array();
        $query->free_result();

        return ($rows);
    }


    public function ListarCategoria()
    {
        $sql = "Select * From Categoria";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarUsuarios()
    {
        $sql = "Select * From Usuario";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarProductos()
    {
        $sql = "Select * From Producto";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarImagenes()
    {
        $sql = "Select * From Imagen";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarPedidos()
    {
        $sql = "Select * From Pedido";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarDetallePedido()
    {
        $sql = "Select * From DetallePedido";
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarImagenesQueEliminar($idesImagenes, $idProducto)
    {
        $sql = "Select * From Imagen where idProducto=" . $idProducto;

        foreach ($idesImagenes as $idImagen) {
            print_r($idImagen);
            $sql .= " and Id!='". (int)$idImagen ."'";
        }
        return ($this->ExecuteArrayResults($sql));
    }
    public function ListarComentarios()
    {
        $sql = "Select * From Comentario";
        return ($this->ExecuteArrayResults($sql));
    }

    public function insert($tabla, $datos)
    {
        $this->db->insert($tabla, $datos);
    }
    public function update($tabla, $datos, $where)
    {
        $this->db->update($tabla, $datos, $where);
    }
    public function delete($tabla, $where)
    {
        $this->db->delete($tabla, $where);
    }
}
