import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { TablesService } from '@modules/supplier/services/tables.service';
import { SBSortableHeaderDirective, SortEvent } from '@modules/users/directives';
import { Country } from '@modules/users/models';
import { CountryService } from '@modules/supplier/services/country.service';
import { Observable } from 'rxjs';
import { SupplierModelComponent } from '../supplier-model/supplier-model.component';
import { Suppliers } from '@modules/supplier/models';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'sb-Supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

    @Input() pageSize = 4;

    suppliers$!: Observable<Suppliers[]>;
    suppliers!:Suppliers[];
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;
    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;
    constructor(
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        private tasbleService:TablesService,
        private http:HttpClient,
        private spinner: NgxSpinnerService
    ) {}




    ngOnInit() {
        this.spinner.show();

        this.tasbleService.callForParent.subscribe(()=>{
            this.getSupplier()

        })
        this.countryService.pageSize = this.pageSize;
        this.suppliers$ = this.countryService.suppliers$;

        this.total$ = this.countryService.total$;
        this.getSupplier()

    }


    getSupplier(){
        this.countryService.suppliers$.subscribe((supplier:any)=>{
            this.spinner.hide();

            this.suppliers=supplier;
        })
    }


    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }



openModal(id:any){
    this.tasbleService.callForParent.next(id);
}

changeStatus(id:string,status:any){
    if (status === 'Enable')
            status = 'Disable'
        else
            status = 'Enable'

    this.tasbleService.changeStaus(id,status).subscribe((_)=>{
        this.countryService.getDataFromServer();
        this.tasbleService.callForParent.next();
    })
}

deleteSupplier(id:string){
    this.tasbleService.deleteSupplier(id).subscribe((_)=>{
        this.countryService.getDataFromServer();
        this.tasbleService.callForParent.next();
    })
}

}
