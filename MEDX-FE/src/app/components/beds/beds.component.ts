import { Component } from '@angular/core';
import { HomeComponent } from '../sidebar/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Bed {
  name: string;
  type: string;
}

@Component({
  selector: 'app-beds',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.css']
})
export class BedsComponent {
  bedsArray: Bed[] = [];
  careUnitForm: FormGroup;
  isopen = false;
  isEditMode = false;
  editIndex: number | null = null;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder) {
    this.careUnitForm = this.fb.group({
      bedName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const savedBeds = localStorage.getItem('Beds');
    if (savedBeds) {
      this.bedsArray = JSON.parse(savedBeds);
    }
  }

  openPopup() {
    this.isopen = true;
    this.isEditMode = false;
    this.editIndex = null;
    this.careUnitForm.reset();
  }

  onSubmit() {
    if (this.careUnitForm.valid) {
      const newBed: Bed = {
        name: this.careUnitForm.value.bedName,
        type: ''
      };

      if (this.isEditMode && this.editIndex !== null) {
        this.bedsArray[this.editIndex] = newBed;
        this.showSuccess("✅ Bed updated successfully!");
      } else {
        this.bedsArray.push(newBed);
        this.showSuccess("✅ Bed added successfully!");
      }

      localStorage.setItem('Beds', JSON.stringify(this.bedsArray));
      this.closePopup();
    } else {
      this.showError("⚠ Please fill in all required fields!");
    }
  }

  onDelete(bed: Bed) {
    this.bedsArray = this.bedsArray.filter(b => b !== bed);
    localStorage.setItem('Beds', JSON.stringify(this.bedsArray));
    this.showError("🗑 Bed deleted successfully!");
  }

  closePopup() {
    this.isopen = false;
    this.isEditMode = false;
    this.editIndex = null;
  }

  onEdit(index: number) {
    this.isopen = true;
    this.isEditMode = true;
    this.editIndex = index;
    const bed = this.bedsArray[index];
    this.careUnitForm.patchValue({
      bedName: bed.name,
      bedType: bed.type
    });
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = '';
    setTimeout(() => this.successMsg = '', 3000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.successMsg = '';
    setTimeout(() => this.errorMsg = '', 3000);
  }
}