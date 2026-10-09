// Clinic data grouped by category, used on the Find a Clinic page.
// Edit this file to add, remove or update clinics — the UI updates automatically.

const clinicsByCategory = [
  {
    category: "General Clinic",
    clinics: [
      { name: "Kabul Medical Clinic", city: "Kabul", fee: "؋500", match: "19%" },
      { name: "Herat Family Health Clinic", city: "Herat", fee: "؋450", match: "4%" },
    ],
  },
  {
    category: "Specialist Clinic",
    clinics: [
      { name: "Ibn Sina Specialist Clinic", city: "Kabul", fee: "؋900", match: "10%" },
    ],
  },
  {
    category: "Dental Clinic",
    clinics: [
      { name: "Kandahar Dental Care Center", city: "Kandahar", fee: "؋700", match: "21%" },
    ],
  },
  {
    category: "Physiotherapy Clinic",
    clinics: [
      { name: "Mazar Physiotherapy Clinic", city: "Mazar-e-Sharif", fee: "؋600", match: "2%" },
    ],
  },
  {
    category: "Aesthetic Clinic",
    clinics: [
      { name: "Jalalabad Beauty & Skin Clinic", city: "Jalalabad", fee: "؋1,200", match: "14%" },
    ],
  },
  {
    category: "Diagnostic Centre",
    clinics: [
      { name: "Kunduz Diagnostic & Lab Centre", city: "Kunduz", fee: "؋1,500", match: "5%" },
    ],
  },
];

export default clinicsByCategory;
