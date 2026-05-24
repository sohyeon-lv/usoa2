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
  const tiles = [
    {
      kicker: `${year} archive`,
      title: "Selected Works",
      meta: "연도별 대표 작업을 먼저 보여주는 큰 이미지 타일",
      size: "span-7 row-4",
      expand: "expand-right",
      image: `${year}.jpg`,
      tone: "#bec8c4"
    },
    {
      kicker: "Section A",
      title: "1st Grade",
      meta: "기초설계 / 드로잉 / 모델링",
      size: "span-3 row-2",
      expand: "expand-down",
      color: "#d8ddd8"
    },
    {
      kicker: "Section B",
      title: "2nd Grade",
      meta: "주택 / 도시 / 공공성",
      size: "span-2 row-2",
      expand: "expand-left",
      color: "#d2d7de"
    },
    {
      kicker: "Image Tile",
      title: "Studio View",
      meta: "임시 이미지 블록",
      size: "span-3 row-3",
      expand: "expand-up",
      image: "2024.jpg",
      tone: "#c9c4bb"
    },
    {
      kicker: "Keyword",
      title: "Archive",
      meta: "기록 / 전시 / 구조 / 감각",
      size: "span-2 row-3",
      expand: "expand-right",
      color: "#d8d2ca"
    },
    {
      kicker: "Section C",
      title: "3rd Grade",
      meta: "스튜디오 / 프로젝트 / 리서치",
      size: "span-4 row-2",
      expand: "expand-left",
      color: "#c9d7d3"
    },
    {
      kicker: "Image Tile",
      title: "Model + Drawing",
      meta: "이미지가 들어가는 작은 타일",
      size: "span-4 row-3",
      expand: "expand-down",
      image: "2025.jpg",
      tone: "#b8c6d2"
    },
    {
      kicker: "Section D",
      title: "4th Grade",
      meta: "심화설계 / 졸업설계 / 아카이빙",
      size: "span-3 row-2",
      expand: "expand-up",
      color: "#d7d7cf"
    },
    {
      kicker: "Text Block",
      title: "Department Archive",
      meta: "모든 블록에 이미지를 넣지 않고, 일부는 정보와 여백을 위한 컬러 타일로 둔다.",
      size: "span-5 row-2",
      expand: "expand-right",
      color: "#e1ddd6"
    },
    {
      kicker: "Section E",
      title: "Events",
      meta: "전시 / 행사 / 기록물",
      size: "span-3 row-2",
      expand: "expand-left",
      color: "#cfd5cf"
    }
  ];

  return tiles
    .map((tile, index) => {
      const classes = `stack-tile ${tile.size} ${tile.expand} ${tile.image ? "is-image" : "is-color"}`;
      const style = tile.image
        ? `--tile-image: url('${tile.image}'); --tile-bg: ${tile.tone || "#cfcfcf"};`
        : `--tile-bg: ${tile.color || "#d9d9d9"};`;

      return `
        <article class="${classes}" style="${style}">
          <div class="stack-inner">
            <div class="stack-kicker">${tile.kicker}</div>
            <h3 class="stack-title">${tile.title}</h3>
            <p class="stack-meta">${tile.meta}</p>
          </div>
          <div class="stack-index">${String(index + 1).padStart(2, "0")}</div>
        </article>
      `;
    })
    .join("");
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

function initMinimalArchivePrototype() {
  const stage = document.getElementById("tile-stage");
  if (!stage) return;

  const params = new URLSearchParams(window.location.search);
  const currentYear = params.get("year") || "2026";

  document.querySelectorAll(".year-rail-link").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.year === currentYear);
  });

  document.querySelectorAll(".js-current-year").forEach((el) => {
    el.textContent = currentYear;
  });

  document.querySelectorAll("[data-current-image='true']").forEach((el) => {
    el.style.setProperty("--tile-image", `url('${currentYear}.jpg')`);
  });

  const tiles = stage.querySelectorAll(".tile");

  function clearActive() {
    stage.dataset.active = "";
    tiles.forEach((tile) => tile.classList.remove("is-active"));
  }

  tiles.forEach((tile) => {
    const tileId = tile.dataset.tile;

    tile.addEventListener("mouseenter", () => {
      stage.dataset.active = tileId;
      tiles.forEach((item) => item.classList.remove("is-active"));
      tile.classList.add("is-active");
    });

    tile.addEventListener("focus", () => {
      stage.dataset.active = tileId;
      tiles.forEach((item) => item.classList.remove("is-active"));
      tile.classList.add("is-active");
    });
  });

  stage.addEventListener("mouseleave", clearActive);

  tiles.forEach((tile) => {
    tile.addEventListener("blur", () => {
      window.setTimeout(() => {
        const stillFocusedInsideStage = stage.contains(document.activeElement);
        if (!stillFocusedInsideStage) {
          clearActive();
        }
      }, 0);
    });
  });
}

document.addEventListener("DOMContentLoaded", initMinimalArchivePrototype);
