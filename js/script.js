(function () {
  "use strict";

  function $(s) {
    return document.querySelector(s);
  }

  function $$(s) {
    return Array.from(document.querySelectorAll(s));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Всплывающие уведомления
  var toast = $("#toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  // Декоративные частицы на фоне
  var particles = $("#particles");
  if (particles) {
    var colors = ["var(--cyan)", "var(--magenta)", "var(--lime)"];
    for (var i = 0; i < 20; i++) {
      var p = document.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = (15 + Math.random() * 20) + "s";
      p.style.animationDelay = (-Math.random() * 25) + "s";
      p.style.background = colors[i % 3];
      p.style.opacity = "0.35";
      particles.appendChild(p);
    }
  }

  // Мобильное меню-бургер в шапке
  var menuBtn = $("#menuBtn");
  var navLinks = $("#navLinks");
  var progressLine = $("#progressLine");
  var toTop = $("#toTop");

  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Открыть меню");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });
  }

  $$(".nav-links a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressLine) progressLine.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (toTop) toTop.classList.toggle("show", y > 500);
    },
    { passive: true }
  );

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Плавное появление блоков при прокрутке
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // ДАННЫЕ ЛЕКЦИЙ (8 модулей, включая Git и Apache + YouTube видео)
  var lecturesData = [
    {
      id: "lec-1",
      num: "Лекция 01",
      title: "Основы HTML5 и структура документа",
      desc: "Базовый скелет страницы, парные и одиночные теги, правила вложенности и обязательные атрибуты.",
      points: [
        'Документ всегда начинается с <!DOCTYPE html> и <html lang="ru">.',
        "В <head> задаются кодировка UTF-8, viewport для мобильных и заголовок <title>.",
        "Блочные элементы (<div>, <p>) занимают всю ширину строки, строчные (<span>, <a>) идут в потоке.",
        "У всех изображений должен быть осмысленный атрибут alt."
      ],
      youtubeId: "SKRydSA2bYA",
      fileName: "Lection_01_HTML"
    },
    {
      id: "lec-2",
      num: "Лекция 02",
      title: "CSS3, Flexbox, Grid и рендеринг браузера",
      desc: "Как браузер строит DOM и CSSOM, почему анимируют transform и opacity и как строить адаптивные сетки.",
      points: [
        "Рендеринг: HTML -> DOM, CSS -> CSSOM -> Render-дерево -> Layout -> Paint.",
        "Для плавных анимаций используйте transform и opacity, чтобы не вызывать пересчёт Layout.",
        "Flexbox идеально подходит для одномерных выравниваний, CSS Grid — для двумерных сеток."
      ],
      youtubeId: "mA6EaGs6rak",
      fileName: "Lection_02_CSS_Render"
    },
    {
      id: "lec-3",
      num: "Лекция 03",
      title: "Доступность (A11y) и SEO-оптимизация",
      desc: "Семантические теги, работа скринридеров, иерархия заголовков и требования контраста WCAG.",
      points: [
        "На странице должен быть только один <h1>, далее <h2> -> <h3> без перескоков уровней.",
        "Ссылки <a> служат для перехода, кнопки <button> — для действий на текущей странице.",
        "Минимальный контраст обычного текста по стандарту WCAG — 4.5:1."
      ],
      youtubeId: "MQTeFDeiRzg",
      fileName: "Lection_03_A11y_SEO"
    },
    {
      id: "lec-4",
      num: "Лекция 04",
      title: "Основы JavaScript и работа с DOM",
      desc: "Переменные const и let, типы данных, шаблонные строки, события и подключение скриптов с defer.",
      points: [
        "Используйте const по умолчанию, а let — только если значение будет перезаписываться.",
        "Атрибут defer гарантирует, что скрипт запустится после полного построения DOM-дерева.",
        "querySelector, classList и addEventListener — основа интерактивности страницы."
      ],
      youtubeId: "0UkSPa70fzM",
      fileName: "Lection_04_JavaScript"
    },
    {
      id: "lec-5",
      num: "Лекция 05",
      title: "Компоненты интерфейса: бургер, модалки, слайдер",
      desc: "Создание переиспользуемых UI-компонентов с поддержкой клавиатуры и ARIA-атрибутов.",
      points: [
        "Кнопка бургер-меню управляет атрибутами aria-expanded и aria-label.",
        "Модальное окно закрывается по клавише Escape и клику по затемнённому фону.",
        "Состояние вкладок и аккордеона строится по паттерну: снять active со всех -> добавить выбранному."
      ],
      youtubeId: "X9BCk6NoajM",
      fileName: "Lection_05_Components"
    },
    {
      id: "lec-6",
      num: "Лекция 06",
      title: "Работа с сервером: Fetch API, JSON и обработка ошибок",
      desc: "Асинхронные запросы async/await, методы GET/POST, правила JSON и проверка response.ok.",
      points: [
        "В JSON ключи и строки пишутся строго в двойных кавычках, без комментариев.",
        "fetch() отклоняет промис только при обрыве сети — ошибки 404/500 проверяем через if (!res.ok).",
        "Оборачивайте асинхронные запросы в блок try / catch / finally."
      ],
      youtubeId: "klVGCxWsN2A",
      fileName: "Lection_06_Fetch_JSON"
    },
    {
      id: "lec-7",
      num: "Лекция 07",
      title: "Система контроля версий Git и GitHub Pages",
      desc: "Инициализация репозитория, ветки, коммиты, отправка на GitHub и публикация статического сайта.",
      points: [
        'Базовый цикл работы: git init -> git add . -> git commit -m "описание" -> git push.',
        "На GitHub Pages пути к файлам нужно указывать без слеша в начале (css/style.css).",
        "HTTPS-сертификат выдаётся автоматически для всех сайтов на поддомене .github.io."
      ],
      youtubeId: "EeARyFrZsnU",
      fileName: "Lection_07_Git_Deploy"
    },
    {
      id: "lec-8",
      num: "Лекция 08",
      title: "Веб-сервер Apache и локальная инфраструктура",
      desc: "Как устроен HTTP-сервер Apache, конфигурация виртуальных хостов, .htaccess и коды ответов.",
      points: [
        "Apache принимает HTTP-запросы от браузера, обрабатывает правила маршрутизации и отдаёт файлы сайта.",
        "Файл .htaccess позволяет настраивать редиректы (301/302), страницы ошибок (404) и кэширование.",
        "Локальные сборки (XAMPP, OpenServer) позволяют запускать Apache и PHP прямо на компьютере."
      ],
      youtubeId: "6hmjG0J1Ak0",
      fileName: "Lection_08_Apache_Server"
    }
  ];

  // СОСТОЯНИЕ ПРОГРЕССА (localStorage)
  var STORAGE_KEY = "lec09_read_state";
  var readMap = {};
  try {
    readMap = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    readMap = {};
  }

  var accordionList = $("#accordionList");
  var readCountEl = $("#readCount");
  var totalCountEl = $("#totalCount");
  var statePctEl = $("#statePct");
  var heroPctEl = $("#heroPct");
  var stateBarFill = $("#stateBarFill");

  function updateProgressUI() {
    var total = lecturesData.length;
    var done = lecturesData.filter(function (l) {
      return !!readMap[l.id];
    }).length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;

    if (readCountEl) readCountEl.textContent = done;
    if (totalCountEl) totalCountEl.textContent = total;
    if (statePctEl) statePctEl.textContent = pct + "%";
    if (heroPctEl) heroPctEl.textContent = pct + "%";
    if (stateBarFill) stateBarFill.style.width = pct + "%";
  }

  // Скачивание конспекта в формате .txt или .docx
  function downloadLectureFile(lec, ext) {
    var lines = [
      lec.num + ": " + lec.title,
      "==========================================",
      lec.desc,
      "",
      "Ключевые тезисы:"
    ];
    lec.points.forEach(function (p, idx) {
      lines.push((idx + 1) + ". " + p);
    });
    lines.push("");
    lines.push("Видеоурок: https://www.youtube.com/watch?v=" + lec.youtubeId);

    var content = lines.join("\n");

    var mime = ext === "docx" ? "application/msword;charset=utf-8" : "text/plain;charset=utf-8";
    var blob = new Blob([content], { type: mime });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = lec.fileName + "." + ext;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Файл " + lec.fileName + "." + ext + " скачан");
  }

  // Отрисовка аккордеона («бургера») лекций
  function renderLectures() {
    if (!accordionList) return;

    var html = lecturesData
      .map(function (lec, index) {
        var isDone = !!readMap[lec.id];
        var isFirstOpen = index === 0;
        var pointsHtml = lec.points
          .map(function (pt) {
            return "<li>" + escapeHtml(pt) + "</li>";
          })
          .join("");

        return (
          '<article class="acc-item' + (isFirstOpen ? " open" : "") + (isDone ? " completed" : "") + '" id="item-' + lec.id + '">' +
            '<button type="button" class="acc-header" aria-expanded="' + String(isFirstOpen) + '" aria-controls="body-' + lec.id + '">' +
              '<div class="acc-title-wrap">' +
                '<span class="lec-burger" aria-hidden="true"><span></span></span>' +
                '<div>' +
                  '<span style="font-family:var(--mono); font-size:.75rem; color:var(--cyan);">' + escapeHtml(lec.num) + '</span>' +
                  '<h3 style="margin-top:2px;">' + escapeHtml(lec.title) + '</h3>' +
                '</div>' +
              '</div>' +
              '<div class="acc-meta">' +
                '<span class="status-pill">' + (isDone ? "✓ Прочитано" : "Не прочитано") + '</span>' +
              '</div>' +
            '</button>' +
            '<div class="acc-body" id="body-' + lec.id + '">' +
              '<div class="acc-grid">' +
                '<div>' +
                  '<p style="color:var(--muted); font-size:.95rem;">' + escapeHtml(lec.desc) + '</p>' +
                  '<ul class="acc-points">' + pointsHtml + '</ul>' +
                  '<div class="doc-links">' +
                    '<button type="button" class="doc-btn" data-dl="' + lec.id + '" data-ext="docx">📄 Конспект .docx</button>' +
                    '<button type="button" class="doc-btn" data-dl="' + lec.id + '" data-ext="txt">📝 Шпаргалка .txt</button>' +
                  '</div>' +
                  '<label class="read-check">' +
                    '<input type="checkbox" data-check="' + lec.id + '"' + (isDone ? " checked" : "") + '>' +
                    '<span>Отметить лекцию как прочитанную</span>' +
                  '</label>' +
                '</div>' +
                '<div>' +
                  '<div class="video-wrap">' +
                    '<iframe src="https://www.youtube.com/embed/' + escapeHtml(lec.youtubeId) + '" title="Видео: ' + escapeHtml(lec.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      })
      .join("");

    accordionList.innerHTML = html;

    // Раскрытие и сворачивание бургера каждой лекции
    accordionList.querySelectorAll(".acc-header").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var willOpen = !item.classList.contains("open");
        item.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", String(willOpen));
      });
    });

    // Чекбокс «Прочитано»
    accordionList.querySelectorAll("input[data-check]").forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var id = checkbox.dataset.check;
        var item = checkbox.closest(".acc-item");
        var pill = item.querySelector(".status-pill");

        if (checkbox.checked) {
          readMap[id] = true;
          item.classList.add("completed");
          if (pill) pill.textContent = "✓ Прочитано";
          showToast("Лекция отмечена как прочитанная");
        } else {
          delete readMap[id];
          item.classList.remove("completed");
          if (pill) pill.textContent = "Не прочитано";
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(readMap));
        } catch (e) {}
        updateProgressUI();
      });
    });

    // Скачивание файлов docx / txt
    accordionList.querySelectorAll("button[data-dl]").forEach(function (dlBtn) {
      dlBtn.addEventListener("click", function () {
        var targetId = dlBtn.dataset.dl;
        var lec = lecturesData.find(function (x) {
          return x.id === targetId;
        });
        if (lec) downloadLectureFile(lec, dlBtn.dataset.ext);
      });
    });

    updateProgressUI();
  }

  var resetBtn = $("#resetProgress");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      readMap = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      renderLectures();
      showToast("Прогресс сброшен до 0%");
    });
  }

  renderLectures();

  // ИТОГОВЫЙ ТЕСТ (10 ВОПРОСОВ ПО ВСЕМ ЛЕКЦИЯМ)
  var quiz = [
    {
      q: "Какая строка всегда должна быть первой в HTML5-документе?",
      options: ['<html lang="ru">', "<!DOCTYPE html>", "<head>", '<meta charset="UTF-8">'],
      answer: 1,
      explain: "<!DOCTYPE html> сообщает браузеру, что страница написана по стандарту HTML5."
    },
    {
      q: "Какие CSS-свойства лучше всего анимировать для плавной отрисовки без пересчёта Layout?",
      options: ["width и height", "margin и padding", "transform и opacity", "left и top"],
      answer: 2,
      explain: "transform и opacity обрабатываются композитором без пересчёта геометрии страницы."
    },
    {
      q: "Какой атрибут делает скрипт неблокирующим и запускает его после построения DOM?",
      options: ["async", "defer", "module", "hidden"],
      answer: 1,
      explain: "defer откладывает выполнение скрипта до полной загрузки HTML-структуры."
    },
    {
      q: "Какой ARIA-атрибут указывает скринридеру, раскрыт ли аккордеон или бургер-меню?",
      options: ["aria-hidden", "aria-expanded", "aria-modal", "aria-label"],
      answer: 1,
      explain: 'aria-expanded="true" или "false" сообщает текущее состояние раскрывающегося блока.'
    },
    {
      q: "Как правильно проверить HTTP-ошибку (404 или 500) при использовании fetch()?",
      options: ["Через try/catch", "Проверить свойство response.ok", "Через JSON.parse()", "fetch сам выбрасывает ошибку на 404"],
      answer: 1,
      explain: "fetch отклоняет промис только при сбое сети. Для проверки HTTP-статуса используют if (!response.ok)."
    },
    {
      q: "Какой командой фиксируются подготовленные изменения в локальном репозитории Git?",
      options: ["git push", 'git commit -m "сообщение"', "git init", "git add ."],
      answer: 1,
      explain: "git add индексирует файлы, а git commit сохраняет снимок изменений в истории."
    },
    {
      q: "Какую роль выполняет веб-сервер Apache?",
      options: ["Редактирует картинки", "Принимает HTTP-запросы клиентов и отдаёт файлы сайта", "Заменяет язык JavaScript", "Хранит пароли от GitHub"],
      answer: 1,
      explain: "Apache — это HTTP-сервер, который обрабатывает запросы браузера, правила .htaccess и отдаёт страницы."
    },
    {
      q: "Какой файл конфигурации в Apache позволяет настраивать редиректы и страницу ошибки 404 в папке сайта?",
      options: ["package.json", ".htaccess", "index.css", "readme.txt"],
      answer: 1,
      explain: "Файл .htaccess используется для локальной настройки веб-сервера Apache на уровне директории."
    },
    {
      q: "Где сохраняется прогресс прочитанных лекций, чтобы он не пропадал после перезагрузки страницы?",
      options: ["В оперативной памяти", "В localStorage браузера", "В файле style.css", "В теге <title>"],
      answer: 1,
      explain: "localStorage позволяет хранить пары ключ-значение в браузере пользователя между сессиями."
    },
    {
      q: 'Почему на GitHub Pages путь href="/css/style.css" со слешем в начале может не работать?',
      options: ["GitHub запрещает папку css", "Слеш ищет папку в корне домена, а не в подпапке репозитория", "Нужно писать style.css без папки", "Браузеры не читают слеши"],
      answer: 1,
      explain: "На GitHub Pages сайт размещается по адресу user.github.io/repo/, поэтому пути должны быть относительными: css/style.css."
    }
  ];

  var quizCard = $("#quizCard");
  var quizCount = $("#quizCount");
  var quizScore = $("#quizScore");
  var quizBar = $("#quizBar");
  var quizNext = $("#quizNext");
  var quizRestart = $("#quizRestart");
  var qIndex = 0;
  var score = 0;
  var answered = false;
  var finished = false;

  function renderQuiz() {
    if (!quizCard) return;
    finished = false;

    if (qIndex >= quiz.length) {
      finished = true;
      if (quizBar) quizBar.style.width = "100%";
      if (quizCount) quizCount.textContent = "Тест завершён";
      if (quizNext) {
        quizNext.disabled = true;
        quizNext.textContent = "Тест завершён";
      }
      var pct = Math.round((score / quiz.length) * 100);
      quizCard.innerHTML =
        '<div class="quiz-result">' +
          '<div class="result-score">' + score + ' / ' + quiz.length + '</div>' +
          '<h3 style="margin:12px 0 8px;">Результат: ' + pct + '%</h3>' +
          '<p style="color:var(--muted);">Вы успешно прошли проверку по материалам 9-й лекции и всего курса.</p>' +
        '</div>';
      return;
    }

    var item = quiz[qIndex];
    answered = false;
    if (quizCount) quizCount.textContent = "Вопрос " + (qIndex + 1) + " / " + quiz.length;
    if (quizScore) quizScore.textContent = "Верно: " + score;
    if (quizBar) quizBar.style.width = (qIndex / quiz.length) * 100 + "%";

    var optionsHtml = item.options
      .map(function (opt, i) {
        return (
          '<button type="button" class="quiz-opt" data-i="' + i + '">' +
            '<span class="key">' + String.fromCharCode(65 + i) + '</span>' +
            '<span>' + escapeHtml(opt) + '</span>' +
          '</button>'
        );
      })
      .join("");

    quizCard.innerHTML =
      '<div class="quiz-q">' + escapeHtml(item.q) + '</div>' +
      '<div class="quiz-options">' + optionsHtml + '</div>' +
      '<div class="quiz-explain" id="quizExplain"></div>';

    quizCard.querySelectorAll(".quiz-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        var chosen = +btn.dataset.i;
        quizCard.querySelectorAll(".quiz-opt").forEach(function (o, i) {
          o.disabled = true;
          if (i === item.answer) o.classList.add("correct");
        });
        if (chosen === item.answer) {
          score++;
        } else {
          btn.classList.add("wrong");
        }

        var ex = $("#quizExplain");
        if (ex) {
          ex.textContent = item.explain;
          ex.classList.add("show");
        }
        if (quizScore) quizScore.textContent = "Верно: " + score;
        if (quizNext) quizNext.disabled = false;
      });
    });

    if (quizNext) {
      quizNext.disabled = true;
      quizNext.textContent = qIndex === quiz.length - 1 ? "Показать результат ->" : "Следующий вопрос ->";
    }
  }

  if (quizNext) {
    quizNext.addEventListener("click", function () {
      if (!finished && answered) {
        qIndex++;
        renderQuiz();
      }
    });
  }

  if (quizRestart) {
    quizRestart.addEventListener("click", function () {
      qIndex = 0;
      score = 0;
      renderQuiz();
    });
  }

  renderQuiz();
})();
