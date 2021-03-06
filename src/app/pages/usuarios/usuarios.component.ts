import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {UserInterface} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import  {User} from 'src/app/shared/user.class';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment'
import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('myForm') formValues;
  filterUsuario= '';
  usuario: UsuarioModel = new UsuarioModel();
  // array con nombre vacantes de
  usuarios: UsuarioModel [] = [];
  negocios = [];
  userAuth: User = new User();

  aHourMoment: string = "";
  // constructor para poder mandar peticiones
  constructor(private servicioUsuarios: UsuarioService, private router: Router, private afs: AngularFirestore) {
    this.aHourMoment = (moment().format('YYYY-MM-DD HH:mm:ss'));

     console.log(this.aHourMoment);
  }
      public isUserAdmin: any = null;
      public isSuperAdmin: any = null;
      public userUid: string = null;

      onlyNumberKey(event) {
          return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
      }
  // crearVacante -> es una funcion en donde le indico que mandaré datos al crearVacante de la funcion servicioVacantes
    eliminarUsuarios(usuario: UsuarioModel){
      Swal.fire({
        title: '¿Está seguro de eliminar el usuario?',
        text: "Una vez eliminado el usuario, no podrás recuperarlo",
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
            'El usuario ha sido eliminado',
            'success'
          )
        }
      });
    }

  crearUsuario( usuario: UsuarioModel ){
    this.servicioUsuarios.crearUsuario( usuario );
    this.formValues.resetForm();
    Swal.fire({
      title: 'Agregado!',
      text: 'El proceso se ha realizado con éxito',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }
 //    onAddUser() {
 //   this.servicioUsuarios.registerUser(this.email, this.password).catch(err => console.log('err', err.message));
 // }
     async onRegister(){
       console.log('entrada a registrer');
       const usuario = await this.servicioUsuarios.onRegister(this.usuario);
       if (usuario) {
           console.log('Successfully created user');
       }
     }
    getUsuarios (){
      this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
        this.usuarios = respuesta;
      });
    }
    curTime(){
      let  now = moment() // add this 2 of 4
      console.log('hello world', now.format()); // add this 3 of 4
      console.log(now.add(7, 'days').format());
    }

    oneHour(){


    }
    // getCurrentUser(){
    //   console.log('recupero mi usuario');
    //   this.servicioUsuarios.isAuth().subscribe(auth => {
    //     if (auth){
    //       this.userUid = auth.uid;
    //       this.servicioUsuarios.isUserAdmin(this.userUid).subscribe(userRole => {
    //         this.isUserAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
    //       })
    //     }
    //   })
    // }

    // getCurrentSuperAdmin(){
    //   console.log('recupero mi usuario');
    //   this.servicioUsuarios.isAuth().subscribe(auth => {
    //     if (auth){
    //       this.userUid = auth.uid;
    //       this.servicioUsuarios.isSuperAdmin(this.userUid).subscribe(userRole => {
    //         this.isSuperAdmin = Object.assign({}, userRole.roles).hasOwnProperty('superadmin');
    //         this.isSuperAdmin = true;
    //       })
    //     }
    //   })
    // }
    verUsuario (usuario: any){
      this.usuario = usuario;
    }
    verHour (hora: any){
      this.aHourMoment = hora;
    }

    editarUsuarios (usuario: UsuarioModel){
      console.log('Voy a editar a:  ')
      this.servicioUsuarios.editarUsuarios( usuario );
      Swal.fire({
        title: 'Editado!',
        text: 'Los cambios se guardaron correctamente',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }

    showModalEditar(){
      Swal.fire({
        title: 'Agregado!',
        text: 'Espere la visita de alguien que necesite del empleo',
        type: 'success',
        confirmButtonText: 'Cool'
      });
    }
    // eliminarUsuarios (usuario: UsuarioModel){
    //   this.servicioUsuarios.eliminarUsuarios(usuario);
    // }
    // This -> es una variable global de mi clase
    // termina
  ngOnInit() {
    this.getUsuarios();
    // this.getCurrentSuperAdmin();
    // this.getCurrentUser();
  }
  onSelect(event) {
    let query = null;
    if (event.value == "Tipo")
      query = this.servicioUsuarios.getUsuarios();
      else
      query = this.servicioUsuarios.getUsuariosFiltro(event.value);

      query.subscribe(negocio => {
        this.negocios = negocio
      })
  }


}
