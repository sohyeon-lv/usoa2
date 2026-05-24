const years = ["2023", "2024", "2025", "2026"];

const archiveDescriptions = {
  "2023": "2023년도 작품 아카이브 목업. 연도별 작품 목록이 어떻게 보일지 확인하기 위한 임시 시안이다.",
  "2024": "2024년도 작품 아카이브 목업. 제목, 이름, 학년, 프로젝트명(스튜디오) 노출 위치를 먼저 점검하는 단계다.",
  "2025": "2025년도 작품 아카이브 목업. 실제 카테고리와 검색 기능은 아직 미정이며, 우선 기본적인 열람 흐름만 확인한다.",
  "2026": "2026년도 작품 아카이브 목업. 1차안에서는 3열 그리드 구조와 밝은 배경 톤을 우선 적용했다."
};

const mockTitles = [
  "도시의 틈",
  "경계 위의 집",
  "천천히 지나가는 풍경",
  "겹쳐진 마당",
  "낮은 공공성",
  "빛의 단면",
  "기억을 위한 구조",
  "느린 경사",
  "열린 복도"
];

const mockNames = [
  "학생 A",
  "학생 B",
  "학생 C",
  "학생 D",
  "학생 E",
  "학생 F",
  "학생 G",
  "학생 H",
  "학생 I"
];

const mockGrades = ["1학년", "2학년", "3학년", "4학년"];
const mockStudios = [
  "Studio 01",
  "Studio 02",
  "Studio 03",
  "Studio 04"
];

function initHomePage() {
  const body = document.body;
  const yearLinks = document.querySelectorAll(".year-link");

  if (!yearLinks.length) return;

  function clearActiveState() {
    yearLinks.forEach((link) => link.classList.remove("active"));
    body.classList.remove("bg-active", "bg-2023", "bg-2024", "bg-2025", "bg-2026");
  }

  function setActiveYear(year, target) {
    clearActiveState();
    body.classList.add("bg-active", `bg-${year}`);
    target.classList.add("active");
  }

  yearLinks.forEach((link) => {
    const year = link.dataset.year;

    link.addEventListener("mouseenter", () => {
      setActiveYear(year, link);
    });

    link.addEventListener("focus", () => {
      setActiveYear(year, link);
    });

    link.addEventListener("click", () => {
      window.location.href = `archive.html?year=${year}`;
    });
  });

  const yearList = document.querySelector(".year-list");
  if (yearList) {
    yearList.addEventListener("mouseleave", clearActiveState);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearActiveState();
    }
  });
}

function buildMockCards(year) {
  return mockTitles.map((title, index) => {
    const grade = mockGrades[(index + Number(year)) % mockGrades.length];
    const studio = mockStudios[index % mockStudios.length];
    const patternClasses = ["pattern-a", "pattern-b", "pattern-c", "pattern-d"];
    const patternClass = patternClasses[index % patternClasses.length];

    const thumbColors = [
      ["#8fa7a1", "#3e4a47"],
      ["#b7b4a8", "#555148"],
      ["#b7c4d3", "#465665"],
      ["#b2b8aa", "#4b5145"],
      ["#c8b7ad", "#66524b"],
      ["#97b8b0", "#35524d"],
      ["#9ca6b8", "#4b5566"],
      ["#c1c1ba", "#66665f"],
      ["#94aa9a", "#3f5245"]
    ];

    const [soft, dark] = thumbColors[index % thumbColors.length];

    return `
      <article class="archive-card">
        <div
          class="card-thumb ${patternClass}"
          data-label="${year} Project ${String(index + 1).padStart(2, "0")}"
          style="--thumb-soft: ${soft}; --thumb-dark: ${dark};"
        ></div>
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <div class="card-meta">
            <span><strong>이름</strong> ${mockNames[index]}</span>
            <span><strong>학년</strong> ${grade}</span>
            <span><strong>프로젝트명</strong> ${studio}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initArchivePage() {
  const yearTarget = document.querySelector("#archive-year");
  const descTarget = document.querySelector("#archive-description");
  const gridTarget = document.querySelector("#archive-grid");
  const yearNavLinks = document.querySelectorAll(".archive-year-link");

  if (!yearTarget || !descTarget || !gridTarget) return;

  const params = new URLSearchParams(window.location.search);
  const currentYear = params.get("year") || "2023";

  yearTarget.textContent = currentYear;
  descTarget.textContent = archiveDescriptions[currentYear] || archiveDescriptions["2023"];
  gridTarget.innerHTML = buildMockCards(currentYear);

  yearNavLinks.forEach((link) => {
    if (link.dataset.year === currentYear) {
      link.classList.add("is-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("home")) {
    initHomePage();
  }

  if (document.body.classList.contains("archive")) {
    initArchivePage();
  }
});
