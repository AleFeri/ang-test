import { Component } from '@angular/core';
import { DataRestClientService } from '../data-rest-client.service';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
	data: any;
	errors: any;
	public adding: boolean = false;
	arrId: number[] = [];

	constructor(private restClient: DataRestClientService) {
		this.loadData();
	}

	loadData(): void {
		this.restClient.getDataRows(this.restClient.apiUrl).subscribe(
			data => this.data = data,
			error => this.errors = error
		)
	}

	toggleAdd() {
		this.adding = !this.adding;
	}
	completato(event: any) {
		this.toggleAdd();
		this.loadData();
	}

	addToArr(event: any) {
		if(event.target.checked) {
			this.arrId.push(event.target.id);
		}
		else if(!event.target.checked) {
			let index = this.arrId.findIndex(d => d === event.target.id);
			this.arrId.splice(index, 1);
		}
	}
	delete() {
		this.arrId.forEach(element => {
			this.restClient.deleteEmployee(this.restClient.apiUrl, element).subscribe(
				() => {
					this.arrId = [];
					this.loadData();
				},
				error => console.log(error)
			);
		});
	}
}