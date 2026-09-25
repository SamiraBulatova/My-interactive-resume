
const skills = [
    { name: "C++",              categories: ["languages"] },
    { name: "PHP",            categories: ["languages", "backend"] },
    { name: "JavaScript",     categories: ["languages", "backend"] },
    { name: "Python",         categories: ["languages", "backend"] },
    { name: "Kotlin",         categories: ["languages"] },

    { name: "HTML",           categories: ["frontend","languages"] },
    { name: "CSS",            categories: ["frontend"] },

    { name: "Flask",          categories: ["backend"] },

    { name: "SQL",            categories: ["databases"] },
    { name: "MySQL",          categories: ["databases"] },

    { name: "Git",            categories: ["tools"] },
    { name: "Visual Studio",  categories: ["tools"] },
    { name: "IntelliJ IDEA",  categories: ["tools"] },
    { name: "PyCharm",        categories: ["tools"] },

    { name: "Windows",        categories: ["os"] },
    { name: "Android",        categories: ["os"] },
];

const skillsList = document.getElementById("skills-list");
const skillsEmpty = document.getElementById("skills-empty");
const searchInput = document.getElementById("skills-search");
const filterButtons = document.querySelectorAll(".skills__filter-btn");

let currentCategory = "all";
let currentSearch = "";


function renderSkills() {
    const filtered = skills.filter((skill) => {
    const matchesCategory =
        currentCategory === "all" ||
        skill.categories.includes(currentCategory);
    const matchesSearch =
        skill.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
});

    skillsList.innerHTML = "";

    if (filtered.length === 0) {
        skillsEmpty.hidden = false;
        return;
    }

    skillsEmpty.hidden = true;

    filtered.forEach((skill) => {
        const li = document.createElement("li");
        li.classList.add("skills__item");
        li.textContent = skill.name;
        skillsList.appendChild(li);
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        currentCategory = button.dataset.category;
        renderSkills();
    });
});


searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderSkills();
});

renderSkills();

const themeToggle = document.querySelector(".theme-toggle");

// 1. При загрузке: проверь localStorage и поставь тему
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("theme-dark");
}

// 2. При клике: переключай тему и сохраняй выбор
themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("theme-dark");
    const isDark = document.documentElement.classList.contains("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});