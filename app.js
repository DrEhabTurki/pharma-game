let score = 0;
let currentCorrectMed = null;
let currentCase = null;
let activeCategory = 'ALL';
let remainingCases = [];

// DOM Elements
const screens = {
    categories: document.getElementById('categories-screen'),
    game: document.getElementById('game-screen')
};

const UI = {
    score: document.getElementById('score'),
    symptomText: document.getElementById('symptom-text'),
    patientName: document.getElementById('patient-name'),
    severityBadge: document.getElementById('severity-badge'),
    medicinesGrid: document.getElementById('medicines-grid'),
    patientImg: document.getElementById('patient-img'),
    currentCategoryBadge: document.getElementById('current-category-badge'),
    categoriesGrid: document.getElementById('categories-grid'),
    
    // Modal
    modal: document.getElementById('explanation-modal'),
    modalHeader: document.getElementById('modal-header'),
    modalIcon: document.getElementById('modal-icon'),
    modalTitle: document.getElementById('modal-title'),
    modalMedName: document.getElementById('modal-med-name'),
    modalBrand: document.getElementById('modal-brand'),
    modalText: document.getElementById('modal-text'),
    nextBtn: document.getElementById('next-btn')
};

// Procedural Generation Parts
const NAMES = ['أحمد', 'محمد', 'سارة', 'فاطمة', 'عمر', 'خالد', 'مريم', 'نورة', 'يوسف', 'علي', 'هدى', 'منى', 'طارق', 'ليلى', 'حسن'];
const DURATIONS = ['منذ يومين', 'منذ أسبوع', 'طوال الليلة الماضية', 'منذ الصباح', 'لعدة أيام متواصلة', 'بشكل مفاجئ اليوم', 'منذ شهر'];
const SEVERITIES = ['شديد', 'مزعج', 'لا يحتمل', 'مستمر', 'خفيف ولكنه مقلق', 'يتزايد تدريجياً'];

function init() {
    UI.nextBtn.addEventListener('click', closeExplanationAndNext);
    renderCategories();
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function renderCategories() {
    UI.categoriesGrid.innerHTML = '';
    CATEGORIES.forEach(cat => {
        let count = 0;
        if (cat.id === 'ALL') {
            count = MEDICINES_DB.length;
        } else {
            count = MEDICINES_DB.filter(m => m.cat === cat.id).length;
        }
        
        const btn = document.createElement('div');
        btn.className = 'cat-btn';
        btn.innerHTML = `
            <i class="${cat.icon} cat-icon"></i>
            <div class="cat-name">${cat.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 5px; background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 10px;">${count} مادة فعالة</div>
        `;
        btn.addEventListener('click', () => startGame(cat.id, cat.name));
        UI.categoriesGrid.appendChild(btn);
    });
}

function startGame(categoryId, categoryName) {
    score = 0;
    activeCategory = categoryId;
    UI.currentCategoryBadge.textContent = categoryName;
    
    // Filter cases by category
    if (activeCategory === 'ALL') {
        remainingCases = [...CLINICAL_CASES];
    } else {
        remainingCases = CLINICAL_CASES.filter(c => c.cat === activeCategory);
        if (remainingCases.length === 0) {
            alert('لا توجد حالات مسجلة في هذا القسم حالياً، سيتم فتح الاختبار الشامل.');
            remainingCases = [...CLINICAL_CASES];
            activeCategory = 'ALL';
            UI.currentCategoryBadge.textContent = 'اختبار شامل';
        }
    }
    
    updateUI();
    showScreen('game');
    generateCase();
}

function updateUI() {
    UI.score.textContent = score;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Procedural Generator Engine
function generateCase() {
    UI.patientImg.className = 'patient-img'; 
    
    // Reset pool if all cases played in this category
    if (remainingCases.length === 0) {
        if (activeCategory === 'ALL') {
            remainingCases = [...CLINICAL_CASES];
        } else {
            remainingCases = CLINICAL_CASES.filter(c => c.cat === activeCategory);
        }
    }
    
    // 1. Pick a random base case from REMAINING cases
    const randomIndex = Math.floor(Math.random() * remainingCases.length);
    currentCase = remainingCases.splice(randomIndex, 1)[0]; 
    
    currentCorrectMed = MEDICINES_DB.find(m => m.id === currentCase.correctMed);
    
    // 2. Procedural construction of the symptom text
    const symptomTemplate = randomItem(currentCase.symptoms);
    const duration = randomItem(DURATIONS);
    const severity = randomItem(SEVERITIES);
    const finalSymptomText = `${symptomTemplate} ${duration}، وهو ${severity}.`;
    
    // 3. Update Patient Info
    const patientAge = Math.floor(Math.random() * 60) + 15;
    UI.patientName.textContent = `المريض: ${randomItem(NAMES)} (${patientAge} سنة)`;
    
    const severitiesLevels = ['عادي', 'متوسط', 'حرج'];
    const selectedSeverity = randomItem(severitiesLevels);
    UI.severityBadge.textContent = `حالة: ${selectedSeverity}`;
    UI.severityBadge.style.color = selectedSeverity.includes('حرج') ? '#fda4af' : (selectedSeverity.includes('متوسط') ? '#fde047' : '#67e8f9');
    UI.severityBadge.style.background = selectedSeverity.includes('حرج') ? 'rgba(244, 63, 94, 0.2)' : (selectedSeverity.includes('متوسط') ? 'rgba(250, 204, 21, 0.2)' : 'rgba(6, 182, 212, 0.2)');
    UI.severityBadge.style.borderColor = selectedSeverity.includes('حرج') ? 'rgba(244, 63, 94, 0.3)' : (selectedSeverity.includes('متوسط') ? 'rgba(250, 204, 21, 0.3)' : 'rgba(6, 182, 212, 0.3)');

    UI.symptomText.textContent = finalSymptomText;
    
    // 4. Generate 6 medicine choices (Smart Distractors)
    generateMedicineOptions(currentCorrectMed);
}

function generateMedicineOptions(correctMedObj) {
    UI.medicinesGrid.innerHTML = '';
    
    // Smart Distractors: Try to get wrong meds from the SAME category first
    let wrongMedsPool = MEDICINES_DB.filter(m => m.id !== correctMedObj.id && m.cat === correctMedObj.cat);
    
    // If not enough in the same category, fill with random meds from ANY category
    if (wrongMedsPool.length < 5) {
        const otherMeds = MEDICINES_DB.filter(m => m.id !== correctMedObj.id && m.cat !== correctMedObj.cat);
        wrongMedsPool = [...wrongMedsPool, ...otherMeds];
    }
    
    // Shuffle and pick 5
    const wrongMeds = wrongMedsPool.sort(() => 0.5 - Math.random()).slice(0, 5);
    
    // Combine and shuffle
    const options = [correctMedObj, ...wrongMeds].sort(() => 0.5 - Math.random());
    
    // Render
    options.forEach(med => {
        const btn = document.createElement('div');
        btn.className = 'med-btn glass';
        btn.innerHTML = `
            <div class="med-name">${med.name}</div>
            <div class="med-class">${med.classAr}</div>
        `;
        btn.addEventListener('click', () => handleMedicineClick(med.id));
        UI.medicinesGrid.appendChild(btn);
    });
}

function handleMedicineClick(medId) {
    if (!currentCorrectMed) return;

    const isCorrect = (medId === currentCorrectMed.id);

    if (isCorrect) {
        score += 15;
        UI.patientImg.classList.add('cured');
    } else {
        score = Math.max(0, score - 5);
        UI.patientImg.classList.add('wrong');
    }
    
    showExplanationModal(isCorrect);
    updateUI();
}

function showExplanationModal(isCorrect) {
    UI.modal.classList.add('active');
    
    UI.modalHeader.className = 'modal-header ' + (isCorrect ? 'correct' : 'wrong');
    UI.modalIcon.className = isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle';
    UI.modalTitle.textContent = isCorrect ? 'اختيار ممتاز!' : 'إجابة خاطئة!';
    
    UI.modalMedName.textContent = currentCorrectMed.name;
    UI.modalBrand.innerHTML = `<i class="fas fa-tags"></i> أشهر الأسماء التجارية: ${currentCorrectMed.brand}`;
    UI.modalText.innerHTML = `<strong>الشرح:</strong> ${currentCase.explanation}`;
}

function closeExplanationAndNext() {
    UI.modal.classList.remove('active');
    UI.patientImg.classList.remove('wrong');
    generateCase();
}

// Start
init();
