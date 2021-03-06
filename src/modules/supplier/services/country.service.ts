import { DatePipe, DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { COUNTRIES } from '@modules/tables/data/countries';
import { SortDirection } from '@modules/tables/directives';
import { Suppliers } from '@modules/supplier/models/index';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { TablesService } from './tables.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
interface SearchResult {
    suppliers: Suppliers[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(suppliers: Suppliers[], column: string, direction: string): Suppliers[] {
    if (direction === '') {
        return suppliers;
    } else {
        return [...suppliers].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(supplier: Suppliers, term: string, pipe: PipeTransform) {
    return (
        supplier.supplier_name?.toLowerCase().includes(term.toLowerCase()) ||
        supplier.supplier_email.toLowerCase().includes(term.toLowerCase()) ||
        supplier.supplier_address.toLowerCase().includes(term.toLowerCase()) ||
        supplier.supplier_contact_no.toLowerCase().includes(term.toLowerCase()))
}

@Injectable({ providedIn: 'root' })
export class CountryService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _suppliers$ = new BehaviorSubject<Suppliers[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private supplerArray!:Suppliers[];
    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    async getData(){
        let result=await this.http.get(`${environment.supplierUrl}/allSuppliers`).toPromise();
        return result;
    }

    constructor(private pipe: DecimalPipe,private http:HttpClient) {
        this.getDataFromServer();
    }

    getDataFromServer(){
        this.getData().then((response:any)=>{
            this.supplerArray=response.suppliers;
            this.callSuppler();
        })
    }

    callSuppler(){
        this._search$
        .pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(120),
            switchMap(() => this._search()),
            delay(120),
            tap(() => this._loading$.next(false))
        )
        .subscribe(result => {
            this._suppliers$.next(result.suppliers);
            this._total$.next(result.total);
        });

    this._search$.next();
    }

    get suppliers$() {
        return this._suppliers$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        let suppliers=this.supplerArray;
        // 1. sort
        suppliers = sort(suppliers, sortColumn, sortDirection);

        // 2. filter
        suppliers = suppliers.filter((supplier: Suppliers) => matches(supplier, searchTerm, this.pipe));
        const total = suppliers.length;

        // 3. paginate
        suppliers = suppliers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ suppliers, total });
    }
}
