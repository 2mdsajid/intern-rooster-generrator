// app/lib/data.ts

export const SCHEDULE_DATA = {
    "indian": {
      "departments": [
        {
          "name": "MEDICINE",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "Medicine",
              "weeks": 8,
              "divisions": ["med1", "med2", "med3", "med4", "med5", "med6", "med7", "med8"]
            },
            {
              "name": "ICU",
              "weeks": 2,
              "divisions": ["icu1", "icu2"]
            },
            {
              "name": "CCU",
              "weeks": 3,
              "divisions": ["ccu1", "ccu2", "ccu3"]
            }
          ]
        },
        {
          "name": "SURGERY",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "General Surgery",
              "weeks": 4,
              "divisions": ["gs1", "gs2", "gs3", "gs4"]
            },
            {
              "name": "Urology",
              "weeks": 1,
              "divisions": ["uro1"]
            },
            {
              "name": "Neurosurgery",
              "weeks": 1,
              "divisions": ["neuro1"]
            },
            {
              "name": "Oncology",
              "weeks": 2,
              "divisions": ["onco1", "onco2"]
            },
            {
              "name": "Anesthesiology",
              "weeks": 1,
              "divisions": ["anesthesia1"]
            },
            {
              "name": "Orthopaedics",
              "weeks": 2,
              "divisions": ["ortho1", "ortho2"]
            },
            {
              "name": "Forensic Med / Lab",
              "weeks": 2,
              "divisions": ["fm1", "fm2"]
            }
          ]
        },
        {
          "name": "OBG",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "OBG OPD",
              "weeks": 5,
              "divisions": ["obg_opd1", "obg_opd2", "obg_opd3", "obg_opd4", "obg_opd5"]
            },
            {
              "name": "OBG Ward",
              "weeks": 5,
              "divisions": ["obg_ward1", "obg_ward2", "obg_ward3", "obg_ward4", "obg_ward5"]
            },
            {
              "name": "Family Planning",
              "weeks": 3,
              "divisions": ["family_plan1", "family_plan2", "family_plan3"]
            }
          ]
        },
        {
          "name": "ALLIED",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "Pediatrics",
              "weeks": 4,
              "divisions": ["pedia1", "pedia2", "pedia3", "pedia4"]
            },
            {
              "name": "Emergency",
              "weeks": 2,
              "divisions": ["er1", "er2"]
            },
            {
              "name": "ENT",
              "weeks": 1,
              "divisions": ["ent1"]
            },
            {
              "name": "Ophthalmology",
              "weeks": 1,
              "divisions": ["ophtha1"]
            },
            {
              "name": "Psychiatry",
              "weeks": 1,
              "divisions": ["psych1"]
            },
            {
              "name": "Community Medicine",
              "weeks": 4,
              "divisions": ["commed1", "commed2", "commed3", "commed4"]
            }
          ]
        }
      ]
    },
    "nepali": {
      "departments": [
        {
          "name": "MEDICINE",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "Medicine",
              "weeks": 7,
              "divisions": ["med1", "med2", "med3", "med4", "med5", "med6", "med7"]
            },
            {
              "name": "ICU",
              "weeks": 4,
              "divisions": ["icu1", "icu2", "icu3", "icu4"]
            },
            {
              "name": "CCU",
              "weeks": 2,
              "divisions": ["ccu1", "ccu2"]
            }
          ]
        },
        {
          "name": "SURGERY",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "General Surgery",
              "weeks": 5,
              "divisions": ["gs1", "gs2", "gs3", "gs4", "gs5"]
            },
            {
              "name": "Urosurgery",
              "weeks": 1,
              "divisions": ["uro1"]
            },
            {
              "name": "Neurosurgery",
              "weeks": 1,
              "divisions": ["neuro1"]
            },
            {
              "name": "Oncology",
              "weeks": 1,
              "divisions": ["onco1"]
            },
            {
              "name": "Anesthesiology",
              "weeks": 1,
              "divisions": ["anesthesia1"]
            },
            {
              "name": "Orthopedics",
              "weeks": 2,
              "divisions": ["ortho1", "ortho2"]
            },
            {
              "name": "Forensic Med / Lab",
              "weeks": 2,
              "divisions": ["fm1", "fm2"]
            }
          ]
        },
        {
          "name": "OBG",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "OBG OPD",
              "weeks": 5,
              "divisions": ["obg_opd1", "obg_opd2", "obg_opd3", "obg_opd4", "obg_opd5"]
            },
            {
              "name": "OBG Ward",
              "weeks": 5,
              "divisions": ["obg_ward1", "obg_ward2", "obg_ward3", "obg_ward4", "obg_ward5"]
            },
            {
              "name": "Family Planning",
              "weeks": 3,
              "divisions": ["family_plan1", "family_plan2", "family_plan3"]
            }
          ]
        },
        {
          "name": "ALLIED",
          "duration_months": 3,
          "duration_weeks": 13,
          "subdepartments": [
            {
              "name": "Pediatrics",
              "weeks": 4,
              "divisions": ["pedia1", "pedia2", "pedia3", "pedia4"]
            },
            {
              "name": "Emergency",
              "weeks": 2,
              "divisions": ["er1", "er2"]
            },
            {
              "name": "Dermatology",
              "weeks": 1,
              "divisions": ["derma1"]
            },
            {
              "name": "Radiology",
              "weeks": 1,
              "divisions": ["radio1"]
            },
            {
              "name": "ENT",
              "weeks": 2,
              "divisions": ["ent1", "ent2"]
            },
            {
              "name": "Ophthalmology",
              "weeks": 2,
              "divisions": ["ophtha1", "ophtha2"]
            },
            {
              "name": "Psychiatry",
              "weeks": 1,
              "divisions": ["psych1"]
            }
          ]
        }
      ]
    },
    "saarc": {
      "departments": [
        {
          "name": "MEDICINE",
          "duration_months": 6,
          "duration_weeks": 26,
          "subdepartments": [
            {
              "name": "CCU",
              "weeks": 3,
              "divisions": ["ccu1", "ccu2", "ccu3"]
            },
            {
              "name": "Medicine",
              "weeks": 5,
              "divisions": ["med1", "med2", "med3", "med4", "med5"]
            },
            {
              "name": "Medicine ICU",
              "weeks": 4,
              "divisions": ["med_icu1", "med_icu2", "med_icu3", "med_icu4"]
            },
            {
              "name": "Pediatrics",
              "weeks": 4,
              "divisions": ["pedia1", "pedia2", "pedia3", "pedia4"]
            },
            {
              "name": "Psychiatry",
              "weeks": 4,
              "divisions": ["psych1", "psych2", "psych3", "psych4"]
            },
            {
              "name": "Dermatology",
              "weeks": 2,
              "divisions": ["derma1", "derma2"]
            },
            {
              "name": "Emergency",
              "weeks": 2,
              "divisions": ["er1", "er2"]
            },
            {
              "name": "Forensic Med / Lab",
              "weeks": 2,
              "divisions": ["fm1", "fm2"]
            }
          ]
        },
        {
          "name": "SURGERY",
          "duration_months": 6,
          "duration_weeks": 26,
          "subdepartments": [
            {
              "name": "General Surgery",
              "weeks": 4,
              "divisions": ["gs1", "gs2", "gs3", "gs4"]
            },
            {
              "name": "Urosurgery",
              "weeks": 1,
              "divisions": ["uro1"]
            },
            {
              "name": "Oncology",
              "weeks": 1,
              "divisions": ["onco1"]
            },
            {
              "name": "ENT",
              "weeks": 2,
              "divisions": ["ent1", "ent2"]
            },
            {
              "name": "Ophtalmology",
              "weeks": 2,
              "divisions": ["ophtha1", "ophtha2"]
            },
            {
              "name": "Anesthesiology",
              "weeks": 2,
              "divisions": ["anesthesia1", "anesthesia2"]
            },
            {
              "name": "Neurosurgery",
              "weeks": 2,
              "divisions": ["neuro1", "neuro2"]
            },
            {
              "name": "OBG",
              "weeks": 8,
              "divisions": ["obg1", "obg2", "obg3", "obg4", "obg5", "obg6", "obg7", "obg8"]
            },
            {
              "name": "Orthopaedics",
              "weeks": 2,
              "divisions": ["ortho1", "ortho2"]
            },
            {
              "name": "Community Medicine",
              "weeks": 2,
              "divisions": ["commed1", "commed2"]
            }
          ]
        }
      ]
    }
  }
  
  export const NEPALI_PRIORITY = {
  'MEDICINE_PRIORITY' : ['med1', 'med2', 'med3', 'icu1', 'icu2', 'ccu1', 'med5', 'med6', 'med7','icu3', 'icu4',  'ccu2','med4'],
  'SURGERY_PRIORITY' : ['gs1', 'gs2', 'gs3','uro1','neuro1', 'onco1', 'anesthesia1', 'ortho1','fm1', 'gs4', 'gs5', 'ortho2', 'fm2'],
  'OBG_PRIORITY': ['obg_opd1', 'obg_opd2', 'obg_opd3', 'obg_opd4', 'obg_opd5', 'obg_ward1', 'obg_ward2', 'obg_ward3', 'obg_ward4', 'obg_ward5', 'family_plan1', 'family_plan2', 'family_plan3'],
  'ALLIED_PRIORITY': ['pedia1', 'pedia2', 'pedia3', 'pedia4', 'er1', 'er2', 'derma1', 'radio1', 'ent1', 'ent2', 'ophtha1', 'psych1','ophtha2']
  };
  
  export const INDIAN_PRIORITY =  {
  'MEDICINE_PRIORITY': ['med1', 'med2', 'med3', 'med4', 'med5', 'med6', 'med7', 'med8', 'icu1', 'icu2', 'ccu1', 'ccu2', 'ccu3'],
  'SURGERY_PRIORITY': ['gs1', 'gs2', 'gs3', 'gs4', 'uro1', 'neuro1', 'onco1', 'onco2', 'anesthesia1', 'ortho1', 'ortho2', 'fm1', 'fm2'],
  'OBG_PRIORITY': ['obg_opd1', 'obg_opd2', 'obg_opd3', 'obg_opd4', 'obg_opd5', 'obg_ward1', 'obg_ward2', 'obg_ward3', 'obg_ward4', 'obg_ward5', 'family_plan1', 'family_plan2', 'family_plan3'],
  'ALLIED_PRIORITY': ['pedia1', 'pedia2', 'pedia3', 'pedia4', 'er1', 'er2', 'ent1', 'ophtha1', 'psych1', 'commed1', 'commed2', 'commed3', 'commed4']
  };
  
  export const SAARC_PRIORITY = {
  'MEDICINE_PRIORITY': ['ccu1', 'ccu2', 'ccu3', 'med1', 'med2', 'med3', 'med4', 'med5', 'med_icu1', 'med_icu2', 'med_icu3', 'med_icu4', 'pedia1', 'pedia2', 'pedia3', 'pedia4', 'psych1', 'psych2', 'psych3', 'psych4', 'derma1', 'derma2', 'er1', 'er2', 'fm1', 'fm2'],
  'SURGERY_PRIORITY': ['gs1', 'gs2', 'gs3', 'gs4', 'uro1', 'onco1', 'ent1', 'ent2', 'ophtha1', 'ophtha2', 'anesthesia1', 'anesthesia2', 'neuro1', 'neuro2', 'obg1', 'obg2', 'obg3', 'obg4', 'obg5', 'obg6', 'obg7', 'obg8', 'ortho1', 'ortho2', 'commed1', 'commed2']
  };
  
  export const ALL_PRIORITIES = {
      nepali: NEPALI_PRIORITY,
      indian: INDIAN_PRIORITY,
      saarc: SAARC_PRIORITY,
  }
  
  // Ensure you copy the full JSON data into the respective placeholders above.