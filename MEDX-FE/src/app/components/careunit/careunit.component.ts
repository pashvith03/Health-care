import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../sidebar/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interface for type safety
interface CareUnit {
  name: string;
  type: string;
}

// --- NEW: Added interface for Fluid for type safety ---
interface Fluid {
  fluidName: string;
  careUnitName: string;
}

@Component({
  selector: 'app-careunit',
  standalone: true, // It's good practice to mark this as standalone if it is
  imports: [HomeComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './careunit.component.html',
  styleUrl: './careunit.component.css'
})
export class CareunitComponent implements OnInit { // Implemented OnInit for consistency
  careunitsArray: CareUnit[] = [];
  careUnitForm: FormGroup;
    isopen: boolean = false;
    isEditMode: boolean = false;
    editIndex: number | null = null;

    successMsg: string = '';
    errorMsg: string = '';

  constructor(private fb: FormBuilder) {
    this.careUnitForm = this.fb.group({
      careUnitName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const savedUnits = localStorage.getItem('careUnits');
    if (savedUnits) {
      this.careunitsArray = JSON.parse(savedUnits);
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
      const newUnit: CareUnit = {
        name: this.careUnitForm.value.careUnitName,
        type: ''
      };

      if (this.isEditMode && this.editIndex !== null) {
        // --- NEW LOGIC FOR UPDATING FLUIDS ON EDIT ---
        const oldUnitName = this.careunitsArray[this.editIndex].name;
        const newUnitName = newUnit.name;

        // Only proceed if the name has actually changed
        if (oldUnitName !== newUnitName) {
          this.updateFluidsCareUnitName(oldUnitName, newUnitName);
        }
        // --- END OF NEW LOGIC ---

        this.careunitsArray[this.editIndex] = newUnit;
        this.showSuccess("✅ Care Unit updated successfully!");
      } else {
        this.careunitsArray.push(newUnit);
        this.showSuccess("✅ Care Unit added successfully!");
      }

      localStorage.setItem('careUnits', JSON.stringify(this.careunitsArray));
      this.closePopup();
    } else {
      this.showError("⚠ Please fill in all required fields!");
    }
  }

  onDelete(unit: CareUnit) {
    const deletedUnitName = unit.name; // Get the name before deleting

    // Delete the care unit
    this.careunitsArray = this.careunitsArray.filter(u => u !== unit);
    localStorage.setItem('careUnits', JSON.stringify(this.careunitsArray));

    // --- NEW LOGIC FOR DELETING ASSOCIATED FLUIDS ---
    this.deleteFluidsByCareUnit(deletedUnitName);
    // --- END OF NEW LOGIC ---
    
    // Updated message to be more informative
    this.showError("🗑 Care Unit and associated fluids deleted successfully!");
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
    const unit = this.careunitsArray[index];
    this.careUnitForm.patchValue({
      careUnitName: unit.name,
    });
  }

  // --- NEW HELPER FUNCTION FOR DELETING FLUIDS ---
  private deleteFluidsByCareUnit(careUnitNameToDelete: string) {
    const savedFluids = localStorage.getItem('fluids');
    if (savedFluids) {
      let fluidsArray: Fluid[] = JSON.parse(savedFluids);
      const updatedFluids = fluidsArray.filter(
        fluid => fluid.careUnitName !== careUnitNameToDelete
      );
      localStorage.setItem('fluids', JSON.stringify(updatedFluids));
    }
  }

  // --- NEW HELPER FUNCTION FOR UPDATING FLUIDS ---
  private updateFluidsCareUnitName(oldName: string, newName: string) {
    const savedFluids = localStorage.getItem('fluids');
    if (savedFluids) {
      let fluidsArray: Fluid[] = JSON.parse(savedFluids);
      const updatedFluids = fluidsArray.map(fluid => {
        if (fluid.careUnitName === oldName) {
          // Return a new object with the updated name
          return { ...fluid, careUnitName: newName };
        }
        return fluid; // Return the original object if no change
      });
      localStorage.setItem('fluids', JSON.stringify(updatedFluids));
    }
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 3000);
  }
}