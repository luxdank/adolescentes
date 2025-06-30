// Mostrar data atual
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', options);
document.getElementById('current-year').textContent = now.getFullYear();

// Banco de versículos aleatórios
const verses = [
    {
        text: "\"Porque eu sei os planos que tenho para vocês', diz o Senhor, 'planos de prosperar e não de lhes fazer mal, planos de dar-lhes esperança e um futuro.\"",
        reference: "Jeremias 29:11"
    },
    // Outros versículos...
];

// Banco de dados de devocionais (inicial)
let devotionalsDB = JSON.parse(localStorage.getItem('devotionalsDB')) || [
    {
        id: 1,
        title: "Confiança em Tempos de Incerteza",
        content: "Em meio às turbulências da vida, muitas vezes nos sentimos perdidos e inseguros...",
        verse: "Provérbios 3:5-6",
        verseText: "\"Confie no Senhor de todo o seu coração...\"",
        reflection: "Quando entregamos nossas preocupações a Deus...",
        prayer: "Pai querido, hoje eu te entrego minhas ansiedades...",
        date: "2023-11-01",
        author: "Administrador"
    }
];

// Função para salvar no banco de dados
function saveDevotionalsToDB() {
    localStorage.setItem('devotionalsDB', JSON.stringify(devotionalsDB));
}

// Função para obter devocional por data (ou aleatório)
function getDevotional(date = null) {
    if (date) {
        const devotional = devotionalsDB.find(d => d.date === date);
        if (devotional) return devotional;
    }
    
    // Se não encontrar por data, retorna aleatório
    return devotionalsDB[Math.floor(Math.random() * devotionalsDB.length)];
}

// Função para adicionar novo devocional
function addDevocional(newDevocional) {
    newDevocional.id = devotionalsDB.length > 0 ? Math.max(...devotionalsDB.map(d => d.id)) + 1 : 1;
    devotionalsDB.push(newDevocional);
    saveDevotionalsToDB();
    return newDevocional;
}

// Interface administrativa
function showAdminPanel() {
    const password = prompt("Digite a senha de administrador:");
    if (password !== "senha123") { // Substitua por uma senha segura
        alert("Acesso negado!");
        return;
    }

    const adminHTML = `
        <div class="admin-panel">
            <h2>Painel Administrativo</h2>
            <form id="devocional-form">
                <input type="date" id="devocional-date" required>
                <input type="text" id="devocional-title" placeholder="Título" required>
                <textarea id="devocional-content" placeholder="Conteúdo" required></textarea>
                <input type="text" id="devocional-verse" placeholder="Referência bíblica (ex: João 3:16)" required>
                <textarea id="devocional-verse-text" placeholder="Texto bíblico" required></textarea>
                <textarea id="devocional-reflection" placeholder="Reflexão" required></textarea>
                <textarea id="devocional-prayer" placeholder="Oração" required></textarea>
                <button type="submit" class="cta-button">Salvar Devocional</button>
            </form>
            <div id="devocionals-list"></div>
        </div>
    `;

    const panel = document.createElement('div');
    panel.innerHTML = adminHTML;
    document.body.appendChild(panel);

    // Listar devocionais existentes
    renderDevocionalsList();

    // Formulário de submissão
    document.getElementById('devocional-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newDevocional = {
            title: document.getElementById('devocional-title').value,
            content: document.getElementById('devocional-content').value,
            verse: document.getElementById('devocional-verse').value,
            verseText: document.getElementById('devocional-verse-text').value,
            reflection: document.getElementById('devocional-reflection').value,
            prayer: document.getElementById('devocional-prayer').value,
            date: document.getElementById('devocional-date').value,
            author: "Administrador"
        };

        addDevocional(newDevocional);
        renderDevocionalsList();
        this.reset();
        alert("Devocional salvo com sucesso!");
    });
}

function renderDevocionalsList() {
    const listContainer = document.getElementById('devocionals-list');
    if (!listContainer) return;

    listContainer.innerHTML = `
        <h3>Devocionais Cadastrados (${devotionalsDB.length})</h3>
        <ul>
            ${devotionalsDB.map(d => `
                <li>
                    <strong>${d.date}</strong>: ${d.title} 
                    <button onclick="deleteDevocional(${d.id})">Excluir</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function deleteDevocional(id) {
    if (confirm("Tem certeza que deseja excluir este devocional?")) {
        devotionalsDB = devotionalsDB.filter(d => d.id !== id);
        saveDevotionalsToDB();
        renderDevocionalsList();
    }
}

// Modifique a função displayRandomDevotional para usar o banco de dados
function displayRandomDevotional() {
    const devotional = getDevotional();
    document.getElementById('devocional-title').textContent = devotional.title;
    document.getElementById('devocional-content').textContent = devotional.content;
    document.getElementById('devocional-verse').textContent = `${devotional.verseText} (${devotional.verse})`;
    document.getElementById('devocional-reflection').textContent = devotional.reflection;
    document.getElementById('devocional-prayer').textContent = devotional.prayer;
}

// Adicione um botão de admin no footer (opcional)
document.querySelector('footer').innerHTML += `
    <button onclick="showAdminPanel()" style="background: transparent; border: none; color: white; cursor: pointer; margin-top: 1rem;">
        <i class="fas fa-lock"></i> Acesso Administrativo
    </button>
`;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    displayRandomVerse();
    displayRandomDevotional();
    loadGoals();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Banco de orações aleatórias
const prayers = [
    {
        title: "Oração pela Manhã",
        content: "\"Senhor, obrigado por este novo dia que me deste...\""
    },
    // Outras orações...
];

// Funções para exibir conteúdo aleatório
function displayRandomVerse() {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    document.getElementById('random-verse').innerHTML = `${randomVerse.text} <br><strong>— ${randomVerse.reference}</strong>`;
}

function displayRandomDevotional() {
    const randomDevotional = devotionals[Math.floor(Math.random() * devotionals.length)];
    document.getElementById('devocional-title').textContent = randomDevotional.title;
    document.getElementById('devocional-content').textContent = randomDevotional.content;
    document.getElementById('devocional-verse').textContent = randomDevotional.verse;
    document.getElementById('devocional-reflection').textContent = randomDevotional.reflection;
    document.getElementById('devocional-prayer').textContent = randomDevotional.prayer;
}

// Todas as outras funções JavaScript...

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    displayRandomVerse();
    displayRandomDevotional();
    loadGoals();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});