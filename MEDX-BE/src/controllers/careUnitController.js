import CareUnit from "../models/CareUnit.js";

// @desc    Get all care units
// @route   GET /api/care-units
// @access  Private
const getAllCareUnits = async (req, res) => {
  try {
    const careUnits = await CareUnit.find({ isActive: true })
      .populate("createdBy", "username")
      .populate("updatedBy", "username")
      .sort({ createdAt: -1 });

    res.json(careUnits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single care unit
// @route   GET /api/care-units/:id
// @access  Private
const getCareUnit = async (req, res) => {
  try {
    const careUnit = await CareUnit.findById(req.params.id)
      .populate("createdBy", "username")
      .populate("updatedBy", "username");

    if (!careUnit) {
      return res.status(404).json({ message: "Care unit not found" });
    }

    res.json(careUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create care unit
// @route   POST /api/care-units
// @access  Private (Admin only)
const createCareUnit = async (req, res) => {
  try {
    const { careUnit, description } = req.body;

        const dummyUserId = "66c8f5c89b1234567890abcd";

    const newCareUnit = new CareUnit({
      careUnit,
      description,
      createdBy: dummyUserId
    });


    const savedCareUnit = await newCareUnit.save();
    await savedCareUnit.populate("createdBy", "username");

    res.status(201).json(savedCareUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update care unit
// @route   PUT /api/care-units/:id
// @access  Private (Admin only)
const updateCareUnit = async (req, res) => {
  try {
    const { careUnit, description } = req.body;

    const updatedCareUnit = await CareUnit.findByIdAndUpdate(
      req.params.id,
      {
        careUnit,
        description,
        updatedBy: req.user._id,
      },
      { new: true, runValidators: true }
    ).populate("createdBy", "username");

    if (!updatedCareUnit) {
      return res.status(404).json({ message: "Care unit not found" });
    }

    res.json(updatedCareUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete care unit (soft delete)
// @route   DELETE /api/care-units/:id
// @access  Private (Admin only)
const deleteCareUnit = async (req, res) => {
  try {
    const careUnit = await CareUnit.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedBy: req.user._id },
      { new: true }
    );

    if (!careUnit) {
      return res.status(404).json({ message: "Care unit not found" });
    }

    res.json({ message: "Care unit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getAllCareUnits,
  getCareUnit,
  createCareUnit,
  updateCareUnit,
  deleteCareUnit,
}; 