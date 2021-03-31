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
		this.restClient.creteEmployee(this.restClient.apiUrl, this.employee).subscribe(
			(data) => {
				console.log(data);
				this.emit();
			},
			error => console.log(error)
		);
	}
}