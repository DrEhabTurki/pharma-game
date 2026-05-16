// ==========================================
// Pharmacy Training Simulator Database
// ==========================================

const CATEGORIES = [
    { id: 'GI', name: 'الجهاز الهضمي', icon: 'fas fa-stomach' },
    { id: 'NSAID', name: 'مسكنات والتهابات', icon: 'fas fa-bone' },
    { id: 'ANTIBIO', name: 'مضادات الميكروبات', icon: 'fas fa-bacteria' },
    { id: 'RESP', name: 'التنفسية والحساسية', icon: 'fas fa-lungs' },
    { id: 'CARDIO', name: 'القلب والدم', icon: 'fas fa-heartbeat' },
    { id: 'ENDO', name: 'السكر والغدد', icon: 'fas fa-tint' },
    { id: 'CNS', name: 'الأعصاب والنفسية', icon: 'fas fa-brain' },
    { id: 'ALL', name: 'اختبار شامل', icon: 'fas fa-graduation-cap' }
];

const MEDICINES_DB = [
    // GI
    { id: 'omeprazole', cat: 'GI', name: 'Omeprazole', classAr: 'مثبط مضخة بروتون', brand: 'Losec, Gastrazole' },
    { id: 'pantoprazole', cat: 'GI', name: 'Pantoprazole', classAr: 'مثبط مضخة بروتون', brand: 'Controloc, Zurcal' },
    { id: 'domperidone', cat: 'GI', name: 'Domperidone', classAr: 'مضاد للقيء ومنظم لحركة المعدة', brand: 'Motilium' },
    { id: 'mebeverine', cat: 'GI', name: 'Mebeverine', classAr: 'مضاد للتشنج (القولون)', brand: 'Duspatalin, Coloverin' },
    { id: 'loperamide', cat: 'GI', name: 'Loperamide', classAr: 'مضاد للإسهال', brand: 'Imodium' },
    { id: 'bisacodyl', cat: 'GI', name: 'Bisacodyl', classAr: 'ملين ومضاد للإمساك', brand: 'Dulcolax' },
    { id: 'hyoscine', cat: 'GI', name: 'Hyoscine', classAr: 'مضاد للمغص', brand: 'Buscopan' },
    { id: 'famotidine', cat: 'GI', name: 'Famotidine', classAr: 'حاصرات مستقبلات H2', brand: 'Antodine' },
    
    // NSAID
    { id: 'paracetamol', cat: 'NSAID', name: 'Paracetamol', classAr: 'مسكن وخافض حرارة', brand: 'Panadol, Abimol' },
    { id: 'ibuprofen', cat: 'NSAID', name: 'Ibuprofen', classAr: 'مضاد التهاب لا ستيرويدي', brand: 'Brufen, Marcofen' },
    { id: 'diclofenac', cat: 'NSAID', name: 'Diclofenac', classAr: 'مسكن ومضاد التهاب قوي', brand: 'Voltaren, Cataflam' },
    { id: 'celecoxib', cat: 'NSAID', name: 'Celecoxib', classAr: 'مثبط لإنزيم COX-2 الانتقائي', brand: 'Celebrex' },
    { id: 'meloxicam', cat: 'NSAID', name: 'Meloxicam', classAr: 'مضاد التهاب للمفاصل', brand: 'Mobic' },
    { id: 'ketoprofen', cat: 'NSAID', name: 'Ketoprofen', classAr: 'مضاد التهاب ومسكن', brand: 'Ketofan, Profenid' },

    // ANTIBIO
    { id: 'amoxicillin', cat: 'ANTIBIO', name: 'Amoxicillin', classAr: 'مضاد حيوي (بنسلين)', brand: 'Amoxil, Ibiamox' },
    { id: 'amox_clav', cat: 'ANTIBIO', name: 'Amoxicillin/Clav', classAr: 'بنسلين + مثبط بيتا لاكتاماز', brand: 'Augmentin, Hibiotic' },
    { id: 'azithromycin', cat: 'ANTIBIO', name: 'Azithromycin', classAr: 'مضاد حيوي (ماكرولايد)', brand: 'Zithromax, Xithrone' },
    { id: 'ciprofloxacin', cat: 'ANTIBIO', name: 'Ciprofloxacin', classAr: 'مضاد حيوي (كينولون)', brand: 'Cipro, Ciprobay' },
    { id: 'metronidazole', cat: 'ANTIBIO', name: 'Metronidazole', classAr: 'مضاد للطفيليات والبكتيريا اللاهوائية', brand: 'Flagyl, Amrizole' },
    { id: 'ceftriaxone', cat: 'ANTIBIO', name: 'Ceftriaxone', classAr: 'مضاد حيوي (سيفالوسبورين)', brand: 'Rocephin, Cefaxone' },
    { id: 'fluconazole', cat: 'ANTIBIO', name: 'Fluconazole', classAr: 'مضاد فطريات', brand: 'Diflucan' },
    { id: 'acyclovir', cat: 'ANTIBIO', name: 'Acyclovir', classAr: 'مضاد فيروسي', brand: 'Zovirax' },

    // RESP
    { id: 'loratadine', cat: 'RESP', name: 'Loratadine', classAr: 'مضاد هيستامين (لا يسبب نعاس)', brand: 'Claritine, Mosedin' },
    { id: 'cetirizine', cat: 'RESP', name: 'Cetirizine', classAr: 'مضاد هيستامين سريع', brand: 'Zyrtec, Epirizine' },
    { id: 'salbutamol', cat: 'RESP', name: 'Salbutamol', classAr: 'موسع للشعب الهوائية', brand: 'Ventolin, Farcolin' },
    { id: 'budesonide', cat: 'RESP', name: 'Budesonide', classAr: 'كورتيكوستيرويد استنشاقي', brand: 'Pulmicort' },
    { id: 'chlorpheniramine', cat: 'RESP', name: 'Chlorpheniramine', classAr: 'مضاد هيستامين من الجيل الأول', brand: 'Allergex' },
    { id: 'guaifenesin', cat: 'RESP', name: 'Guaifenesin', classAr: 'طارد للبلغم', brand: 'Mucosolvan, Toplexil (combined)' },

    // CARDIO
    { id: 'amlodipine', cat: 'CARDIO', name: 'Amlodipine', classAr: 'حاصرات قنوات الكالسيوم', brand: 'Norvasc, Alkapress' },
    { id: 'bisoprolol', cat: 'CARDIO', name: 'Bisoprolol', classAr: 'حاصرات مستقبلات بيتا', brand: 'Concor, Bisocard' },
    { id: 'valsartan', cat: 'CARDIO', name: 'Valsartan', classAr: 'حاصرات مستقبلات الأنجيوتنسين', brand: 'Diovan, Tareg' },
    { id: 'furosemide', cat: 'CARDIO', name: 'Furosemide', classAr: 'مدر للبول عروي', brand: 'Lasix' },
    { id: 'simvastatin', cat: 'CARDIO', name: 'Simvastatin', classAr: 'خافض للكوليسترول', brand: 'Zocor' },
    { id: 'atorvastatin', cat: 'CARDIO', name: 'Atorvastatin', classAr: 'خافض للكوليسترول قوي', brand: 'Lipitor, Ator' },
    { id: 'clopidogrel', cat: 'CARDIO', name: 'Clopidogrel', classAr: 'مضاد للصفيحات (مميع)', brand: 'Plavix' },

    // ENDO
    { id: 'metformin', cat: 'ENDO', name: 'Metformin', classAr: 'بيغوانيد (منظم سكر)', brand: 'Glucophage, Cidophage' },
    { id: 'gliclazide', cat: 'ENDO', name: 'Gliclazide', classAr: 'سلفونيل يوريا (محفز بنكرياس)', brand: 'Diamicron' },
    { id: 'levothyroxine', cat: 'ENDO', name: 'Levothyroxine', classAr: 'هرمون الغدة الدرقية', brand: 'Eltroxin, Euthyrox' },
    { id: 'allopurinol', cat: 'ENDO', name: 'Allopurinol', classAr: 'خافض حمض اليوريك (للنقرس)', brand: 'Zyloric' },

    // CNS
    { id: 'alprazolam', cat: 'CNS', name: 'Alprazolam', classAr: 'بنزوديازيبين (مهدئ للقلق)', brand: 'Xanax' },
    { id: 'escitalopram', cat: 'CNS', name: 'Escitalopram', classAr: 'مثبط استرداد السيروتونين SSRI', brand: 'Cipralex' },
    { id: 'pregabalin', cat: 'CNS', name: 'Pregabalin', classAr: 'مضاد اختلاج وألم الأعصاب', brand: 'Lyrica, Averopreg' },
    { id: 'amitriptyline', cat: 'CNS', name: 'Amitriptyline', classAr: 'مضاد اكتئاب ثلاثي الحلقات', brand: 'Tryptizol' },

    // DERMA
    { id: 'hydrocortisone', cat: 'DERMA', name: 'Hydrocortisone', classAr: 'كورتيكوستيرويد موضعي', brand: 'Daktacort, Fucidin H' },
    { id: 'betamethasone', cat: 'DERMA', name: 'Betamethasone', classAr: 'كورتيزون موضعي قوي', brand: 'Betnovate' },
    { id: 'isotretinoin', cat: 'DERMA', name: 'Isotretinoin', classAr: 'ريتينويد (لحب الشباب الشديد)', brand: 'Roaccutane, Netlook' }
];


const CLINICAL_CASES = [
    // GI Cases
    { cat: 'GI', condition: 'ارتجاع مريء', symptoms: ['أشعر بحرقة شديدة في صدري بعد الأكل', 'لدي ارتجاع حامضي يمنعني من النوم'], correctMed: 'omeprazole', explanation: 'يثبط مضخات البروتون في جدار المعدة بشكل فعال، مما يقلل الحمض ويسمح للمريء بالالتئام.' },
    { cat: 'GI', condition: 'قرحة معدة', symptoms: ['أعاني من ألم حارق في معدتي يوقظني من النوم', 'طبيبي شخصني بقرحة في الاثني عشر'], correctMed: 'pantoprazole', explanation: 'يعتبر البانتوبرازول ممتازاً لعلاج القرحة بفضل تثبيطه القوي والطويل الأمد لإفراز الحمض.' },
    { cat: 'GI', condition: 'غثيان', symptoms: ['أشعر بغثيان وامتلاء في المعدة ولا أستطيع الأكل', 'أتقيأ وأعاني من بطء في هضم الطعام'], correctMed: 'domperidone', explanation: 'الدومبيريدون ينظم حركة المعدة ويسرع تفريغها ويمنع الغثيان دون أن يمر للحاجز الدماغي (أقل آثاراً جانبية).' },
    { cat: 'GI', condition: 'القولون العصبي', symptoms: ['أعاني من مغص شديد وانتفاخ وغازات', 'طبيبي شخصني بمتلازمة القولون العصبي'], correctMed: 'mebeverine', explanation: 'يعمل كمضاد للتشنج مباشرة على العضلات الملساء للقولون لتخفيف الألم والتقلصات.' },
    { cat: 'GI', condition: 'مغص كلوي/معوي', symptoms: ['أعاني من ألم تشنجي شديد جداً يأتيني على شكل نوبات', 'لدي مغص لا أستطيع احتماله'], correctMed: 'hyoscine', explanation: 'يتميز بكونه مضاد تشنج قوي وسريع لآلام المغص الحادة عبر إرخاء العضلات الملساء بقوة.' },
    { cat: 'GI', condition: 'إسهال حاد', symptoms: ['أعاني من إسهال مائي متكرر', 'أذهب للحمام باستمرار مع مغص'], correctMed: 'loperamide', explanation: 'لوبراميد يبطئ من حركة الأمعاء، مما يسمح بامتصاص الماء ويوقف الإسهال.' },
    { cat: 'GI', condition: 'إمساك', symptoms: ['لم أخرج الفضلات منذ أيام وأشعر بانتفاخ', 'أعاني من صعوبة بالغة في الإخراج'], correctMed: 'bisacodyl', explanation: 'ملين منشط يحفز عضلات الأمعاء لتسريع حركتها وتسهيل خروج الفضلات.' },

    // NSAID Cases
    { cat: 'NSAID', condition: 'صداع التوتر', symptoms: ['أشعر بصداع نابض', 'أعاني من ارتفاع طفيف في الحرارة'], correctMed: 'paracetamol', explanation: 'الخيار الأول والآمن لتسكين الآلام الخفيفة والمتوسطة وخفض الحرارة بدون التأثير سلباً على المعدة.' },
    { cat: 'NSAID', condition: 'ألم أسنان', symptoms: ['أعاني من ألم شديد في أسناني', 'لدي تورم حول السن'], correctMed: 'ibuprofen', explanation: 'من مضادات الالتهاب غير الستيرويدية وهو ممتاز لتسكين الألم وتقليل التورم.' },
    { cat: 'NSAID', condition: 'انزلاق غضروفي', symptoms: ['لدي ألم لا يحتمل بسبب انزلاق غضروفي', 'أعاني من ألم أسفل الظهر يمتد لساقي'], correctMed: 'diclofenac', explanation: 'مضاد التهاب قوي جداً، يوصف للآلام العظمية والعضلية الشديدة.' },
    { cat: 'NSAID', condition: 'التهاب مفاصل والمعدة حساسة', symptoms: ['أعاني من التهاب في ركبتي ولكن معدتي حساسة جداً للقرحة', 'أحتاج مسكناً لآلام المفاصل لا يؤذي المعدة'], correctMed: 'celecoxib', explanation: 'مثبط لإنزيم COX-2 بشكل انتقائي، مما يعطيه قوة المسكنات مع تقليل خطر قرحة المعدة.' },
    
    // ANTIBIO Cases
    { cat: 'ANTIBIO', condition: 'التهاب الحلق', symptoms: ['حلقي يؤلمني بشدة مع صعوبة في البلع وصديد', 'أعاني من التهاب لوزتين متكرر'], correctMed: 'amoxicillin', explanation: 'مضاد حيوي من عائلة البنسلين، فعال جداً ضد بكتيريا العقديات المسببة لالتهاب الحلق.' },
    { cat: 'ANTIBIO', condition: 'التهاب أذن وسطى قوي', symptoms: ['أعاني من التهاب شديد لم يستجب للمضاد العادي', 'طبيبي وصف لي مضاد حيوي واسع التغطية للبكتيريا العنيدة'], correctMed: 'amox_clav', explanation: 'حمض الكلافولانيك يحمي الأموكسيسيلين من التكسر، مما يزيد من قوة الدواء ضد البكتيريا المقاومة.' },
    { cat: 'ANTIBIO', condition: 'عدوى تنفسية قصيرة', symptoms: ['أعاني من كحة وبلغم والتهاب شعب هوائية', 'طبيبي وصف لي دواء يؤخذ لـ 3 أيام فقط'], correctMed: 'azithromycin', explanation: 'مضاد حيوي قوي يتركز في الأنسجة التنفسية ويؤخذ بجرعة مريحة (3 أيام) ليعطي مفعولاً طويلاً.' },
    { cat: 'ANTIBIO', condition: 'مسالك بولية', symptoms: ['أشعر بحرقة شديدة أثناء التبول مع كثرة التردد', 'لدي ألم أسفل البطن وصديد في البول'], correctMed: 'ciprofloxacin', explanation: 'مضاد حيوي من الكينولونات يتركز في المسالك البولية، ممتاز للقضاء على بكتيريا التهاب المثانة.' },
    { cat: 'ANTIBIO', condition: 'عدوى أسنان/طفيليات', symptoms: ['لدي خراج في أسناني', 'أعاني من إسهال بسبب أميبا معوية'], correctMed: 'metronidazole', explanation: 'متخصص في القضاء على البكتيريا اللاهوائية (التي تعيش في خراج الأسنان) والطفيليات المعوية.' },
    { cat: 'ANTIBIO', condition: 'فطريات', symptoms: ['لدي بقع بيضاء في الفم وبلع متألم', 'أعاني من التهاب فطري مهبلي'], correctMed: 'fluconazole', explanation: 'مضاد فطريات جهازي فعال يقضي على عدوى الخميرة والفطريات في الجسم.' },
    
    // RESP Cases
    { cat: 'RESP', condition: 'حساسية جيوب أنفية (في العمل)', symptoms: ['لا أتوقف عن العطس وعيني تدمع وأنا في عملي', 'أريد دواء للحساسية لا يجعلني أنام'], correctMed: 'loratadine', explanation: 'مضاد هيستامين من الجيل الثاني، يعالج الحساسية بفعالية كبيرة ولا يعبر الحاجز الدماغي، فلا يسبب نعاساً.' },
    { cat: 'RESP', condition: 'حساسية شديدة سريعة', symptoms: ['أعاني من طفح جلدي وحكة مفاجئة قوية', 'أريد شيئاً سريع المفعول للحساسية'], correctMed: 'cetirizine', explanation: 'مضاد هيستامين قوي جداً وسريع المفعول، قد يسبب نعاساً طفيفاً لكنه ممتاز للحالات الحادة.' },
    { cat: 'RESP', condition: 'أزمة ربو حادة', symptoms: ['صدري يضيق وأسمع صوت أزيز عند التنفس', 'لا أستطيع التقاط أنفاسي'], correctMed: 'salbutamol', explanation: 'يعمل كموسع سريع للشعب الهوائية عن طريق إرخاء العضلات التنفسية، وهو بخاخ الطوارئ للربو.' },
    { cat: 'RESP', condition: 'ربو وقائي', symptoms: ['طبيبي وصف لي بخاخاً أستخدمه يومياً للوقاية من أزمات الربو', 'أحتاج لعلاج التهاب القصبات المزمن'], correctMed: 'budesonide', explanation: 'كورتيزون موضعي للاستنشاق يقلل التهاب مجرى الهواء ويمنع تكرار النوبات.' },
    { cat: 'RESP', condition: 'سعال ببلغم', symptoms: ['كحتي مليئة بالبلغم الذي لا يخرج بسهولة', 'أشعر بانسداد في صدري من المخاط'], correctMed: 'guaifenesin', explanation: 'يعمل كمقشع وطارد للبلغم عن طريق ترقيق المخاط لتسهيل خروجه مع السعال.' },

    // CARDIO Cases
    { cat: 'CARDIO', condition: 'ضغط دم مرتفع لمسن', symptoms: ['أعاني من صداع وقياس ضغطي دائماً فوق 140/90', 'طبيبي وصف لي دواء لا يؤثر على ضربات القلب'], correctMed: 'amlodipine', explanation: 'أملوديبين يغلق قنوات الكالسيوم ويوسع الأوعية الدموية بلطف لخفض الضغط بفعالية.' },
    { cat: 'CARDIO', condition: 'ضغط وتسارع قلب', symptoms: ['ضغطي مرتفع وضربات قلبي سريعة دائماً', 'أشعر بخفقان في القلب مع ارتفاع الضغط'], correctMed: 'bisoprolol', explanation: 'من حاصرات بيتا التي تبطئ ضربات القلب وتقلل قوة انقباضه مما يخفض الضغط ويريح القلب.' },
    { cat: 'CARDIO', condition: 'احتباس سوائل', symptoms: ['قدماي متورمتان وتتجمع فيهما السوائل بكثرة', 'أعاني من فشل قلبي طفيف أدى لتورم'], correctMed: 'furosemide', explanation: 'مدر بول قوي (عروي) يجبر الكلى على التخلص من الأملاح والماء الزائد، مما يقلل التورم ويريح القلب.' },
    { cat: 'CARDIO', condition: 'كوليسترول', symptoms: ['أظهرت تحاليلي ارتفاعاً في الكوليسترول الضار LDL', 'أريد حماية شراييني من الانسداد'], correctMed: 'atorvastatin', explanation: 'من عائلة الستاتين الفعالة جداً في تقليل إنتاج الكبد للكوليسترول، وحماية القلب من الجلطات.' },
    { cat: 'CARDIO', condition: 'وقاية من الجلطات', symptoms: ['أجريت عملية قسطرة حديثاً', 'طبيبي وصف لي دواء يمنع الصفائح من التجمع'], correctMed: 'clopidogrel', explanation: 'يمنع الصفائح الدموية من الالتصاق ببعضها بقوة، مما يمنع تكون الجلطات في الشرايين والدعامات.' },

    // ENDO Cases
    { cat: 'ENDO', condition: 'سكري درجة ثانية (بداية)', symptoms: ['اكتشفت مؤخراً أن التراكمي لدي 6.8', 'طبيبي قال أن لدي مقاومة أنسولين'], correctMed: 'metformin', explanation: 'الخط العلاجي الأول لمرضى السكري، يقلل إنتاج الجلوكوز في الكبد ويحسن استجابة الخلايا للأنسولين.' },
    { cat: 'ENDO', condition: 'سكري (يحتاج تحفيز)', symptoms: ['الميتفورمين وحده لم يعد يكفي لضبط السكر', 'طبيبي وصف لي دواء ليحفز البنكرياس لإفراز المزيد من الأنسولين'], correctMed: 'gliclazide', explanation: 'من مجموعة السلفونيل يوريا، يغلق قنوات البوتاسيوم في خلايا البنكرياس لتحفيز إفراز الأنسولين.' },
    { cat: 'ENDO', condition: 'خمول الغدة الدرقية', symptoms: ['أشعر بالبرد دائماً، وزني يزداد، وتحليل TSH مرتفع جداً', 'غدتي الدرقية لا تفرز بشكل كافٍ'], correctMed: 'levothyroxine', explanation: 'هرمون صناعي يعوض النقص التام أو الجزئي لإفراز الغدة الدرقية ويعيد عمليات الأيض.' },
    { cat: 'ENDO', condition: 'نقرس', symptoms: ['أصبع قدمي الكبير منتفخ وأحمر، واليوريك أسيد مرتفع', 'أريد دواء يخفض حمض اليوريك للوقاية'], correctMed: 'allopurinol', explanation: 'يقلل من إنتاج الجسم لحمض اليوريك عبر تثبيط الإنزيم المسؤول عن تصنيعه، مانعاً نوبات النقرس.' },

    // CNS Cases
    { cat: 'CNS', condition: 'قلق ونوبات هلع', symptoms: ['أعاني من توتر شديد وضربات قلب سريعة ونوبات هلع', 'لا أستطيع النوم من كثرة التفكير والقلق'], correctMed: 'alprazolam', explanation: 'مهدئ قوي وسريع للقلق (ينتمي للبنزوديازيبينات)، يهدئ نشاط الدماغ الزائد فوراً.' },
    { cat: 'CNS', condition: 'اكتئاب', symptoms: ['أعاني من حزن مستمر وفقدان الشغف في الحياة', 'طبيبي شخصني بالاكتئاب السريري'], correctMed: 'escitalopram', explanation: 'من مجموعة SSRI، يزيد من توفر السيروتونين (هرمون السعادة) في المشابك العصبية بفعالية وأمان.' },
    { cat: 'CNS', condition: 'ألم أعصاب (سكري)', symptoms: ['أشعر بحرقان وتنميل ووخز إبر في أطرافي', 'لدي اعتلال عصبي بسبب السكر المزمن'], correctMed: 'pregabalin', explanation: 'دواء متخصص في تهدئة الإشارات العصبية المؤلمة غير الطبيعية (آلام الأعصاب) الناتجة عن السكري أو إصابات الأعصاب.' },
    
    // DERMA Cases
    { cat: 'DERMA', condition: 'إكزيما متوسطة', symptoms: ['لدي بقعة حمراء شديدة الجفاف والحكة في يدي', 'أعاني من إكزيما بسيطة'], correctMed: 'hydrocortisone', explanation: 'كورتيزون موضعي خفيف يقلل الالتهاب والاحمرار والحكة الناتجة عن الإكزيما بشكل سريع وآمن.' },
    { cat: 'DERMA', condition: 'حب شباب عنيد', symptoms: ['وجهي مليء بحبوب الشباب الكيسية الشديدة والملتهبة', 'جربت الكريمات والمضادات ولم تفلح'], correctMed: 'isotretinoin', explanation: 'دواء قوي جداً (مشتق من فيتامين أ) يقلل إفراز الدهون ويصغر الغدد الدهنية ليقضي على حب الشباب الشديد من جذوره.' }
];
