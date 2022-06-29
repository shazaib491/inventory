import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TablesService } from '@modules/users/services/tables.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    closeResult = '';
    allfetchedUser?:any;
  constructor(private modalService: NgbModal,private tableService:TablesService) { }

  ngOnInit(): void {

  }



}
