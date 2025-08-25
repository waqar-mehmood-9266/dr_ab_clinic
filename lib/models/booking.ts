// import mongoose from "mongoose"

// const bookingSchema = new mongoose.Schema(
//   {
//     // Basic booking information
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     service: {
//       type: String,
//       required: true,
//       enum: [
//         "Gold_Hydra_Facial",
//         "Silver_Hydra_Facial",
//         "Platinum_Hydra_Facial",
//         "Baby_Doll_Facial_Carbon_Facial",
//         "Vampire_Facial",
//         "Derma_Abrasion",
//         "BB_Glow_Facial",
//         "LED_Light_Facial",
//         "Photo_Facial",
//         "Skin_Rejuvenation_Facial",
//         "RF_Facial_Laser",

//         // Peels
//         "Chemical_Peel",
//         "Whitening_Peel",
//         "Acne_Peel",
//         "Scars_Peel",
//         "Melasma_Peel",
//         "Glowing_Peel",

//         // Laser Hair Removal (LHR)
//         "Face_LHR",
//         "Neck_LHR",
//         "Face_Neck_LHR",
//         "Half_Arms_LHR",
//         "Full_Arms_LHR",
//         "Half_Legs_LHR",
//         "Full_Legs_LHR",
//         "Tummy_LHR",
//         "Armpit_LHR",
//         "Bikini_LHR",
//         "Full_Body_LHR",

//         // Minimal Invasive Procedures
//         "Micro_Needling",
//         "Face_PRP",
//         "Head_PRP",
//         "Face_Exosomes",
//         "Head_Exosomes",
//         "Plexer_Per_Area",
//         "Skin_Tag_Removal",
//         "Warts_Removal",
//         "Mole_Removal",
//         "Tattoo_Removal",
//         "Stretch_Mark_Removal",

//         // Fat Reduction Treatments
//         "Weight_Loss_Injections",
//         "Weight_Loss_Drips",
//         "RF_Monopolar",

//         // Whitening Treatments
//         "Whitening_Injections",
//         "Whitening_Drips",
//         "Whitening_Drops",
//         "Whitening_Medicine",
//         "Whitening_Peel_Facial",

//         // Drips
//         "Multivitamin_Drips",
//         "Nutrition_Drips",
//         "Collagen_Drips_Wrinkle_Free_Korean_Skin",
//         "Glowing_Drips",

//         // Semi-Permanent Makeup
//         "BB_Glow",
//         "Lip_Tint",
//         "Cheek_Tint",
//         "Pink_Lips_Laser",
//         "Lash_Extensions",
//         "Eyelash_Uplift",
//         "Microblading",
//         "Micropigmentation",
//         "Dermaplaning",

//         // Invasive Procedures
//         "Botox",

//         // General
//         "Consultation_Only",

//       ],
//       trim: true
//     },
//     date: { type: Date, required: true },
//     time: { type: String, required: true },
//     message: { type: String, default: "" },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "completed", "cancelled"],
//       default: "pending",
//     },

//     // Personal Information
//     age: { type: Number, required: true },
//     weight: { type: Number, required: true },
//     occupation: { type: String, required: true },
//     address: { type: String, required: true },

//     // Medical History
//     previousTreatment: { type: String, enum: ["yes", "no"], required: true },
//     previousTreatmentDetails: { type: String, default: "" },
//     bleedingDisorder: { type: String, enum: ["yes", "no", ""], default: "" },
//     pregnant: { type: String, enum: ["yes", "no"], required: true },
//     allergies: { type: String, enum: ["yes", "no", ""], default: "" },
//     diabetic: { type: String, enum: ["yes", "no"], required: true },
//     takingSupplements: { type: String, enum: ["yes", "no", ""], default: "" },
//     supplementDetails: { type: String, default: "" },
//     otherConditions: { type: String, default: "" },

//     // Additional Information
//     useSunblock: { type: String, enum: ["yes", "no"], required: true },
//     useTanningLotion: { type: String, enum: ["yes", "no", ""], default: "" },
//     treatedAreaBefore: { type: String, enum: ["yes", "no", ""], default: "" },
//     treatmentName: { type: String, default: "" },
//     planningHoliday: { type: String, default: "" },
//     consentPhotos: { type: String, enum: ["yes", "no", ""], default: "" },

//     // Consent and Acknowledgments
//     understandTreatment: { type: Boolean, required: true },
//     understandRisks: { type: Boolean, required: true },
//     informationAccurate: { type: Boolean, required: true },
//     consentToTreatment: { type: Boolean, required: true },

//     // Optional user reference
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

//     // Admin feedback
//     adminFeedback: { type: String, default: "" },
//   },
//   {
//     timestamps: true,
//   },
// )

// export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)









import mongoose from "mongoose"

const doctorFeedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      default: "",
    },
    treatmentNotes: {
      type: String,
      default: "",
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    doctorName: {
      type: String,
      required: true,
    },
    feedbackDate: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

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
      trim: true,
      // Removed enum validation - now accepts any service value
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
      default: "",
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
      default: "",
    },
    bleedingDisorder: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    pregnant: {
      type: String,
      required: [true, "Pregnancy status is required"],
      enum: ["yes", "no"],
    },
    allergies: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    diabetic: {
      type: String,
      required: [true, "Diabetic status is required"],
      enum: ["yes", "no"],
    },
    takingSupplements: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    supplementDetails: {
      type: String,
      trim: true,
      default: "",
    },
    otherConditions: {
      type: String,
      trim: true,
      default: "",
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
      default: "no",
    },
    treatedAreaBefore: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    treatmentName: {
      type: String,
      trim: true,
      default: "",
    },
    planningHoliday: {
      type: String,
      trim: true,
      default: "",
    },
    consentPhotos: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
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

    // Doctor feedback - this is the key fix
    doctorFeedback: {
      type: doctorFeedbackSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Ensure the doctorFeedback field is included in JSON output
bookingSchema.set("toJSON", {
  transform: (doc, ret) => ret,
})

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
