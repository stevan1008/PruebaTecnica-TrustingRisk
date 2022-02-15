import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DataPruebaService } from 'src/app/services/data-prueba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  dataForm: FormGroup;
  titulo = "Crear Customer";
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private aRouter: ActivatedRoute, private dataPruebaService: DataPruebaService, private _snackBar: MatSnackBar) {
    this.dataForm = this.fb.group({
      fechaDocumento: [Date, Validators.required],
      nombreCliente: ['', Validators.required],
      nit: ['', Validators.required],
      numeroBancario: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get("id")
   }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  agregarData(){
    const DATA: any = {
      fechaDocumento: this.dataForm.get('fechaDocumento')?.value,
      nombreCliente: this.dataForm.get('nombreCliente')?.value,
      nit: this.dataForm.get('nit')?.value,
      numeroBancario: this.dataForm.get('numeroBancario')?.value
    }
    
    console.log('Datos: ', DATA)
    
    this.dataPruebaService.createCostumer(DATA)
    .subscribe((res) => {
      console.log('respuesta: ', res)
      console.log('Datos: ', DATA)
    })

    const pdfFile: any = {
      content: [
        {
        text: `${DATA.fechaDocumento._i.date} de ${DATA.fechaDocumento._i.month} del ${DATA.fechaDocumento._i.year} \n \n \n \n Apreciado Cliente, ${DATA.nombreCliente}. Identificado con NIT ${DATA.nit}. Informamos que el depósito se realizará al siguiente número de cuenta: ${DATA.numeroBancario}. \n \n Gracias.`
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfFile)
    pdf.open()
    this.dataForm.reset()
  }

}
