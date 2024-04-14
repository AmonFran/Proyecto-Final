package com.example.Proyecto.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http.headers(
                                headersConfigurer -> headersConfigurer
                                                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
                http.authorizeHttpRequests(auth -> auth
                                .requestMatchers("/publico/**", "/categorias", "/productos", "/products/porCategoria/**")
                                .permitAll() // configurarpermisosreales
                                // .requestMatchers("/valoraciones/userBorrar/**", "/valoraciones/proBorrar/**")
                                // .hasAnyRole("MANAGER", "ADMIN")
                                .requestMatchers ("/usuarios/registro/**").permitAll()
                                .requestMatchers("/valoraciones/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                                .requestMatchers("/detallesPedido/**","/pedidos/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                                .requestMatchers("/usuarios/editarContr","/usuarios/editarContr/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                                .requestMatchers("/usuarios/editarNom","/usuarios/editarNom/**").hasAnyRole("USER", "MANAGER", "ADMIN")
                                .requestMatchers("/productos/**", "/categorias/**").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers("/usuarios/**").hasRole("ADMIN")
                                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                                .permitAll() // para rutas: /css, /js /images
                                .anyRequest().permitAll())
                                .formLogin(httpSecurityFormLoginConfigurer -> httpSecurityFormLoginConfigurer
                                                .loginPage("/signin") // mapping par mostrar formulario de login
                                                .loginProcessingUrl("/login") // ruta post de /signin
                                                .failureUrl("/signin")
                                                .defaultSuccessUrl("/publico/home", true).permitAll())
                                .logout((logout) -> logout
                                                .logoutSuccessUrl("/publico/home").permitAll())
                                // .csrf(csrf -> csrf.disable())
                                .rememberMe(Customizer.withDefaults())
                                .httpBasic(Customizer.withDefaults());
                http.exceptionHandling(exceptions -> exceptions.accessDeniedPage("/publico/home"));
                return http.build();
        }
}

