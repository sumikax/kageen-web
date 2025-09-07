const navLinks = document.querySelector('.nav-links');

  navLinks.addEventListener('contextmenu', e => e.preventDefault());

  navLinks.querySelectorAll('*').forEach(el => {
    el.setAttribute('draggable', 'false'); // Cegah drag native
    el.addEventListener('dragstart', e => e.preventDefault());
  });

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetID = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetID);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });

          // Ini yang ngapus # dari URL
          history.replaceState(null, '', window.location.pathname);
        }
      });
    });
  });

fetch('./database/top_kgn.json')
    .then(res => res.json())
    .then(data => {
      const members = Object.values(data);
      members.sort((a, b) => b.count - a.count);
      const top3 = members.slice(0, 3);

      const posisiIcon = {
        1: {
          class: 'gold',
          svg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7v3H2v3a5 5 0 005 5h2a3 3 0 006 0h2a5 5 0 005-5V6h-5V3zM4 9V7h3v2a3 3 0 01-3 3zm16 0a3 3 0 01-3 3V7h3v2zM9 18a3 3 0 006 0v-1H9v1zm-1 2h8v1H8v-1z"/>
               </svg>`
        },
        2: {
          class: 'silver',
          svg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#C0C0C0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7v3H2v3a5 5 0 005 5h2a3 3 0 006 0h2a5 5 0 005-5V6h-5V3zM4 9V7h3v2a3 3 0 01-3 3zm16 0a3 3 0 01-3 3V7h3v2zM9 18a3 3 0 006 0v-1H9v1zm-1 2h8v1H8v-1z"/>
               </svg>`
        },
        3: {
          class: 'bronze',
          svg: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#cd7f32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7v3H2v3a5 5 0 005 5h2a3 3 0 006 0h2a5 5 0 005-5V6h-5V3zM4 9V7h3v2a3 3 0 01-3 3zm16 0a3 3 0 01-3 3V7h3v2zM9 18a3 3 0 006 0v-1H9v1zm-1 2h8v1H8v-1z"/>
               </svg>`
        }
      };

      const posisi = [1, 0, 2]; // urutan visual: kiri (top 2), tengah (top 1), kanan (top 3)
      const podium = document.getElementById("topPodium");

      posisi.forEach(i => {
        const m = top3[i];
        if (!m) return;

        const posisiRank = i === 0 ? 2 : (i === 1 ? 1 : 3);
        const icon = posisiIcon[posisiRank];

        const box = document.createElement('div');
        const isTop1 = posisiRank === 1;
        const chibiClass = `chibi-img${isTop1 ? ' chibi-top1' : ''}`;
        box.className = `top-box top-${posisiRank}`;
        box.innerHTML = `
            <div class="chibi-container">
              <img src="./source/top/${posisiRank}.png" alt="Chibi Top ${posisiRank}" class="${chibiClass}" />
            </div>
            <div class="trophy-icon">${icon.svg}</div>
            <p class="nickname">${m.nickname.replace(/᭄/g, '')}</p>
            <p class="username">@${m.username}</p>
            <p class="rank-label">Top ${posisiRank}</p>
          </div>
        `;

        podium.appendChild(box);
      });
    });

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnPengumuman');
  const modal = document.getElementById('pengumumanModal');

  btn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const jelajahBtn = document.querySelector('a[href="#jelajah"]');

  jelajahBtn?.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector('#jelajah');
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('stickyNavbar');
    const jelajahSection = document.querySelector('#jelajah');
    const popupMember = document.getElementById('popupMember');
    const popupDetail = document.getElementById('popupDetail');

    function updateNavbarVisibility() {
      if (!jelajahSection || !navbar) return;

      const jelajahTop = jelajahSection.getBoundingClientRect().top;

      if (popupMember.classList.contains('show')) {
        navbar.classList.remove('show');
      } else {
        navbar.classList.toggle('show', jelajahTop <= 50);
      }
    }

    function tutupPopup(id) {
      const popup = document.getElementById(id);
      if (popup) popup.classList.remove('show');

      const memberMasihTerbuka = popupMember?.classList.contains('show');
      if (!memberMasihTerbuka) {
        document.body.style.overflow = 'auto';
      }

      updateNavbarVisibility();
    }

    function tutupSemuaPopup() {
      tutupPopup('popupMember');
      tutupPopup('popupDetail');
    }

    window.bukaPopup = function(id) {
      const popup = document.getElementById(id);
      if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        navbar.classList.remove('show');
      }
    }

    window.tutupPopup = tutupPopup;
    window.tutupSemuaPopup = tutupSemuaPopup;

    window.addEventListener('scroll', updateNavbarVisibility);

    window.addEventListener('click', e => {
      if (popupMember.classList.contains('show') && e.target === popupMember) {
        tutupSemuaPopup();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && popupMember.classList.contains('show')) {
        tutupSemuaPopup();
      }
    });
  });

window.addEventListener('load', () => {
    const target = document.getElementById('komunitas');
    const container = document.querySelector('.carousel-scroll');
    if (target && container) {
      const offset = target.offsetLeft - (container.offsetWidth / 2) + (target.offsetWidth / 2);
      container.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  });

window.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.carousel-scroll');
    const cards = document.querySelectorAll('.carousel-slide');
    const target = cards[1]; // otomatis ke slide ke-2

    const scrollToCenter = () => {
      const listRect = list.getBoundingClientRect();
      const scrollLeft = target.offsetLeft - (listRect.width / 2) + (target.offsetWidth / 2);
      list.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    };

    setTimeout(scrollToCenter, 200); // delay biar layout-nya kebentuk dulu
  });

function scrollHorizontally(e) {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }

  window.addEventListener('load', () => {  // Tunggu sampai halaman selesai dimuat
    const list = document.querySelector('.admin-list');
    const target = document.querySelector('#ryy');  // Ambil elemen dengan ID 'ryy' (Ryy)
  
    if (target) {
      // Menunggu render pertama untuk memanipulasi posisi scroll
      setTimeout(() => {
        const listRect = list.getBoundingClientRect();
        const scrollLeft = target.offsetLeft - (listRect.width / 2) + (target.offsetWidth / 2);
        list.scrollTo({ left: scrollLeft, behavior: 'auto' });  // scroll langsung ke Ryy
      }, 0);  // Tunggu render pertama, langsung scroll
    } else {
      console.error("Elemen dengan ID 'ryy' tidak ditemukan");
    }
  });

function bukaPopup(id) {
    document.getElementById(id).classList.add('active');
    document.body.classList.add('popup-open');
  }

  function tutupPopup(id) {
    document.getElementById(id).classList.remove('active');
    if (
      !document.getElementById('popupMember').classList.contains('active') &&
      !document.getElementById('popupDetail').classList.contains('active')
    ) {
      document.body.classList.remove('popup-open');
    }
  }

  document.querySelectorAll('.popup-member').forEach(popup => {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        tutupPopup(this.id);
      }
    });
  });

const popup = document.getElementById('popupMember');

  function showPopupMember() {
    popup.classList.add('show');
  }

  function hidePopupMember() {
    popup.classList.remove('show');
  }

  // Tombol buka
  document.getElementById('btnDaftarMember').addEventListener('click', () => {
    showPopupMember();
  });

  // Klik di luar isi popup untuk nutup
  document.addEventListener('click', function (e) {
    const content = popup.querySelector('.popup-content');
    if (e.target === popup && !content.contains(e.target)) {
      hidePopupMember();
    }
  });

const popupMember = document.getElementById("popupMember");
const listMember = document.getElementById("listMember");
const jumlahAnggota = document.getElementById("jumlahAnggota");
const searchInput = document.getElementById("searchMember");
const popupDetail = document.getElementById("popupDetail");
const detailContent = document.getElementById("detailContent");
let memberData = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.getElementById("btnDaftarMember").addEventListener("click", async () => {
  popupMember.classList.add("show");
  listMember.innerHTML = "";
  jumlahAnggota.textContent = "Mengambil data dari Server ...";
  searchInput.value = "";

  try {
    const res = await fetch('./database/daftar_kgn.json');
    const data = await res.json();
    const entries = Object.entries(data);
    memberData = shuffleArray(entries);
    renderList(memberData);
    jumlahAnggota.textContent = `Jumlah member saat ini : ${entries.length}`;
  } catch (e) {
    listMember.innerHTML = "Gagal mendapatkan data :(";
    jumlahAnggota.textContent = "Gagal mendapatkan data :(";
  }
});

function renderList(entries) {
  listMember.innerHTML = "";
  entries.forEach(([id, member]) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.textContent = member.nickname.replace(/᭄/g, '');

    card.onclick = async () => {
      detailContent.innerHTML = `<p style="color:white">Mengambil data dari TikTok ...</p>`;
      try {
        const response = await fetch(`https://api.siputzx.my.id/api/stalk/tiktok?username=${member.username}`);
        const result = await response.json();

        if (result.status && result.data) {
          const user = result.data.user;
          const stats = result.data.statsV2;

          const renderV1 = () => {
            detailContent.innerHTML = `
              <h3>Informasi Member</h3>
              <img src="${user.avatarThumb}" alt="${user.nickname}" style="border-radius:50%;width:80px;height:80px;margin-bottom:10px;">
              <p><strong>${user.nickname.replace(/᭄/g, '')}</strong></p>
              <p>@${user.uniqueId}</p>
              <p>${user.signature || '-'}</p>
              ${user.bioLink?.link ? `<p><a href="${user.bioLink.link}" target="_blank" style="color:#4fc3f7;">${user.bioLink.link}</a></p>` : ''}
              <p>Pengikut : <strong>${(n=>n>=1e6?(n/1e6).toFixed(1).replace('.0','')+' jt':n>=1e3?(n/1e3).toFixed(1).replace('.0','')+' rb':n)(stats.followerCount)}</strong> (${stats.followerCount})</p>
              <p>Mengikuti : <strong>${(n=>n>=1e6?(n/1e6).toFixed(1).replace('.0','')+' jt':n>=1e3?(n/1e3).toFixed(1).replace('.0','')+' rb':n)(stats.followingCount)}</strong> (${stats.followingCount})</p>
              <p>Total Suka : <strong>${(n=>n>=1e6?(n/1e6).toFixed(1).replace('.0','')+' jt':n>=1e3?(n/1e3).toFixed(1).replace('.0','')+' rb':n)(stats.heartCount)}</strong> (${stats.heartCount})</p>
              <p>Total Video : <strong>${stats.videoCount} video</strong></p>

              <div style="text-align:center;margin-top:15px;">
                <button id="goDetailV2" style="background:none;border:none;color:#ffffff;font-size:22px;cursor:pointer;">▸</button>
              </div>
            `;
          };

          renderV1();

          document.addEventListener("click", function switchDetail(e) {
            if (e.target.id === "goDetailV2") {
              detailContent.innerHTML = `
                <h3>Informasi Member</h3>
                <img src="${user.avatarThumb}" alt="${user.nickname}" style="border-radius:50%;width:80px;height:80px;margin-bottom:10px;">
                <p><strong>${user.nickname.replace(/᭄/g, '')}</strong></p>
                <p>@${user.uniqueId}</p>

                <div style="display:flex;justify-content:center;align-items:center;gap:10px;margin-top:10px;">
                  <div style="text-align:center;">
                    <strong>${(n=>n>=1e6?(n/1e6).toFixed(0)+' jt':n>=1e3?(n/1e3).toFixed(0)+' rb':n)(stats.followingCount)}</strong>
                    <div style="font-size:12px;color:#ccc;">Mengikuti</div>
                  </div>
                  
                  <div style="font-size:16px;color:#ccc;">|</div>
                  
                  <div style="text-align:center;">
                    <strong>${(n=>n>=1e6?(n/1e6).toFixed(0)+' jt':n>=1e3?(n/1e3).toFixed(0)+' rb':n)(stats.followerCount)}</strong>
                    <div style="font-size:12px;color:#ccc;">Pengikut</div>
                  </div>
                  
                  <div style="font-size:16px;color:#ccc;">|</div>
                  
                  <div style="text-align:center;">
                    <strong>${(n=>n>=1e6?(n/1e6).toFixed(0)+' jt':n>=1e3?(n/1e3).toFixed(0)+' rb':n)(stats.heartCount)}</strong>
                    <div style="font-size:12px;color:#ccc;">Suka</div>
                  </div>
                </div>

                <p>${user.signature || '-'}</p>
                ${user.bioLink?.link ? `<p><a href="${user.bioLink.link}" target="_blank" style="color:#4fc3f7;">${user.bioLink.link}</a></p>` : ''}
                
                <div style="text-align:center;margin-top:15px;">
                  <button id="goDetailV1" style="background:none;border:none;color:#ffffff;font-size:22px;cursor:pointer;">◂</button>
                </div>
              `;
            }

            if (e.target.id === "goDetailV1") {
              renderV1();
            }
          });

        } else {
          detailContent.innerHTML = `<p style="color:white">Username akun mungkin telah diganti.</p>`;
        }
      } catch (err) {
        detailContent.innerHTML = `<p style="color:white">Gagal mengambil data dari TikTok</p>`;
        console.error(err);
      }

      bukaPopup("popupDetail");
    };

    listMember.appendChild(card);
  });
}

// handler switch antara v1 <-> v2
document.addEventListener("click", (e) => {
  if (e.target.id === "goDetailV2") {
    detailContent.innerHTML = `
      <h3>Halaman Detail v2</h3>
      <p style="color:#ccc;">Isi tambahan, statistik lanjutan, atau data lain di sini.</p>
      <div style="text-align:center;margin-top:15px;">
        <button id="goDetailV1" style="background:none;border:none;color:#4fc3f7;font-size:22px;cursor:pointer;">⬅</button>
      </div>
    `;
  }

  if (e.target.id === "goDetailV1") {
    // balik lagi ke halaman v1, untuk simpel isi placeholder
    detailContent.innerHTML = `
      <h3>Informasi Member</h3>
      <p style="color:#ccc;">Balik ke jendela detail versi 1</p>
      <div style="text-align:center;margin-top:15px;">
        <button id="goDetailV2" style="background:none;border:none;color:#4fc3f7;font-size:22px;cursor:pointer;">➜</button>
      </div>
    `;
  }
});

  // Search filter
  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = memberData.filter(([_, member]) =>
      member.username.toLowerCase().includes(keyword)
    );
    renderList(filtered);
  });

  // Close popups when clicking outside
  popupMember.addEventListener("click", e => {
    if (e.target === popupMember) popupMember.classList.remove("show");
  });
  popupDetail.addEventListener("click", e => {
    if (e.target === popupDetail) popupDetail.classList.remove("show");
  });

fetch('./database/member_kgn.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('growthBars');
    const max = Math.max(...data.map(entry => entry.member));

    data.forEach(entry => {
      const wrapper = document.createElement('div');
      wrapper.className = 'growth-bar';

      const label = document.createElement('div');
      label.className = 'growth-label';
      label.textContent = `${entry.name} ( ${entry.member} member )`;

      const bar = document.createElement('div');
      bar.className = 'growth-bar-fill';
      bar.style.width = `${(entry.member / max) * 100}%`;

      wrapper.appendChild(label);
      wrapper.appendChild(bar);
      container.appendChild(wrapper);
    });
  })
  .catch(err => {
    console.error('Failed to fetch member_kgn.json:', err);
  });

function scrollHorizontally(e) {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-scroll');
    if (carousel) {
      carousel.addEventListener('wheel', scrollHorizontally);
    }
  });

const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  prevBtn?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });
  nextBtn?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  showSlide(current);

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

const timestamp = Date.now();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `style.css?v=${timestamp}`;
  document.head.appendChild(link);

async function loadTopUsers() {
  try {
    // Ambil data dari JSON
    const res = await fetch('./database/user_rank.json');
    const db = await res.json();

    // Ubah jadi array & urutkan berdasarkan chats
    const sortedUsers = Object.entries(db)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.chats - a.chats)
      .slice(0, 10); // cuma ambil top 10

    // Render ke tabel
    const tbody = document.getElementById("user-table");
    tbody.innerHTML = ""; // biar bersih dulu
    sortedUsers.forEach((user, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${user.name || user.id.replace("@s.whatsapp.net", "").replace(/(\d{6})\d+/, "$1xxxxx")}</td>
        <td>${user.chats}</td>
        <td>${user.rank}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Gagal mengambil dari Server!", err);
  }
}

// Panggil function
loadTopUsers();