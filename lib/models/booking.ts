// import mongoose from "mongoose"

// const bookingSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       lowercase: true,
//       trim: true,
//     },
//     phone: {
//       type: String,
//       required: [true, "Phone number is required"],
//       trim: true,
//     },
//     service: {
//       type: String,
//       required: [true, "Service is required"],
//       enum: ["Laser Hair Removal", "Skin Rejuvenation", "Tattoo Removal", "Acne Treatment", "Consultation Only"],
//     },
//     date: {
//       type: Date,
//       required: [true, "Date is required"],
//     },
//     time: {
//       type: String,
//       required: [true, "Time is required"],
//     },
//     message: {
//       type: String,
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "completed", "cancelled"],
//       default: "pending",
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: false, // Allow bookings without user accounts
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)



import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    // Basic booking info
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: [
        "Laser Hair Removal",
        "Skin Rejuvenation",
        "Tattoo Removal",
        "Acne Treatment",
        "IPL Treatment",
        "Consultation Only",
      ],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    message: {
      type: String,
      trim: true,
    },

    // Personal Information
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    weight: {
      type: String,
      required: [true, "Weight is required"],
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    // Medical History
    previousTreatment: {
      type: String,
      required: [true, "Previous treatment information is required"],
      enum: ["yes", "no"],
    },
    previousTreatmentDetails: {
      type: String,
      trim: true,
    },
    bleedingDisorder: {
      type: String,
      enum: ["yes", "no"],
    },
    pregnant: {
      type: String,
      required: [true, "Pregnancy status is required"],
      enum: ["yes", "no"],
    },
    allergies: {
      type: String,
      enum: ["yes", "no"],
    },
    diabetic: {
      type: String,
      required: [true, "Diabetic status is required"],
      enum: ["yes", "no"],
    },
    takingSupplements: {
      type: String,
      enum: ["yes", "no"],
    },
    supplementDetails: {
      type: String,
      trim: true,
    },
    otherConditions: {
      type: String,
      trim: true,
    },

    // Additional Information
    useSunblock: {
      type: String,
      required: [true, "Sunblock usage information is required"],
      enum: ["yes", "no"],
    },
    useTanningLotion: {
      type: String,
      enum: ["yes", "no"],
    },
    treatedAreaBefore: {
      type: String,
      enum: ["yes", "no"],
    },
    treatmentName: {
      type: String,
      trim: true,
    },
    planningHoliday: {
      type: String,
      trim: true,
    },
    consentPhotos: {
      type: String,
      enum: ["yes", "no"],
    },

    // Consent acknowledgments
    understandTreatment: {
      type: Boolean,
      required: [true, "Treatment understanding consent is required"],
    },
    understandRisks: {
      type: Boolean,
      required: [true, "Risk understanding consent is required"],
    },
    informationAccurate: {
      type: Boolean,
      required: [true, "Information accuracy confirmation is required"],
    },
    consentToTreatment: {
      type: Boolean,
      required: [true, "Treatment consent is required"],
    },

    // Booking status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
