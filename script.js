/* ================= NAV ================= */
const nav       = document.getElementById('nav');
const navLinks  = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const toTop     = document.getElementById('toTop');
const links     = [...document.querySelectorAll('.nav-links a')];

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
  toTop.classList.toggle('show', window.scrollY > 420);
}, { passive:true });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

links.forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
}));

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin:'-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ================= EFEK KETIK (TYPEWRITER) ================= */
const roles = [
  "Mahasiswa Teknologi Informasi",
  "Network Engineer Enthusiast",
  "Front-End Web Developer",
  "IT Infrastructure Learner"
];

const typedTextSpan = document.getElementById("typed-text");
const typingDelay = 100; // kecepatan mengetik
const erasingDelay = 50; // kecepatan menghapus
const newTextDelay = 2000; // jeda sebelum ganti teks
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < roles[textArrayIndex].length) {
    typedTextSpan.textContent += roles[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = roles[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= roles.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Mulai animasi ketik saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
  if (roles.length) setTimeout(type, newTextDelay + 250);
});

/* ================= REVEAL ================= */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold:.1, rootMargin:'0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ================= COPY EMAIL + TOAST ================= */
const toast    = document.getElementById('toast');
const copyBtn  = document.getElementById('copyBtn');
const emailTxt = document.getElementById('emailText').textContent.trim();
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailTxt);
    showToast('Email disalin ✓');
  } catch {
    showToast('Gagal menyalin, salin manual ya');
  }
});

/* ================= BACK TO TOP ================= */
toTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ================= TAHUN ================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* ================= MODAL PREVIEW SERTIFIKAT ================= */
const certModal = document.getElementById('certModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalIssuer = document.getElementById('modalIssuer');
const modalYear = document.getElementById('modalYear');
const closeModalBtn = document.querySelector('.modal-close');

// Cari semua gambar di dalam kartu sertifikat
document.querySelectorAll('.cert-thumb img').forEach(img => {
  img.addEventListener('click', function() {
    // Jangan buka modal jika gambar kosong/error
    if (this.parentNode.classList.contains('empty')) return;
    
    // Ambil data dari HTML
    const title = this.closest('.cert').querySelector('h4').innerText;
    const issuer = this.closest('.cert').querySelector('.cert-issuer').innerText;
    const year = this.closest('.cert').querySelector('.cert-year').innerText;
    
    // Masukkan data ke dalam modal
    modalImage.src = this.src;
    modalTitle.innerText = title;
    modalIssuer.innerText = issuer;
    modalYear.innerText = year;
    
    // Tampilkan modal & kunci scroll body
    certModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Fungsi untuk menutup modal
function closeCertModal() {
  certModal.classList.remove('show');
  document.body.style.overflow = '';
}

// Tutup saat tombol X diklik
closeModalBtn.addEventListener('click', closeCertModal);

// Tutup saat area luar (background gelap) diklik
certModal.addEventListener('click', function(e) {
  if (e.target === certModal) closeCertModal();
});