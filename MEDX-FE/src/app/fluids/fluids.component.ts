import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../components/sidebar/home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FluidEntry {
  fluidName: string;
  careUnitName: string;
}

@Component({
  selector: 'app-fluids',
  standalone: true,
  imports: [HomeComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './fluids.component.html',
  styleUrls: ['./fluids.component.css']
})
export class FluidsComponent implements OnInit {

  fluidsArray: FluidEntry[] = [];
  careUnits: any[] = [];
  fluidForm: FormGroup;
  isFluidOpen: boolean = false;

  // --- NEW STATE VARIABLES FOR EDIT MODE ---
  isEditMode: boolean = false;
  editIndex: number | null = null;

  successMsg: string = '';
  errorMsg: string = '';

  constructor(private fb: FormBuilder) {
    this.fluidForm = this.fb.group({
      fluidName: ['', Validators.required],
      careUnitName: ['', Validators.required],
    });
  }

  ngOnInit() {
    // load saved fluids
    const savedFluids = localStorage.getItem('fluids');
    if (savedFluids) {
      this.fluidsArray = JSON.parse(savedFluids);
    }

    // load care units
    const savedUnits = localStorage.getItem('careUnits');
    if (savedUnits) {
      this.careUnits = JSON.parse(savedUnits);
    }
  }

  // --- UPDATED to handle opening for 'Add' mode ---
  openFluidPopup() {
    this.isEditMode = false; // Ensure we are in 'add' mode
    this.editIndex = null;
    this.isFluidOpen = true;
    this.fluidForm.reset({ careUnitName: '' }); // Reset form, keep dropdown placeholder
  }

  closeFluidPopup() {
    this.isFluidOpen = false;
  }

  // --- UPDATED to handle both Add and Edit ---
  onFluidSubmit() {
    if (this.fluidForm.valid) {
      // If in edit mode, update the existing entry
      if (this.isEditMode && this.editIndex !== null) {
        this.fluidsArray[this.editIndex] = this.fluidForm.value;
        this.showSuccess('✅ Fluid updated successfully!');
      } else {
        // Otherwise, add a new entry
        this.fluidsArray.push(this.fluidForm.value);
        this.showSuccess('✅ Fluid added successfully!');
      }
      
      localStorage.setItem('fluids', JSON.stringify(this.fluidsArray));
      this.closeFluidPopup(); // Close popup on success
      
    } else {
      this.showError('⚠ Please fill in all fields!');
    }
  }

  // --- NEW METHOD for handling Edit ---
  onEdit(index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    const fluidToEdit = this.fluidsArray[index];

    // Pre-fill the form with the data of the item to be edited
    this.fluidForm.patchValue({
      fluidName: fluidToEdit.fluidName,
      careUnitName: fluidToEdit.careUnitName
    });
    
    this.isFluidOpen = true; // Open the popup
  }

  // --- NEW METHOD for handling Delete ---
  onDelete(fluidToDelete: FluidEntry) {
    // Filter the array, removing the fluid that needs to be deleted
    this.fluidsArray = this.fluidsArray.filter(fluid => fluid !== fluidToDelete);
    localStorage.setItem('fluids', JSON.stringify(this.fluidsArray));
    this.showError('🗑 Fluid deleted successfully!');
  }

  // alerts
  showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 3000);
  }
}