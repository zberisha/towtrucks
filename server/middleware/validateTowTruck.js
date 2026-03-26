exports.validateTowTruck = (req, res, next) => {
  const { businessName, phoneNumber, description, coords } = req.body;
  const errors = [];

  if (!businessName || typeof businessName !== "string" || businessName.trim().length < 2) {
    errors.push({ field: "businessName", message: "Business name is required and must be at least 2 characters." });
  } else if (businessName.trim().length > 100) {
    errors.push({ field: "businessName", message: "Business name must be under 100 characters." });
  }

  if (!phoneNumber || typeof phoneNumber !== "string") {
    errors.push({ field: "phoneNumber", message: "Phone number is required." });
  } else if (!/^[\d\s+\-()]{7,20}$/.test(phoneNumber.trim())) {
    errors.push({ field: "phoneNumber", message: "Enter a valid phone number (7-20 digits)." });
  }

  if (!coords || typeof coords !== "object") {
    errors.push({ field: "coords", message: "Location coordinates are required." });
  } else {
    const { lat, lng } = coords;
    if (typeof lat !== "number" || typeof lng !== "number") {
      errors.push({ field: "coords", message: "Coordinates must be valid numbers." });
    } else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      errors.push({ field: "coords", message: "Coordinates are out of valid range." });
    }
  }

  if (description && typeof description === "string") {
    if (description.trim().length > 0 && description.trim().length < 10) {
      errors.push({ field: "description", message: "Description must be at least 10 characters if provided." });
    } else if (description.trim().length > 500) {
      errors.push({ field: "description", message: "Description must be under 500 characters." });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Validation failed", errors });
  }

  req.body.businessName = businessName.trim();
  req.body.phoneNumber = phoneNumber.trim();
  if (description) req.body.description = description.trim();

  next();
};
