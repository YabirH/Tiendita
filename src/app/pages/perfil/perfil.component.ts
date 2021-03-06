import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { UserInterface } from 'src/app/models/usuario.model';
import {NoticiasModel} from 'src/app/models/noticias.model';
import {VacantesService} from 'src/app/services/vacantes.service';
import {VacanteModel} from 'src/app/models/vacantes.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChild('myForm') formValues;
  @ViewChild('mForm') formValue;
  // modelos para los usuarios
  usuarios: UsuarioModel [] = [];
  usuario: UsuarioModel = new UsuarioModel();
  // modelos para las noticias
  noticias: NoticiasModel [] = [];
  noticia: NoticiasModel = new NoticiasModel();

  addNoticias: NoticiasModel [] = [];
  addNoticia: NoticiasModel = new NoticiasModel();
  public active = true;

  vacante: VacanteModel = new VacanteModel();
  // array con nombre vacantes de
  vacantes: VacanteModel [] = [];
// constructor para poder mandar peticiones

  constructor(private servicioUsuarios: UsuarioService, private router: Router, private servicioVacantes: VacantesService) { }
  public isUserAdmin: any = null;
  public isSuperAdmin: any = null;
  public userUid: string = null;

  private user: UsuarioModel;

  device = [
    {'name':'Lunes','checked':false},
    {'name':'Martes','checked':false},
    {'name':'Miercoles','checked':false},
    {'name':'Jueves','checked':false},
    {'name':'Viernes','checked':false}];

  deviceFilter = '';

  deviceFiltered = this.device.slice(0);

  selectFiltered(){
    this.deviceFiltered.forEach(i=>i.checked=true);
  }

  deSelectFiltered(){
    this.deviceFiltered.forEach(i=>i.checked=false);
  }

  // onFilterChange(){
  //   if (this.deviceFilter.length > 0) {
  //     this.deviceFiltered = this.device.filter(i => i.name.indexOf(this.deviceFilter) > -1);
  //   } else {
  //     this.deviceFiltered = this.device.slice(0);
  //   }
  // }

  getNoticias (){
    this.servicioUsuarios.getNoticias().subscribe(respuesta => {
      this.noticias = respuesta;
    });
  }
  getUsuarios (){
    this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
      this.usuarios = respuesta;
    });
  }
  getVacantes (){
    this.servicioVacantes.getVacantes().subscribe(respuesta => {
      this.vacantes = respuesta;
    });
  }

  // getStatusUser(){
  //   this.servicioUsuarios.isAuth().subscribe(auth => {
  //     if (auth){
  //       this.userUid = auth.uid;
  //       // this.servicioUsuarios.isUserAdmin(this.userUid).subscribe(userRole => {
  //       //   this.isUserAdmin = Object.assign({}, userRole).hasOwnProperty('admin');
  //       //   this.isSuperAdmin = Object.assign({}, userRole).hasOwnProperty('superadmin');
  //       // })
  //       this.isUserAdmin = localStorage.getItem
  //       const roles = localStorage.getItem('roles', 'admin');
  //        // JSON.parse(localStorage.getItem('notes'))
  //     }
  //   })
  // }

  crearUsuario(usuario: UsuarioModel){
    this.servicioUsuarios.crearUsuario( usuario );
    this.formValue.resetForm();
    Swal.fire({
      title: 'Vacante creada!',
      text: 'Ahora tu vacante ya esta publicada',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

    crearNoticias( noticia: NoticiasModel ){
      this.servicioUsuarios.crearNoticias( noticia );
      this.formValues.resetForm();
      Swal.fire({
        title: 'Agregado!',
        text: 'El proceso se ha realizado con éxito',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }

    crearVacante( vacante: VacanteModel ){
      this.servicioUsuarios.crearVacante( vacante );
      this.formValues.resetForm();
      Swal.fire({
        title: 'Agregado!',
        text: 'El proceso se ha realizado con éxito',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }


  eliminarNoticia(noticia: NoticiasModel){
    Swal.fire({
      title: '¿Está seguro de eliminar la noticias?',
      text: "Una vez eliminado la noticia, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioUsuarios.eliminarNoticia(noticia);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'La noticia ha sido eliminado',
          'success'
        )
      }
    });
  }

  eliminarUsuarios (usuario: UsuarioModel){
    Swal.fire({
      title: '¿Está seguro de eliminar la noticias?',
      text: "Una vez eliminado la noticia, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioUsuarios.eliminarUsuarios(usuario);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'La noticia ha sido eliminado',
          'success'
        )
      }
    });
  }

  eliminarVacante (vacante: VacanteModel){
    Swal.fire({
      title: '¿Está seguro de eliminar la noticias?',
      text: "Una vez eliminado la noticia, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioUsuarios.eliminarVacante(vacante);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'La noticia ha sido eliminado',
          'success'
        )
      }
    });
  }

  editarVacantes (vacante: VacanteModel){
    this.servicioVacantes.editarVacantes( vacante );

    Swal.fire({
      title: 'Editado!',
      text: 'Los cambios se guardaron correctamente',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  editarNoticia (noticia: NoticiasModel){
    this.servicioUsuarios.editarNoticia( noticia );
    Swal.fire({
      title: 'Editado!',
      text: 'Los cambios se guardaron correctamente',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  verNoticia (noticia: any){
    this.noticia = noticia;
  }

  verVacante ( vacante: any){
    this.vacante = vacante;
  }
    public providerId: string = 'null';
  ngOnInit() {
    this.getNoticias();
    this.getVacantes();
    this.getUsuarios();
    this.usuario = this.servicioUsuarios.getCurrentUser();
  }

}
