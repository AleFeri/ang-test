import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { DataRestClientService } from '../data-rest-client.service';
import { Employee } from '../employee/employee';

@Component({
	selector: 'app-modale',
	templateUrl: './modale.component.html',
	styleUrls: ['./modale.component.scss']
})
export class ModaleComponent implements OnInit {
	employee: Employee;
	data: any;
	@Output() newItemEvent = new EventEmitter<any>();

	constructor(private restClient: DataRestClientService) {
		this.employee = {employeeId: 0, firstName: "", lastName: "", email: "", phone: ""};
	}

	ngOnInit(): void {
	}

	emit() {
		this.newItemEvent.emit({});
	}
	addEmp(): void {
		this.restClient.getDataRows(this.restClient.apiUrl).subscribe(
			data => {
				this.data = data;

				let id = 0;
				this.data.forEach((element: any) => {
					id = element.employeeId;
				});
				this.employee.employeeId = ++id;

				this.restClient.creteEmployee(this.restClient.apiUrl, this.employee).subscribe(
					() => this.emit(),
					error => console.log(error)
				);
			},
			error => console.log(error)
		)
	}
}