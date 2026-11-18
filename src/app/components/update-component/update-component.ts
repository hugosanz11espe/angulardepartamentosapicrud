import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceDepartamentos } from '../../services/service.departamentos';
import { Departamento } from '../../models/departamento';

@Component({
  selector: 'app-update-component',
  standalone: false,
  styleUrl: './update-component.css',
  templateUrl: './update-component.html',
})
export class UpdateComponent implements OnInit{
  @ViewChild("cajanombre") cajanombre!: ElementRef
  @ViewChild("cajalocalidad") cajalocalidad!: ElementRef
  mensaje!: string
  iddepartamento!:number


  constructor(
    private _active: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _service: ServiceDepartamentos
  ){}

  async modificarDepartamento(): Promise<void> {
    let nombre = this.cajanombre.nativeElement.value;
    let localidad = this.cajalocalidad.nativeElement.value;
    let dept = new Departamento(this.iddepartamento, nombre, localidad)
    await this._service.updateDepartamento(dept);
    this.mensaje = "Departamento modificado";
    this._cdr.detectChanges();
  }


  async ngOnInit(): Promise<void> {
  this._active.params.subscribe((params: Params) =>{
    let id = params['id']
    this.iddepartamento = id;
    this.mensaje = "Modificando departameno " + id;
    this._cdr.detectChanges();
  })      
  }
}
