package com.example.Proyecto.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class MainServicios {
    public ArrayList<String> lista = new ArrayList<>(Arrays.asList("Mochila", "Bolso", "Bandoleras"));

    public Integer mostrarAnho() {
        Integer anho = LocalDate.now().getYear();
        return anho;
    }

}
