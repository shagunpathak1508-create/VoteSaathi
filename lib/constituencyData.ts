// lib/constituencyData.ts
// All 28 states + 8 UTs with major districts and Lok Sabha constituency mappings

export const stateDistrictMap: Record<string, string[]> = {
  // ── States ────────────────────────────────────────────────────────────
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool", "Kakinada", "Nellore", "Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Begusarai"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur", "Rajnandgaon"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Karnal", "Ambala", "Hisar", "Rohtak", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Kangra", "Kullu", "Hamirpur", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Dumka"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi", "Shimoga"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur", "Kolhapur"],
  "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Berhampur", "Sambalpur", "Rourkela", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Pakyong"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Nalgonda"],
  "Tripura": ["Agartala", "Udaipur (Tripura)", "Dharmanagar", "Kailashahar", "Ambassa"],
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur", "Agra", "Prayagraj", "Noida", "Meerut", "Gorakhpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Almora", "Rudraprayag", "Udham Singh Nagar"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol", "Bardhaman", "Kharagpur"],

  // ── Union Territories ─────────────────────────────────────────────────
  "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur", "Rangat"],
  "Chandigarh": ["Chandigarh City", "Manimajra", "Burail", "Maloya", "Daria"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu", "Amli", "Naroli"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Shahdara"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua"],
  "Ladakh": ["Leh", "Kargil", "Nubra", "Zanskar", "Drass"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott"],
  "Puducherry": ["Puducherry City", "Karaikal", "Mahe", "Yanam", "Ozhukarai"],
};

export const districtConstituencyMap: Record<string, string> = {
  // Andhra Pradesh
  "Visakhapatnam": "Visakhapatnam",
  "Vijayawada": "Vijayawada / Machilipatnam",
  "Guntur": "Guntur / Narasaraopet",
  "Tirupati": "Tirupati / Chittoor",
  "Kurnool": "Kurnool / Nandyal",
  "Kakinada": "Kakinada / Amalapuram",
  "Nellore": "Nellore",
  "Rajahmundry": "Rajahmundry",

  // Arunachal Pradesh
  "Itanagar": "Arunachal West",
  "Tawang": "Arunachal West",
  "Ziro": "Arunachal West",
  "Pasighat": "Arunachal East",
  "Bomdila": "Arunachal West",

  // Assam
  "Guwahati": "Guwahati",
  "Dibrugarh": "Dibrugarh",
  "Silchar": "Silchar",
  "Jorhat": "Jorhat",
  "Nagaon": "Nagaon",
  "Tezpur": "Tezpur",

  // Bihar
  "Patna": "Patna Sahib / Patliputra",
  "Gaya": "Gaya",
  "Muzaffarpur": "Muzaffarpur",
  "Bhagalpur": "Bhagalpur",
  "Darbhanga": "Darbhanga",
  "Purnia": "Purnia",
  "Begusarai": "Begusarai",

  // Chhattisgarh
  "Raipur": "Raipur",
  "Bilaspur": "Bilaspur",
  "Durg": "Durg",
  "Korba": "Korba",
  "Jagdalpur": "Bastar",
  "Rajnandgaon": "Rajnandgaon",

  // Goa
  "Panaji": "North Goa",
  "Margao": "South Goa",
  "Vasco da Gama": "South Goa",
  "Mapusa": "North Goa",
  "Ponda": "South Goa",

  // Gujarat
  "Ahmedabad": "Ahmedabad East / Ahmedabad West",
  "Surat": "Surat",
  "Vadodara": "Vadodara",
  "Rajkot": "Rajkot",
  "Bhavnagar": "Bhavnagar",
  "Jamnagar": "Jamnagar",
  "Gandhinagar": "Gandhinagar",

  // Haryana
  "Gurugram": "Gurugram",
  "Faridabad": "Faridabad",
  "Karnal": "Karnal",
  "Ambala": "Ambala",
  "Hisar": "Hisar",
  "Rohtak": "Rohtak",
  "Sonipat": "Sonipat",

  // Himachal Pradesh
  "Shimla": "Shimla",
  "Mandi": "Mandi",
  "Kangra": "Kangra",
  "Kullu": "Mandi",
  "Hamirpur": "Hamirpur",
  "Solan": "Shimla",

  // Jharkhand
  "Ranchi": "Ranchi",
  "Jamshedpur": "Jamshedpur",
  "Dhanbad": "Dhanbad",
  "Bokaro": "Giridih",
  "Hazaribagh": "Hazaribagh",
  "Dumka": "Dumka",

  // Karnataka
  "Bengaluru": "Bangalore North / Bangalore South / Bangalore Central",
  "Mysuru": "Mysore / Chamundeshwari",
  "Mangaluru": "Dakshina Kannada",
  "Hubballi": "Dharwad",
  "Belagavi": "Belagavi / Chikkodi",
  "Kalaburagi": "Gulbarga",
  "Shimoga": "Shimoga",

  // Kerala
  "Thiruvananthapuram": "Thiruvananthapuram / Attingal",
  "Kochi": "Ernakulam",
  "Kozhikode": "Kozhikode",
  "Thrissur": "Thrissur",
  "Kollam": "Kollam",
  "Kannur": "Kannur",
  "Alappuzha": "Alappuzha / Mavelikkara",

  // Madhya Pradesh
  "Bhopal": "Bhopal",
  "Indore": "Indore",
  "Jabalpur": "Jabalpur",
  "Gwalior": "Gwalior",
  "Ujjain": "Ujjain",
  "Sagar": "Sagar",
  "Rewa": "Rewa",

  // Maharashtra
  "Mumbai": "Mumbai North / Mumbai South / Mumbai North Central",
  "Pune": "Pune / Baramati / Shirur",
  "Nagpur": "Nagpur",
  "Nashik": "Nashik / Dindori",
  "Aurangabad": "Aurangabad",
  "Thane": "Thane / Kalyan",
  "Solapur": "Solapur",
  "Kolhapur": "Kolhapur / Hatkanangle",

  // Manipur
  "Imphal": "Inner Manipur",
  "Bishnupur": "Inner Manipur",
  "Thoubal": "Inner Manipur",
  "Churachandpur": "Outer Manipur",
  "Ukhrul": "Outer Manipur",

  // Meghalaya
  "Shillong": "Shillong",
  "Tura": "Tura",
  "Jowai": "Shillong",
  "Nongpoh": "Shillong",
  "Williamnagar": "Tura",

  // Mizoram
  "Aizawl": "Mizoram",
  "Lunglei": "Mizoram",
  "Champhai": "Mizoram",
  "Serchhip": "Mizoram",
  "Kolasib": "Mizoram",

  // Nagaland
  "Kohima": "Nagaland",
  "Dimapur": "Nagaland",
  "Mokokchung": "Nagaland",
  "Tuensang": "Nagaland",
  "Wokha": "Nagaland",

  // Odisha
  "Bhubaneswar": "Bhubaneswar",
  "Cuttack": "Cuttack",
  "Berhampur": "Berhampur",
  "Sambalpur": "Sambalpur",
  "Rourkela": "Sundargarh",
  "Puri": "Puri",

  // Punjab
  "Ludhiana": "Ludhiana",
  "Amritsar": "Amritsar",
  "Jalandhar": "Jalandhar",
  "Patiala": "Patiala",
  "Bathinda": "Bathinda",
  "Mohali": "Anandpur Sahib",

  // Rajasthan
  "Jaipur": "Jaipur / Jaipur Rural",
  "Jodhpur": "Jodhpur",
  "Udaipur": "Udaipur / Rajsamand",
  "Kota": "Kota",
  "Ajmer": "Ajmer",
  "Bikaner": "Bikaner",
  "Alwar": "Alwar",

  // Sikkim
  "Gangtok": "Sikkim",
  "Namchi": "Sikkim",
  "Gyalshing": "Sikkim",
  "Mangan": "Sikkim",
  "Pakyong": "Sikkim",

  // Tamil Nadu
  "Chennai": "Chennai North / Chennai South / Chennai Central",
  "Coimbatore": "Coimbatore",
  "Madurai": "Madurai",
  "Salem": "Salem",
  "Trichy": "Tiruchirappalli",
  "Tirunelveli": "Tirunelveli",
  "Vellore": "Vellore",

  // Telangana
  "Hyderabad": "Hyderabad / Secunderabad",
  "Warangal": "Warangal",
  "Nizamabad": "Nizamabad",
  "Karimnagar": "Karimnagar",
  "Khammam": "Khammam",
  "Nalgonda": "Nalgonda / Bhongir",

  // Tripura
  "Agartala": "Tripura West",
  "Udaipur (Tripura)": "Tripura East",
  "Dharmanagar": "Tripura West",
  "Kailashahar": "Tripura East",
  "Ambassa": "Tripura East",

  // Uttar Pradesh
  "Lucknow": "Lucknow",
  "Varanasi": "Varanasi",
  "Kanpur": "Kanpur",
  "Agra": "Agra",
  "Prayagraj": "Phulpur / Allahabad",
  "Noida": "Gautam Buddha Nagar",
  "Meerut": "Meerut",
  "Gorakhpur": "Gorakhpur",

  // Uttarakhand
  "Dehradun": "Dehradun",
  "Haridwar": "Haridwar",
  "Nainital": "Nainital-Udhamsingh Nagar",
  "Almora": "Almora",
  "Rudraprayag": "Pauri Garhwal",
  "Udham Singh Nagar": "Nainital-Udhamsingh Nagar",

  // West Bengal
  "Kolkata": "Kolkata North / Kolkata South",
  "Howrah": "Howrah",
  "Siliguri": "Darjeeling",
  "Durgapur": "Bardhaman-Durgapur",
  "Asansol": "Asansol",
  "Bardhaman": "Bardhaman-Durgapur",
  "Kharagpur": "Medinipur",

  // ── Union Territories ─────────────────────────────────────────────────
  // Andaman and Nicobar Islands
  "Port Blair": "Andaman and Nicobar Islands",
  "Car Nicobar": "Andaman and Nicobar Islands",
  "Mayabunder": "Andaman and Nicobar Islands",
  "Diglipur": "Andaman and Nicobar Islands",
  "Rangat": "Andaman and Nicobar Islands",

  // Chandigarh
  "Chandigarh City": "Chandigarh",
  "Manimajra": "Chandigarh",
  "Burail": "Chandigarh",
  "Maloya": "Chandigarh",
  "Daria": "Chandigarh",

  // Dadra and Nagar Haveli and Daman and Diu
  "Silvassa": "Dadra and Nagar Haveli",
  "Daman": "Daman and Diu",
  "Diu": "Daman and Diu",
  "Amli": "Dadra and Nagar Haveli",
  "Naroli": "Dadra and Nagar Haveli",

  // Delhi
  "New Delhi": "New Delhi",
  "North Delhi": "North Delhi / North East Delhi",
  "South Delhi": "South Delhi",
  "East Delhi": "East Delhi / North East Delhi",
  "West Delhi": "West Delhi / North West Delhi",
  "Central Delhi": "Chandni Chowk",
  "Shahdara": "East Delhi",

  // Jammu and Kashmir
  "Srinagar": "Srinagar",
  "Jammu": "Jammu",
  "Anantnag": "Anantnag-Rajouri",
  "Baramulla": "Baramulla",
  "Udhampur": "Udhampur",
  "Kathua": "Udhampur",

  // Ladakh
  "Leh": "Ladakh",
  "Kargil": "Ladakh",
  "Nubra": "Ladakh",
  "Zanskar": "Ladakh",
  "Drass": "Ladakh",

  // Lakshadweep
  "Kavaratti": "Lakshadweep",
  "Agatti": "Lakshadweep",
  "Minicoy": "Lakshadweep",
  "Amini": "Lakshadweep",
  "Andrott": "Lakshadweep",

  // Puducherry
  "Puducherry City": "Puducherry",
  "Karaikal": "Puducherry",
  "Mahe": "Puducherry",
  "Yanam": "Puducherry",
  "Ozhukarai": "Puducherry",
};

// MyNeta 2024 Lok Sabha constituency ID deep links for major districts
export const myneta2024ConstituencyIds: Record<string, string> = {
  "Mumbai": "https://myneta.info/LokSabha2024/index.php?constituency_id=31",
  "Pune": "https://myneta.info/LokSabha2024/index.php?constituency_id=25",
  "Nagpur": "https://myneta.info/LokSabha2024/index.php?constituency_id=13",
  "New Delhi": "https://myneta.info/LokSabha2024/index.php?constituency_id=16",
  "Chennai": "https://myneta.info/LokSabha2024/index.php?constituency_id=6",
  "Bengaluru": "https://myneta.info/LokSabha2024/index.php?constituency_id=24",
  "Hyderabad": "https://myneta.info/LokSabha2024/index.php?constituency_id=6",
  "Kolkata": "https://myneta.info/LokSabha2024/index.php?constituency_id=22",
  "Ahmedabad": "https://myneta.info/LokSabha2024/index.php?constituency_id=14",
  "Lucknow": "https://myneta.info/LokSabha2024/index.php?constituency_id=51",
  "Patna": "https://myneta.info/LokSabha2024/index.php?constituency_id=23",
  "Jaipur": "https://myneta.info/LokSabha2024/index.php?constituency_id=20",
  "Bhopal": "https://myneta.info/LokSabha2024/index.php?constituency_id=27",
  "Chandigarh": "https://myneta.info/LokSabha2024/index.php?constituency_id=2",
  "Surat": "https://myneta.info/LokSabha2024/index.php?constituency_id=20",
};
