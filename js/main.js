// Navbar
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navbarDefaultClass = 'navbar-default';
  const navbarFixedClass = 'navbar-fixed';
  const mobileNav = document.querySelector('.mnav');
  const closeBtn = document.querySelector('.mnav__close-btn');
  const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');
  const navOpenedClass = 'left-0';
  const navClosedClass = '-left-[300px]';
  const arrowLeftClass = 'ri-arrow-left-s-line';
  const arrowRightClass = 'ri-arrow-right-s-line';

  // Fix Navbar
  window.addEventListener('scroll', () => {
    if (isDesktop()) {
      if (window.scrollY > 50) {
        navbar.classList.remove(navbarDefaultClass);
        navbar.classList.add(navbarFixedClass);
      } else {
        navbar.classList.remove(navbarFixedClass);
        navbar.classList.add(navbarDefaultClass);
      }
    } else {
      navbar.classList.remove(navbarFixedClass);
      navbar.classList.add(navbarDefaultClass);
    }
  });

  // Fungsi cek lebar layar
  function isDesktop() {
    return window.innerWidth > 767;
  }

  // Mobile Navbar
  closeBtn.addEventListener('click', () => {
    if (mobileNav.classList.contains(navClosedClass)) {
      mobileNav.classList.remove(navClosedClass);
      mobileNav.classList.add(navOpenedClass);
    } else {
      mobileNav.classList.remove(navOpenedClass);
      mobileNav.classList.add(navClosedClass);
    }

    closeBtnIcn.classList.toggle(arrowLeftClass);
    closeBtnIcn.classList.toggle(arrowRightClass);
  });
});

//Definisi Organ
document.addEventListener('DOMContentLoaded', function () {
  const sistemOrganSelect = document.getElementById('sistem-organ');
  const namaOrganSelect = document.getElementById('nama-organ');
  const cariSekarangButton = document.getElementById('cari-sekarang');
  const gambarPenunjang = document.getElementById('gambar-penunjang');
  const deskripsiPenjelasan = document.getElementById('deskripsi-penjelasan');

  const organSystems = {
    'sistem-saraf': ['Otak', 'Sumsum Tulang Belakang', 'Saraf Perifer', 'Otonom', 'Neuron'],
    'sistem-endokrin': ['Kelenjar Hipofisis', 'Kelenjar Tiroid', 'Kelenjar Paratiroid', 'Kelenjar Adrenal', 'Pankreas', 'Gonad', 'Kelenjar Pineal', 'Kelenjar Timus'],
    'sistem-pencernaan': ['Mulut', 'Kerongkongan', 'Lambung', 'Usus Halus', 'Usus Besar', 'Hati', 'Pankreas', 'Kantong Empedu', 'Rektum', 'Anus'],
    'sistem-pernapasan': ['Hidung', 'Faring', 'Laring', 'Trakea', 'Bronkus', 'Paru-Paru', 'Diafragma'],
    'sistem-peredaran-darah': ['Jantung', 'Arteri', 'Vena', 'Kapiler'],
    'sistem-limfatik': ['Kelenjar Getah Bening', 'Limpa', 'Pembuluh Limfatik', 'Tonsil', 'Adenoid', 'Timos', 'Sumsum Tulang'],
    'sistem-muskuloskeletal': ['Tulang', 'Otot', 'Sendi', 'Tendon', 'Ligamen'],
    'sistem-integumen': ['Kulit', 'Rambut', 'Kuku', 'Kelenjar Keringat', 'Kelenjar Minyak'],
    'sistem-ekskresi': ['Ginjal', 'Ureter', 'Kandung Kemih', 'Uretra'],
    'sistem-reproduksi': ['Testis', 'Penis', 'Vesikula Seminalis', 'Prostat', 'Vas Deferens', 'Ovarium', 'Tuba Falopi', 'Uterus', 'Vagina'],
    'sistem-imun': ['Kelenjar Getah Bening', 'Limpa', 'Tonsil', 'Timos', 'Sumsum Tulang', 'Sel Darah Putih'],
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Set default teks
    deskripsiPenjelasan.textContent = 'Pilih sistem organ dan nama organ untuk melihat penjelasan.';
    gambarPenunjang.src = '';

    // Set default option
    namaOrganSelect.innerHTML = '<option value="">Pilih Nama Organ</option>';
  });

  sistemOrganSelect.addEventListener('change', function () {
    const selectedSystem = this.value;

    // Reset dropdown nama organ
    namaOrganSelect.innerHTML = '<option value="">Pilih Nama Organ</option>';

    if (organSystems[selectedSystem]) {
      organSystems[selectedSystem].forEach((organ) => {
        const option = document.createElement('option');
        option.value = organ.toLowerCase().replace(/ /g, '-');
        option.textContent = organ;
        namaOrganSelect.appendChild(option);
      });
    } else {
      // Jika sistem organ belum dipilih, hapus semua opsi selain "Pilih Nama Organ"
      namaOrganSelect.innerHTML = '<option value="">Pilih Nama Organ</option>';
    }
  });

  cariSekarangButton.addEventListener('click', function () {
    const selectedSistem = sistemOrganSelect.value;
    const selectedOrgan = namaOrganSelect.value;

    if (selectedSistem) {
      if (selectedOrgan === '') {
        // Display general description for the selected organ system
        deskripsiPenjelasan.textContent = getSystemDescription(selectedSistem);
        gambarPenunjang.src = `assets/img/definisi/sistem/${selectedSistem}.png`;
      } else {
        // Display specific description for the selected organ
        deskripsiPenjelasan.textContent = getOrganDescription(selectedSistem, selectedOrgan);
        gambarPenunjang.src = `assets/img/definisi/organ/${selectedOrgan}.png`;
      }
    } else {
      deskripsiPenjelasan.textContent = 'Pilih sistem organ dan nama organ untuk melihat penjelasan.';
      gambarPenunjang.src = '';
    }
  });

  function getSystemDescription(system) {
    const descriptions = {
      'sistem-saraf': 'Sistem saraf adalah jaringan kompleks sel-sel khusus yang mengkoordinasikan tindakan dan mengirimkan sinyal antara berbagai bagian tubuh.',
      'sistem-endokrin': 'Sistem endokrin terdiri dari kelenjar yang memproduksi dan melepaskan hormon ke dalam aliran darah untuk mengatur berbagai fungsi tubuh.',
      'sistem-pencernaan': 'Sistem pencernaan bertanggung jawab untuk memecah makanan, menyerap nutrisi, dan mengeluarkan sisa makanan dari tubuh.',
      'sistem-pernapasan': 'Sistem pernapasan memungkinkan pertukaran oksigen dan karbon dioksida antara tubuh dan lingkungan melalui paru-paru.',
      'sistem-peredaran-darah': 'Sistem peredaran darah bertugas mengedarkan darah yang membawa oksigen, nutrisi, dan hormon ke seluruh tubuh melalui jantung dan pembuluh darah.',
      'sistem-limfatik': 'Sistem limfatik membantu melindungi tubuh dari infeksi dengan mengangkut cairan limfa, mengandung sel-sel imun, dan membuang limbah.',
      'sistem-muskuloskeletal': 'Sistem muskuloskeletal mendukung tubuh, memungkinkan gerakan, dan melindungi organ vital melalui kombinasi tulang, otot, dan sendi.',
      'sistem-integumen': 'Sistem integumen meliputi kulit, rambut, dan kuku yang melindungi tubuh dari kerusakan eksternal, serta membantu dalam regulasi suhu.',
      'sistem-ekskresi': 'Sistem ekskresi bertanggung jawab untuk mengeluarkan produk limbah dari darah dan menjaga keseimbangan cairan serta elektrolit dalam tubuh.',
      'sistem-reproduksi': 'Sistem reproduksi memungkinkan manusia untuk berkembang biak dan menghasilkan keturunan, terdiri dari organ reproduksi pria dan wanita.',
      'sistem-imun': 'Sistem imun melindungi tubuh dari patogen seperti bakteri, virus, dan zat berbahaya lainnya melalui berbagai sel dan mekanisme pertahanan.',
    };

    return descriptions[system] || 'Deskripsi tidak tersedia.';
  }

  function getOrganDescription(system, organ) {
    const descriptions = {
      'sistem-saraf': {
        otak: 'Otak adalah pusat kendali utama sistem saraf yang mengatur semua fungsi tubuh dan aktivitas mental. Terdiri dari miliaran neuron yang saling berinteraksi, otak mengoordinasikan tindakan sukarela dan tidak sukarela seperti berpikir, belajar, emosi, gerakan otot, serta fungsi organ-organ vital seperti detak jantung dan pernapasan. Otak juga berperan dalam memproses informasi sensorik yang diterima dari seluruh tubuh, membantu kita memahami dunia di sekitar kita. Selain itu, otak terbagi menjadi beberapa bagian, termasuk otak besar (cerebrum), otak kecil (cerebellum), dan batang otak, yang masing-masing memiliki fungsi spesifik.',
        'sumsum-tulang-belakang':
          'Sumsum tulang belakang adalah bagian dari sistem saraf pusat yang menghubungkan otak dengan saraf-saraf di seluruh tubuh. Ini adalah jalur utama yang membawa sinyal antara otak dan tubuh, memungkinkan kontrol gerakan dan respons terhadap rangsangan. Sumsum tulang belakang juga berperan dalam refleks, yang merupakan respons cepat dan otomatis terhadap rangsangan tanpa keterlibatan otak secara langsung. Kerusakan pada sumsum tulang belakang dapat menyebabkan gangguan serius pada fungsi motorik dan sensorik, termasuk kelumpuhan.',
        'saraf-perifer':
          'Saraf perifer adalah jaringan saraf di luar otak dan sumsum tulang belakang yang menghubungkan sistem saraf pusat dengan anggota tubuh. Saraf-saraf ini bertanggung jawab untuk membawa sinyal dari otak dan sumsum tulang belakang ke otot-otot, kulit, dan organ-organ tubuh lainnya, serta mengirimkan informasi sensorik kembali ke otak. Sistem saraf perifer terdiri dari saraf somatik yang mengontrol gerakan sukarela dan saraf otonom yang mengatur fungsi tubuh yang tidak disengaja seperti pencernaan dan detak jantung.',
        otonom:
          "Sistem saraf otonom mengatur fungsi tubuh yang tidak disengaja seperti detak jantung, pencernaan, dan pernapasan. Sistem ini bekerja di bawah kesadaran kita, mengendalikan fungsi vital yang diperlukan untuk kelangsungan hidup tanpa perlu kita sadari. Sistem saraf otonom dibagi menjadi dua bagian, yaitu sistem saraf simpatik yang berperan dalam respon 'fight or flight', dan sistem saraf parasimpatik yang membantu tubuh beristirahat dan mencerna makanan.",
        neuron:
          'Neuron adalah sel-sel saraf yang mengirimkan dan menerima sinyal listrik di seluruh tubuh. Setiap neuron terdiri dari badan sel, dendrit yang menerima sinyal dari neuron lain, dan akson yang mengirimkan sinyal ke neuron lain atau ke otot. Neuron berkomunikasi melalui sinapsis, di mana neurotransmitter dilepaskan untuk menyampaikan pesan dari satu neuron ke neuron lainnya. Fungsi neuron yang efisien sangat penting untuk berbagai proses tubuh, mulai dari gerakan otot hingga pengolahan informasi di otak.',
      },
      'sistem-endokrin': {
        'kelenjar-hipofisis':
          "Kelenjar hipofisis adalah 'master gland' yang mengontrol kelenjar endokrin lainnya dan memproduksi berbagai hormon penting. Terletak di dasar otak, kelenjar ini mengeluarkan hormon yang mengatur pertumbuhan, metabolisme, fungsi reproduksi, dan keseimbangan air dalam tubuh. Kelenjar hipofisis memiliki dua lobus, yaitu lobus anterior yang menghasilkan hormon seperti hormon pertumbuhan (GH) dan prolaktin, serta lobus posterior yang menyimpan dan melepaskan hormon seperti oksitosin dan vasopresin.",
        'kelenjar-tiroid':
          'Kelenjar tiroid menghasilkan hormon yang mengatur metabolisme, pertumbuhan, dan perkembangan tubuh. Hormon tiroid, terutama tiroksin (T4) dan triiodotironin (T3), berperan penting dalam mengontrol seberapa cepat tubuh membakar kalori, menjaga suhu tubuh, serta mengatur detak jantung. Kelenjar tiroid terletak di leher, di bawah jakun, dan memiliki bentuk seperti kupu-kupu. Gangguan pada kelenjar tiroid, seperti hipotiroidisme atau hipertiroidisme, dapat berdampak signifikan pada kesehatan secara keseluruhan.',
        'kelenjar-paratiroid':
          'Kelenjar paratiroid mengatur kadar kalsium dalam darah dan tulang melalui produksi hormon paratiroid (PTH). Kalsium adalah mineral penting yang berperan dalam kontraksi otot, pembekuan darah, dan fungsi saraf. Kelenjar ini terletak di belakang kelenjar tiroid dan biasanya berjumlah empat. Ketidakseimbangan hormon paratiroid dapat menyebabkan kondisi seperti hiperkalsemia (kadar kalsium tinggi dalam darah) atau hipokalsemia (kadar kalsium rendah), yang masing-masing dapat mempengaruhi berbagai fungsi tubuh.',
        'kelenjar-adrenal':
          "Kelenjar adrenal menghasilkan hormon yang membantu tubuh merespons stres dan mengatur metabolisme. Terletak di atas ginjal, kelenjar adrenal terdiri dari dua bagian: korteks adrenal yang memproduksi hormon seperti kortisol dan aldosteron, dan medula adrenal yang memproduksi adrenalin dan noradrenalin. Hormon-hormon ini berperan dalam respon 'fight or flight', mengatur tekanan darah, metabolisme gula, serta keseimbangan garam dan air dalam tubuh.",
        pankreas:
          'Pankreas memiliki fungsi ganda sebagai bagian dari sistem endokrin dan pencernaan. Sebagai kelenjar endokrin, pankreas menghasilkan hormon insulin dan glukagon yang mengatur kadar gula darah. Insulin menurunkan kadar gula darah dengan membantu sel-sel tubuh menyerap glukosa, sementara glukagon meningkatkan kadar gula darah dengan merangsang hati untuk melepaskan glukosa yang disimpan. Ketidakseimbangan produksi hormon ini dapat menyebabkan kondisi seperti diabetes mellitus.',
        gonad:
          'Gonad, yaitu testis pada pria dan ovarium pada wanita, adalah kelenjar kelamin yang menghasilkan hormon seks dan sel-sel reproduksi. Pada pria, testis menghasilkan hormon testosteron yang penting untuk perkembangan karakteristik seksual pria dan produksi sperma. Pada wanita, ovarium menghasilkan hormon estrogen dan progesteron yang mengatur siklus menstruasi dan mendukung kehamilan. Fungsi gonad sangat penting untuk reproduksi dan perkembangan seksual.',
        'kelenjar-pineal':
          'Kelenjar pineal menghasilkan hormon melatonin yang mengatur siklus tidur dan bangun tubuh. Melatonin diproduksi dalam jumlah yang lebih tinggi saat malam hari, membantu tubuh untuk merasa mengantuk dan bersiap tidur. Kelenjar pineal terletak di dalam otak, tepat di tengah-tengah antara kedua belahan otak. Gangguan pada produksi melatonin dapat menyebabkan masalah tidur seperti insomnia atau gangguan tidur lainnya.',
        'kelenjar-timus':
          'Kelenjar timus berperan dalam perkembangan sistem kekebalan tubuh, terutama dalam produksi sel T, yang merupakan jenis sel darah putih yang penting dalam melawan infeksi. Kelenjar ini paling aktif selama masa kanak-kanak dan remaja, dan mulai menyusut setelah pubertas. Sel T yang diproduksi di timus berperan dalam mengenali dan menghancurkan sel-sel yang terinfeksi virus atau sel kanker, menjadikan timus penting untuk imunitas adaptif.',
      },
      'sistem-pencernaan': {
        mulut:
          'Mulut adalah tempat awal dari sistem pencernaan, di mana makanan dipecah secara mekanis oleh gigi dan secara kimiawi oleh air liur. Gigi berfungsi untuk menggiling dan menghaluskan makanan, sementara air liur yang mengandung enzim amilase mulai memecah karbohidrat. Proses ini menciptakan bolus, yaitu massa makanan yang lebih mudah dicerna ketika melewati saluran pencernaan selanjutnya. Selain itu, lidah membantu mengaduk makanan dan mendorongnya ke belakang menuju kerongkongan.',
        kerongkongan:
          'Kerongkongan adalah tabung otot yang menghubungkan mulut dengan lambung, menggerakkan makanan melalui gerakan peristaltik. Peristaltik adalah kontraksi otot yang berirama yang mendorong bolus makanan turun ke lambung. Di ujung bawah kerongkongan, terdapat sfingter esofagus bawah yang mencegah makanan dan asam lambung naik kembali ke kerongkongan, yang bisa menyebabkan kondisi seperti refluks asam. Kerongkongan memainkan peran penting dalam memastikan makanan mencapai lambung untuk dicerna lebih lanjut.',
        lambung:
          'Lambung adalah organ yang mencerna makanan secara mekanis dan kimiawi dengan bantuan asam lambung dan enzim. Ketika makanan masuk ke lambung, asam klorida dan enzim pepsin mulai memecah protein menjadi molekul yang lebih kecil, sementara kontraksi otot lambung membantu mencampur makanan dengan cairan pencernaan. Lambung juga bertindak sebagai penyimpanan sementara makanan sebelum diteruskan ke usus halus untuk penyerapan lebih lanjut. Selain pencernaan, lambung juga membantu membunuh patogen yang masuk bersama makanan melalui keasaman tinggi yang dihasilkan.',
        'usus-halus':
          'Usus halus adalah tempat utama penyerapan nutrisi dari makanan yang telah dicerna. Setelah makanan diproses di lambung, nutrisi penting seperti vitamin, mineral, karbohidrat, protein, dan lemak diserap melalui dinding usus halus yang sangat berlipat dan ditutupi dengan vili mikroskopis. Vili ini meningkatkan luas permukaan usus, memungkinkan penyerapan maksimal nutrisi ke dalam aliran darah. Usus halus terbagi menjadi tiga bagian: duodenum, jejunum, dan ileum, masing-masing dengan peran spesifik dalam pencernaan dan penyerapan.',
        'usus-besar':
          'Usus besar berfungsi menyerap air dan garam dari sisa makanan yang tidak dapat dicerna dan membentuk tinja. Setelah penyerapan nutrisi di usus halus, sisa-sisa yang tidak dicerna dialirkan ke usus besar di mana air dan elektrolit diserap untuk menjaga keseimbangan cairan tubuh. Usus besar juga berperan dalam fermentasi bahan makanan yang tidak tercerna oleh bakteri usus, yang menghasilkan gas dan beberapa vitamin yang diserap tubuh. Bagian akhir dari usus besar, rektum, berfungsi sebagai tempat penyimpanan sementara tinja sebelum dikeluarkan melalui anus.',
        hati: 'Hati adalah organ vital yang berperan dalam berbagai fungsi penting, termasuk produksi empedu yang membantu mencerna lemak. Empedu yang diproduksi oleh hati disimpan di kantong empedu dan dilepaskan ke usus halus untuk membantu pemecahan lemak menjadi asam lemak yang lebih mudah diserap. Selain itu, hati juga bertindak sebagai filter untuk menyaring racun dari darah, memetabolisme obat-obatan, dan memproduksi protein penting seperti albumin dan faktor pembekuan darah. Hati juga menyimpan glikogen sebagai cadangan energi dan mengatur kadar gula darah.',
        'pankreas-pencernaan':
          'Pankreas menghasilkan enzim yang diperlukan untuk mencerna makanan dalam usus halus. Enzim-enzim ini, termasuk amilase, lipase, dan protease, dilepaskan ke duodenum, bagian pertama dari usus halus, di mana mereka membantu memecah karbohidrat, lemak, dan protein menjadi molekul yang lebih kecil yang dapat diserap tubuh. Selain itu, pankreas juga menghasilkan bikarbonat yang menetralkan asam lambung di usus halus, menciptakan lingkungan yang optimal untuk aktivitas enzim pencernaan.',
        'kantong-empedu':
          'Kantong empedu adalah organ kecil yang berfungsi menyimpan dan melepaskan empedu yang diproduksi oleh hati. Empedu sangat penting untuk mencerna lemak dalam makanan; ketika makanan berlemak masuk ke usus halus, kantong empedu berkontraksi untuk melepaskan empedu melalui saluran empedu ke usus. Empedu membantu mengemulsi lemak, memecahnya menjadi tetesan kecil yang dapat dicerna oleh enzim lipase. Masalah pada kantong empedu, seperti batu empedu, dapat mengganggu pencernaan dan menyebabkan rasa sakit yang signifikan.',
        rektum:
          'Rektum adalah bagian akhir dari usus besar yang menyimpan tinja sebelum dikeluarkan dari tubuh. Setelah usus besar menyerap air dari sisa makanan, sisa tersebut berubah menjadi tinja yang dikumpulkan di rektum. Ketika rektum penuh, sinyal saraf dikirim ke otak yang memberi tahu tubuh untuk buang air besar. Rektum juga memiliki otot sfingter yang mengontrol pengeluaran tinja, memungkinkan proses pengeluaran yang teratur dan terkendali.',
        anus: 'Anus adalah lubang di akhir saluran pencernaan yang digunakan untuk mengeluarkan tinja dari tubuh. Anus terdiri dari dua otot sfingter yang bekerja bersama untuk mengontrol buang air besar. Sfingter internal bekerja secara otomatis, sementara sfingter eksternal dapat dikendalikan secara sadar untuk menahan atau melepaskan tinja. Anus juga memiliki sensor yang memberikan informasi kepada otak apakah isi rektum adalah gas, cairan, atau padatan, sehingga tubuh dapat merespons dengan tepat.',
      },
      'sistem-pernapasan': {
        hidung:
          'Hidung adalah saluran masuk utama udara ke dalam tubuh, di mana udara disaring, dilembabkan, dan dihangatkan. Hidung dilapisi dengan rambut-rambut kecil dan selaput lendir yang membantu menangkap debu, kotoran, dan mikroorganisme sebelum udara masuk lebih jauh ke dalam saluran pernapasan. Selain itu, hidung juga mengandung struktur yang disebut conchae, yang meningkatkan permukaan untuk pemanasan dan pelembaban udara yang dihirup. Fungsi penciuman juga merupakan bagian penting dari hidung, dengan reseptor olfaktori yang mendeteksi bau.',
        faring:
          'Faring adalah saluran yang menghubungkan hidung dan mulut dengan laring dan esofagus. Faring berfungsi sebagai jalur untuk udara dan makanan, memisahkan jalur udara ke laring dan jalur makanan ke esofagus. Faring juga berperan dalam mekanisme menelan, di mana otot-otot faring berkontraksi untuk membantu mendorong makanan ke esofagus. Selain itu, faring berfungsi sebagai resonator suara, membantu memperkuat suara yang dihasilkan oleh pita suara di laring.',
        laring:
          'Laring, atau kotak suara, adalah tempat di mana pita suara berada dan berperan dalam pernapasan dan berbicara. Laring terletak di antara faring dan trakea dan berfungsi sebagai pintu gerbang ke saluran pernapasan bagian bawah. Saat berbicara, pita suara bergetar ketika udara melewati mereka, menghasilkan suara. Laring juga memiliki epiglotis, sebuah flap yang menutup selama menelan untuk mencegah makanan dan cairan masuk ke saluran pernapasan, mengarahkan mereka ke esofagus.',
        trakea:
          'Trakea adalah saluran udara utama yang menghubungkan laring ke bronkus di paru-paru. Trakea dilapisi dengan cincin-cincin tulang rawan yang mencegahnya kolaps dan memastikan jalur udara tetap terbuka selama pernapasan. Dinding trakea juga dilapisi dengan selaput lendir dan silia yang membantu menyaring debu dan partikel asing, mendorong mereka keluar dari saluran pernapasan. Trakea bercabang menjadi dua bronkus utama, yang masing-masing menuju ke salah satu paru-paru.',
        bronkus:
          'Bronkus adalah cabang dari trakea yang membawa udara masuk dan keluar dari paru-paru. Setiap bronkus utama bercabang menjadi bronkus yang lebih kecil di dalam paru-paru, membentuk pohon bronkial yang mengarahkan udara ke alveoli, di mana pertukaran gas terjadi. Bronkus juga dilapisi dengan lapisan lendir dan silia yang berfungsi untuk menangkap dan mengeluarkan partikel asing dari saluran pernapasan. Kontraksi dan relaksasi otot-otot di dinding bronkus mengatur aliran udara, yang bisa dipengaruhi oleh kondisi seperti asma.',
        'paru-paru':
          'Paru-paru adalah organ utama pernapasan yang melakukan pertukaran oksigen dan karbon dioksida dengan darah. Paru-paru terdiri dari jutaan alveoli, kantung udara kecil yang dikelilingi oleh kapiler darah. Ketika kita menghirup udara, oksigen masuk ke alveoli dan berpindah ke dalam darah, sementara karbon dioksida dari darah dipindahkan ke alveoli untuk dikeluarkan saat kita menghembuskan napas. Paru-paru juga berperan dalam mengatur keseimbangan pH darah dengan mengontrol kadar karbon dioksida melalui proses pernapasan.',
        diafragma:
          'Diafragma adalah otot besar yang terletak di bawah paru-paru dan memainkan peran utama dalam pernapasan. Ketika diafragma berkontraksi, ia bergerak ke bawah, memperluas rongga dada dan menciptakan ruang yang lebih besar untuk paru-paru, sehingga udara bisa masuk. Sebaliknya, ketika diafragma relaksasi, ia naik ke posisi semula, membantu mendorong udara keluar dari paru-paru. Diafragma juga berperan dalam fungsi tubuh lainnya, seperti membantu proses pencernaan dengan memberikan tekanan pada organ perut saat berkontraksi.',
      },
      'sistem-peredaran-darah': {
        jantung:
          'Jantung adalah organ yang memompa darah ke seluruh tubuh, membawa oksigen dan nutrisi ke sel-sel tubuh. Jantung terdiri dari empat ruang: dua atrium di bagian atas dan dua ventrikel di bagian bawah. Darah yang terdeoksigenasi dari tubuh masuk ke atrium kanan, kemudian dipompa ke ventrikel kanan dan dikirim ke paru-paru untuk mendapatkan oksigen. Darah yang teroksigenasi kemudian kembali ke atrium kiri, dipompa ke ventrikel kiri, dan didistribusikan ke seluruh tubuh melalui arteri. Fungsi jantung yang efisien sangat penting untuk menjaga kelangsungan hidup dan kesehatan seluruh tubuh.',
        arteri:
          'Arteri adalah pembuluh darah yang membawa darah beroksigen dari jantung ke seluruh tubuh. Arteri memiliki dinding yang tebal dan elastis yang mampu menahan tekanan tinggi yang dihasilkan oleh jantung saat memompa darah. Pembuluh arteri utama adalah aorta, yang bercabang menjadi arteri yang lebih kecil yang mengantarkan darah ke organ dan jaringan tubuh. Arteri juga berperan dalam mengatur tekanan darah melalui kontraksi dan relaksasi otot di dinding arteri, yang memengaruhi resistensi aliran darah.',
        vena: 'Vena adalah pembuluh darah yang membawa darah terdeoksigenasi kembali ke jantung. Vena memiliki dinding yang lebih tipis dibandingkan arteri dan mengandung katup untuk mencegah aliran balik darah, memastikan bahwa darah mengalir menuju jantung. Vena cava superior dan inferior adalah dua vena utama yang membawa darah dari bagian atas dan bawah tubuh ke atrium kanan jantung. Karena tekanan darah di dalam vena lebih rendah, mereka bergantung pada kontraksi otot rangka di sekitar mereka untuk membantu menggerakkan darah kembali ke jantung.',
        kapiler:
          'Kapiler adalah pembuluh darah kecil yang memungkinkan pertukaran oksigen, nutrisi, dan limbah antara darah dan jaringan tubuh. Dinding kapiler sangat tipis, hanya terdiri dari satu lapisan sel, yang memungkinkan difusi zat dengan mudah antara darah dan cairan jaringan. Kapiler menghubungkan arteriol dan venula, dan jaringan kapiler yang luas di seluruh tubuh memastikan bahwa setiap sel mendapatkan pasokan darah yang cukup. Pertukaran gas dan zat nutrisi yang terjadi di kapiler adalah kunci untuk mendukung fungsi metabolisme seluler.',
      },
      'sistem-limfatik': {
        'kelenjar-getah-bening':
          'Kelenjar getah bening adalah struktur kecil berbentuk kacang yang menyaring limfa dan membantu melawan infeksi dengan memproduksi sel-sel darah putih. Kelenjar ini tersebar di seluruh tubuh dan terhubung oleh pembuluh limfatik. Saat limfa mengalir melalui kelenjar getah bening, patogen seperti bakteri dan virus terperangkap dan dihancurkan oleh limfosit, yaitu sel darah putih khusus. Kelenjar getah bening juga berperan dalam pemantauan dan pengaturan respon imun, yang penting untuk melindungi tubuh dari penyakit.',
        limpa:
          'Limpa adalah organ yang terletak di sisi kiri atas perut yang membantu membersihkan darah dari sel-sel darah merah tua dan mendukung fungsi sistem kekebalan tubuh. Limpa berfungsi sebagai filter darah, menghancurkan sel-sel darah yang sudah tua atau rusak dan mendaur ulang komponennya seperti zat besi. Selain itu, limpa menyimpan sel darah putih dan trombosit, serta membantu tubuh melawan infeksi dengan memproduksi antibodi. Meskipun tidak esensial untuk kelangsungan hidup, limpa memainkan peran penting dalam menjaga kesehatan darah dan kekebalan tubuh.',
        'pembuluh-limfatik':
          'Pembuluh limfatik adalah jaringan yang mengangkut cairan limfa ke seluruh tubuh, membantu menghilangkan racun dan limbah dari jaringan tubuh. Pembuluh ini mengumpulkan cairan interstitial yang bocor dari kapiler darah dan mengembalikannya ke aliran darah melalui pembuluh besar seperti duktus toraks dan duktus limfatik kanan. Selain itu, pembuluh limfatik juga berfungsi dalam penyerapan lemak dari usus melalui pembuluh khusus yang disebut lacteal. Sistem limfatik bekerja seiring dengan sistem peredaran darah untuk menjaga keseimbangan cairan dalam tubuh.',
        tonsil:
          'Tonsil adalah kelenjar limfatik di tenggorokan yang membantu melawan infeksi dengan memproduksi antibodi. Tonsil terletak di kedua sisi bagian belakang tenggorokan dan berfungsi sebagai garis pertahanan pertama melawan patogen yang masuk melalui mulut atau hidung. Tonsil mengandung sel-sel imun yang mampu mengenali dan menghancurkan bakteri serta virus, sehingga mencegah penyebaran infeksi ke bagian tubuh lainnya. Namun, tonsil juga dapat terinfeksi sendiri, yang menyebabkan kondisi seperti tonsilitis.',
        adenoid:
          'Adenoid adalah kelenjar limfatik yang terletak di belakang hidung yang membantu melawan infeksi pada anak-anak. Adenoid, bersama dengan tonsil, membentuk bagian dari cincin limfatik Waldeyer yang melindungi saluran napas atas dari patogen. Adenoid aktif selama masa kanak-kanak, tapi biasanya menyusut setelah pubertas. Adenoid yang membesar dapat menyebabkan masalah pernapasan dan seringkali diangkat melalui prosedur bedah jika menimbulkan komplikasi.',
        timos:
          'Timos adalah kelenjar yang berperan penting dalam pengembangan sistem kekebalan tubuh pada masa anak-anak. Timos adalah tempat di mana sel T, jenis sel darah putih yang penting untuk imunitas adaptif, matang dan berkembang sebelum beredar ke seluruh tubuh. Fungsi timos sangat aktif selama masa kanak-kanak dan remaja, dan kemudian mulai menyusut dan digantikan oleh jaringan lemak setelah pubertas. Sel T yang matang dari timos memainkan peran kunci dalam mengenali dan melawan patogen serta sel-sel yang terinfeksi.',
        'sumsum-tulang-limfatik':
          'Sumsum tulang adalah jaringan yang ditemukan di dalam tulang dan bertanggung jawab untuk memproduksi sel darah putih, yang penting untuk fungsi sistem kekebalan tubuh. Selain memproduksi sel darah merah dan trombosit, sumsum tulang menghasilkan berbagai jenis sel darah putih seperti limfosit, yang memainkan peran utama dalam pertahanan tubuh melawan infeksi. Sumsum tulang juga berfungsi sebagai tempat awal bagi perkembangan sel B dan sel T, yang kemudian akan matang di organ limfatik lainnya seperti timos.',
      },
      'sistem-muskuloskeletal': {
        tulang:
          'Tulang adalah struktur keras yang membentuk kerangka tubuh, melindungi organ dalam, dan mendukung gerakan. Tulang juga berfungsi sebagai tempat penyimpanan mineral seperti kalsium dan fosfor, serta sebagai tempat produksi sel darah merah dan putih di sumsum tulang. Kerangka manusia terdiri dari lebih dari 200 tulang yang bekerja bersama untuk memberikan dukungan struktural dan memungkinkan pergerakan. Tulang terus mengalami proses perombakan dan pembentukan ulang sepanjang hidup, yang memungkinkan perbaikan kerusakan dan adaptasi terhadap stres fisik.',
        otot: 'Otot adalah jaringan yang memungkinkan pergerakan tubuh melalui kontraksi dan relaksasi. Otot bekerja dengan menarik tulang-tulang yang terhubung melalui tendon, menciptakan gerakan pada sendi. Selain itu, otot juga memainkan peran penting dalam mempertahankan postur, menghasilkan panas tubuh melalui proses termogenesis, dan membantu sirkulasi darah melalui kontraksi ritmis otot jantung dan otot rangka. Tubuh manusia memiliki tiga jenis otot: otot rangka yang mengendalikan gerakan sukarela, otot jantung yang mengendalikan detak jantung, dan otot polos yang mengendalikan fungsi organ dalam.',
        sendi:
          'Sendi adalah titik pertemuan antara dua tulang yang memungkinkan gerakan yang fleksibel. Sendi diklasifikasikan berdasarkan jenis gerakannya, seperti sendi bola dan soket yang memungkinkan gerakan rotasi (misalnya bahu), atau sendi engsel yang memungkinkan gerakan seperti membuka dan menutup (misalnya lutut dan siku). Sendi dilapisi dengan tulang rawan untuk mengurangi gesekan dan dilindungi oleh kapsul sendi serta cairan sinovial yang berfungsi sebagai pelumas. Gangguan pada sendi, seperti arthritis, dapat mengurangi mobilitas dan menyebabkan rasa sakit.',
        tendon:
          'Tendon adalah jaringan yang menghubungkan otot ke tulang dan membantu dalam pergerakan. Tendon mentransmisikan gaya yang dihasilkan oleh kontraksi otot ke tulang, sehingga menyebabkan gerakan pada sendi. Tendon terbuat dari serat kolagen yang sangat kuat, memberikan kekuatan dan fleksibilitas yang dibutuhkan untuk menahan tegangan selama aktivitas fisik. Meskipun kuat, tendon dapat mengalami cedera seperti tendinitis atau robekan akibat penggunaan berlebihan atau trauma langsung.',
        ligamen:
          'Ligamen adalah jaringan yang menghubungkan tulang ke tulang lain di dalam sendi, memberikan stabilitas. Ligamen berfungsi untuk menahan tulang-tulang dalam posisi yang benar dan mencegah gerakan yang berlebihan yang dapat menyebabkan cedera. Ligamen terdiri dari serat kolagen yang padat dan elastis, memungkinkan mereka untuk menahan tegangan sambil tetap fleksibel. Cedera pada ligamen, seperti robekan atau peregangan berlebihan, dapat menyebabkan instabilitas sendi dan memerlukan waktu pemulihan yang panjang.',
      },
      'sistem-integumen': {
        kulit:
          'Kulit adalah organ terbesar tubuh yang melindungi dari kerusakan eksternal, mengatur suhu, dan menghalangi infeksi. Kulit terdiri dari tiga lapisan utama: epidermis yang melindungi dari mikroorganisme dan cedera fisik, dermis yang mengandung kelenjar keringat, folikel rambut, dan pembuluh darah, serta hipodermis yang menyimpan lemak dan bertindak sebagai isolator. Kulit juga berperan dalam sintesis vitamin D saat terpapar sinar matahari dan memiliki reseptor sensorik yang mendeteksi sentuhan, suhu, dan rasa sakit.',
        rambut:
          'Rambut membantu melindungi kulit dari kerusakan dan berfungsi sebagai sensor untuk merasakan sentuhan. Rambut tumbuh dari folikel yang berada di dalam dermis, dan setiap helai rambut terdiri dari keratin, protein yang memberikan kekuatan dan ketahanan. Selain itu, rambut di kepala berfungsi sebagai pelindung dari sinar ultraviolet dan panas, sementara rambut di bagian tubuh lainnya membantu mengurangi gesekan atau menghalangi masuknya partikel asing ke dalam tubuh. Rambut juga memiliki peran estetika yang signifikan dalam penampilan manusia.',
        kuku: 'Kuku melindungi ujung jari dan jari kaki serta membantu memanipulasi objek kecil. Kuku terdiri dari keratin yang sama dengan rambut, dan tumbuh dari akar kuku yang berada di bawah kutikula. Kuku juga berfungsi sebagai alat untuk menggaruk dan memisahkan objek, serta memberikan dukungan struktural untuk ujung jari, yang meningkatkan sensitivitas sentuhan. Kondisi kuku juga dapat mencerminkan kesehatan umum seseorang, dengan perubahan pada warna, tekstur, atau ketebalan kuku yang dapat menjadi indikasi masalah kesehatan tertentu.',
        'kelenjar-keringat':
          'Kelenjar keringat menghasilkan keringat yang membantu mendinginkan tubuh melalui penguapan. Kelenjar ini tersebar di seluruh tubuh, tetapi lebih banyak ditemukan di telapak tangan, kaki, dan dahi. Ada dua jenis kelenjar keringat: kelenjar ekrin yang mengeluarkan keringat jernih dan tidak berbau untuk termoregulasi, dan kelenjar apokrin yang ditemukan di daerah seperti ketiak, yang menghasilkan keringat lebih kental dan berbau yang berfungsi mulai pada masa pubertas. Pengaturan suhu tubuh melalui keringat sangat penting untuk menjaga fungsi tubuh yang normal.',
        'kelenjar-minyak':
          'Kelenjar minyak menghasilkan sebum yang menjaga kulit tetap lembut dan mencegah pengeringan. Sebum adalah zat berminyak yang dikeluarkan oleh kelenjar sebaceous yang terhubung ke folikel rambut. Sebum membantu melembabkan kulit dan rambut, serta berfungsi sebagai pelindung dengan menjaga kelembaban dan melindungi kulit dari infeksi bakteri. Produksi sebum yang berlebihan atau terhambat dapat menyebabkan masalah kulit seperti jerawat, yang umum terjadi terutama selama masa remaja.',
      },
      'sistem-ekskresi': {
        ginjal:
          'Ginjal menyaring darah untuk menghilangkan limbah dan kelebihan cairan, yang kemudian dikeluarkan sebagai urin. Setiap hari, ginjal memproses sekitar 150 liter darah untuk menghasilkan 1 hingga 2 liter urin, yang terdiri dari air, garam, dan produk limbah seperti urea dan kreatinin. Ginjal juga berperan dalam menjaga keseimbangan elektrolit, mengatur tekanan darah melalui hormon renin, serta mengontrol produksi sel darah merah melalui hormon eritropoietin. Fungsi ginjal yang optimal sangat penting untuk kesehatan umum, dan gangguan ginjal dapat menyebabkan akumulasi limbah beracun dalam tubuh.',
        ureter:
          'Ureter adalah saluran yang membawa urin dari ginjal ke kandung kemih. Ureter merupakan tabung otot sepanjang 25-30 cm yang dilapisi dengan lapisan epitel untuk melindungi dari infeksi dan kerusakan akibat aliran urin. Gerakan peristaltik, kontraksi otot yang berirama, membantu mendorong urin menuju kandung kemih meskipun posisi tubuh berubah. Setiap ginjal memiliki satu ureter yang memastikan aliran urin yang efisien dan bebas dari aliran balik yang dapat menyebabkan infeksi.',
        'kandung-kemih':
          'Kandung kemih adalah organ berongga yang menyimpan urin sebelum dikeluarkan dari tubuh. Kandung kemih dapat menampung hingga 500 ml urin sebelum dorongan untuk buang air kecil terasa, meskipun biasanya dorongan muncul saat kandung kemih terisi sekitar setengahnya. Dinding kandung kemih terdiri dari otot detrusor yang dapat berkontraksi untuk mengeluarkan urin saat buang air kecil. Sfingter uretra, yang terletak di dasar kandung kemih, membantu mengendalikan aliran urin. Disfungsi kandung kemih, seperti inkontinensia atau infeksi saluran kemih, dapat mempengaruhi kualitas hidup secara signifikan.',
        uretra:
          'Uretra adalah saluran yang mengeluarkan urin dari kandung kemih keluar dari tubuh. Uretra pada pria lebih panjang dibandingkan pada wanita, dan pada pria, uretra juga berfungsi sebagai jalur keluar bagi sperma selama ejakulasi. Sfingter uretra, yang mengelilingi uretra, membantu mengendalikan aliran urin dan mencegah kebocoran. Pada wanita, uretra yang lebih pendek membuat mereka lebih rentan terhadap infeksi saluran kemih. Fungsi uretra yang normal penting untuk menjaga kontinensia dan kesehatan saluran kemih.',
      },
      'sistem-reproduksi': {
        testis:
          'Testis adalah kelenjar kelamin pria yang menghasilkan sperma dan hormon testosteron. Testosteron adalah hormon utama yang bertanggung jawab untuk perkembangan karakteristik seksual sekunder pria, seperti pertumbuhan rambut wajah, peningkatan massa otot, dan suara yang lebih dalam. Testis juga mengandung tubulus seminiferus, tempat produksi sperma berlangsung melalui proses yang disebut spermatogenesis. Sperma yang dihasilkan kemudian disimpan di epididimis sebelum dikeluarkan selama ejakulasi. Fungsi testis yang normal sangat penting untuk kesuburan dan kesehatan seksual pria.',
        penis:
          'Penis adalah organ kelamin pria yang juga berfungsi sebagai saluran keluarnya urin dan sperma. Penis terdiri dari tiga bagian utama: akar, batang, dan kepala (glans), dengan uretra yang berjalan di sepanjang batang untuk mengalirkan urin dan sperma. Ereksi terjadi ketika pembuluh darah di dalam penis terisi dengan darah, yang memungkinkan penetrasi selama hubungan seksual. Selain fungsi reproduksi, penis juga memainkan peran dalam sistem ekskresi dengan memungkinkan pengeluaran urin dari tubuh.',
        'vesikula-seminalis':
          'Vesikula seminalis adalah kelenjar yang menghasilkan cairan yang menjadi bagian dari semen. Cairan yang dihasilkan oleh vesikula seminalis mengandung fruktosa, yang menyediakan energi untuk sperma, serta zat lain yang membantu menjaga kelangsungan hidup sperma dalam lingkungan asam vagina. Vesikula seminalis terletak di belakang kandung kemih dan terhubung ke vas deferens, yang membawa sperma dari testis. Campuran cairan dari vesikula seminalis dan sperma dari testis kemudian disalurkan melalui uretra selama ejakulasi.',
        prostat:
          'Prostat adalah kelenjar yang menghasilkan cairan yang mendukung dan melindungi sperma selama ejakulasi. Cairan prostat mengandung enzim dan protein yang meningkatkan mobilitas sperma dan melindunginya dari lingkungan asam di saluran kelamin wanita. Prostat terletak di bawah kandung kemih dan mengelilingi uretra, dengan kelenjar ini sering kali menjadi sumber masalah kesehatan pada pria lanjut usia, seperti pembesaran prostat (BPH) dan kanker prostat. Fungsi prostat yang normal sangat penting untuk kesuburan dan kesehatan seksual pria.',
        'vas-deferens':
          'Vas deferens adalah saluran yang membawa sperma dari testis ke uretra selama ejakulasi. Vas deferens merupakan bagian dari sistem reproduksi pria yang penting untuk transportasi sperma. Setelah sperma diproduksi di testis, mereka disimpan sementara di epididimis sebelum dipindahkan ke vas deferens. Selama ejakulasi, vas deferens berkontraksi untuk mendorong sperma menuju uretra, di mana mereka bercampur dengan cairan dari vesikula seminalis dan kelenjar prostat untuk membentuk semen.',
        ovarium:
          'Ovarium adalah kelenjar kelamin wanita yang menghasilkan sel telur dan hormon estrogen serta progesteron. Setiap wanita memiliki dua ovarium, yang terletak di kedua sisi rahim. Ovarium mengandung folikel-folikel yang masing-masing dapat berkembang menjadi sel telur yang matang dan siap untuk ovulasi. Selain itu, ovarium berperan penting dalam mengatur siklus menstruasi dan mempersiapkan tubuh untuk kehamilan melalui produksi hormon. Fungsi ovarium yang normal sangat penting untuk kesuburan dan kesehatan reproduksi wanita.',
        'tuba-falopi':
          'Tuba falopi adalah saluran yang membawa sel telur dari ovarium ke rahim. Setiap tuba falopi terhubung ke satu ovarium dan berfungsi sebagai tempat fertilisasi, di mana sel sperma bertemu dengan sel telur. Dinding tuba falopi dilapisi dengan silia yang membantu menggerakkan sel telur atau zigot yang telah dibuahi menuju rahim untuk implantasi. Penyumbatan atau kerusakan pada tuba falopi dapat menyebabkan masalah kesuburan, seperti kehamilan ektopik atau kesulitan hamil.',
        uterus:
          'Uterus adalah tempat perkembangan janin selama kehamilan. Uterus, atau rahim, adalah organ berbentuk seperti buah pir yang terletak di panggul wanita. Dinding uterus terdiri dari lapisan otot yang kuat dan endometrium, lapisan dalam yang tebal dan kaya akan pembuluh darah. Setiap bulan, endometrium mengalami perubahan siklus sebagai persiapan untuk kemungkinan kehamilan. Jika tidak terjadi pembuahan, lapisan ini akan luruh dan dikeluarkan dari tubuh sebagai menstruasi. Uterus juga memainkan peran penting selama persalinan dengan kontraksi yang mendorong bayi keluar melalui vagina.',
        vagina:
          'Vagina adalah saluran kelamin wanita yang juga berfungsi sebagai saluran lahir dan jalur untuk menstruasi. Vagina menghubungkan uterus dengan bagian luar tubuh dan berperan dalam hubungan seksual, di mana penis masuk ke dalam vagina selama koitus. Dinding vagina elastis dan dapat meregang untuk mengakomodasi kelahiran bayi selama persalinan. Selain itu, vagina memiliki lingkungan yang sedikit asam, yang membantu melindungi terhadap infeksi dengan mendukung pertumbuhan bakteri baik dan menghambat patogen.',
      },
      'sistem-imun': {
        'kelenjar-getah-bening-imun':
          'Kelenjar getah bening adalah bagian dari sistem kekebalan yang membantu melawan infeksi dengan memproduksi sel darah putih. Kelenjar getah bening berfungsi sebagai filter untuk menangkap dan menghancurkan patogen seperti bakteri dan virus yang ada dalam cairan limfa. Limfosit, terutama sel T dan sel B, adalah sel darah putih yang terlibat dalam respon imun adaptif, yang mengenali dan menargetkan patogen spesifik. Ketika tubuh melawan infeksi, kelenjar getah bening dapat membesar dan menjadi nyeri, menunjukkan bahwa sistem kekebalan sedang bekerja.',
        'limpa-imun':
          'Limpa membantu membersihkan darah dari patogen dan mendaur ulang sel darah merah yang tua. Selain menyaring darah, limpa juga menyimpan trombosit dan sel darah putih, yang siap digunakan dalam respon imun saat tubuh terinfeksi. Limpa juga memproduksi antibodi yang dapat menetralkan patogen, serta memainkan peran dalam penghapusan sel-sel darah yang rusak atau tua. Meskipun limpa bukan organ vital untuk kelangsungan hidup, fungsi limpa sangat penting untuk menjaga kekebalan tubuh dan kesehatan darah.',
        'tonsil-imun':
          'Tonsil adalah bagian dari sistem kekebalan tubuh yang melindungi terhadap patogen yang masuk melalui mulut dan tenggorokan. Tonsil mengandung folikel limfatik yang dipenuhi dengan limfosit, yang berperan dalam mendeteksi dan melawan infeksi. Tonsil berfungsi sebagai garis pertahanan pertama, menangkap patogen sebelum mereka dapat menyebar lebih jauh ke dalam tubuh. Meskipun tonsil dapat terinfeksi sendiri (tonsilitis), mereka memainkan peran penting dalam pertahanan kekebalan tubuh, terutama selama masa kanak-kanak.',
        'timos-imun':
          'Timos adalah organ yang mendukung pengembangan sel T, yang merupakan komponen penting dari sistem kekebalan tubuh. Sel T yang matang di timos berperan dalam mengidentifikasi dan menghancurkan sel-sel yang terinfeksi oleh virus atau sel kanker. Timos sangat aktif selama masa kanak-kanak dan memainkan peran krusial dalam membangun sistem kekebalan adaptif yang dapat mengenali berbagai patogen. Seiring bertambahnya usia, timos mulai menyusut dan digantikan oleh jaringan lemak, namun sel T yang sudah diproduksi tetap penting sepanjang hidup.',
        'sumsum-tulang-imun':
          'Sumsum tulang memproduksi sel darah putih yang memainkan peran utama dalam pertahanan tubuh terhadap infeksi. Selain sel darah merah dan trombosit, sumsum tulang menghasilkan berbagai jenis sel darah putih seperti neutrofil, limfosit, dan monosit, yang semuanya penting dalam merespon infeksi dan cedera. Sumsum tulang juga merupakan tempat awal bagi perkembangan sel B, yang matang di dalam sumsum tulang sebelum masuk ke aliran darah untuk mendeteksi dan melawan patogen. Fungsi sumsum tulang yang optimal sangat penting untuk menjaga kesehatan sistem kekebalan tubuh.',
        'sel-darah-putih':
          'Sel darah putih adalah komponen penting dari sistem kekebalan tubuh yang melawan infeksi dan penyakit. Sel darah putih, atau leukosit, beredar dalam darah dan jaringan, selalu siap untuk merespon ancaman seperti bakteri, virus, dan parasit. Ada beberapa jenis sel darah putih, termasuk neutrofil yang menyerang bakteri, limfosit yang terlibat dalam respon imun spesifik, dan makrofag yang menelan patogen dan sel-sel yang mati. Jumlah dan jenis sel darah putih dalam tubuh dapat berubah sebagai respon terhadap infeksi atau gangguan imun.',
      },
    };
    return descriptions[system]?.[organ] || 'Deskripsi organ tidak tersedia.';
  }
});

document.getElementById('cari-sekarang').addEventListener('click', function () {
  const gambar = document.getElementById('gambar-penunjang');

  // Menampilkan gambar dan deskripsi
  gambar.classList.remove('hidden');
  gambar.classList.add('border-2', 'border-gray-300');
});

document.getElementById('cari-sekarang').addEventListener('click', function () {
  const sistemOrgan = document.getElementById('sistem-organ').value;
  const gambar = document.getElementById('gambar-penunjang');

  if (sistemOrgan === '') {
    // Jika opsi default dipilih, sembunyikan gambar
    gambar.classList.add('hidden');
  } else {
    // Jika opsi sistem atau organ dipilih, tampilkan gambar
    gambar.classList.remove('hidden');
  }
});

//Search
let currentHighlightIndex = -1;
let highlights = [];

function toggleClearButton() {
  const searchInput = document.getElementById('searchInput');
  const clearButton = document.getElementById('clearSearch');
  if (searchInput.value.length > 0) {
    clearButton.classList.remove('hidden');
  } else {
    clearButton.classList.add('hidden');
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  toggleClearButton();
  clearHighlights();
}

function searchAndHighlight() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm.length < 1) {
    clearHighlights();
    return;
  }

  clearHighlights();
  const regex = new RegExp(`\\b${escapeRegExp(searchTerm)}\\b`, 'gi');
  const textNodes = getTextNodes(document.body);

  textNodes.forEach((node) => {
    const text = node.textContent;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const span = document.createElement('span');
      span.className = 'highlight';
      range.surroundContents(span);
      highlights.push(span);
    }
  });

  if (highlights.length > 0) {
    document.getElementById('searchNavigation').classList.remove('hidden');
    navigateToNearestHighlight();
  } else {
    document.getElementById('searchNavigation').classList.add('hidden');
  }
}

function getTextNodes(node) {
  let textNodes = [];
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
    textNodes.push(node);
  } else {
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      textNodes = textNodes.concat(getTextNodes(children[i]));
    }
  }
  return textNodes;
}

function clearHighlights() {
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode;
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    parent.normalize();
  });
  highlights = [];
  currentHighlightIndex = -1;
  document.getElementById('searchNavigation').classList.add('hidden');
}

function navigateToNearestHighlight() {
  const navbar = document.getElementById('navbar');
  const navbarRect = navbar.getBoundingClientRect();
  const navbarBottom = navbarRect.bottom;

  let nearestIndex = 0;
  let nearestDistance = Infinity;

  highlights.forEach((highlight, index) => {
    const rect = highlight.getBoundingClientRect();
    const distance = Math.abs(rect.top - navbarBottom);
    if (distance < nearestDistance && rect.top > navbarBottom) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  currentHighlightIndex = nearestIndex;
  focusHighlight(currentHighlightIndex);
}

function navigateHighlight(direction) {
  if (highlights.length === 0) return;

  currentHighlightIndex += direction;

  if (currentHighlightIndex >= highlights.length) {
    currentHighlightIndex = 0;
  } else if (currentHighlightIndex < 0) {
    currentHighlightIndex = highlights.length - 1;
  }

  focusHighlight(currentHighlightIndex);
}

function focusHighlight(index) {
  highlights.forEach((h) => h.classList.remove('current-highlight'));
  const currentHighlight = highlights[index];
  currentHighlight.classList.add('current-highlight');
  currentHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Tambahkan event listener baru
document.getElementById('searchInput').addEventListener('input', toggleClearButton);
document.getElementById('clearSearch').addEventListener('click', clearSearch);

// Event listeners
document.getElementById('searchIcon').addEventListener('click', searchAndHighlight);
document.getElementById('prevButton').addEventListener('click', () => navigateHighlight(-1));
document.getElementById('nextButton').addEventListener('click', () => navigateHighlight(1));

// Jam
function updateTime() {
  const timeDisplay = document.getElementById('time');
  const ampmDisplay = document.getElementById('ampm').querySelector('sup');
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const isAm = hours < 12 || hours === 24;
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = `${formattedHours}.${formattedMinutes}`;
  const ampmString = isAm ? 'AM' : 'PM';
  timeDisplay.textContent = timeString;
  ampmDisplay.textContent = ampmString;
}

setInterval(updateTime, 1000);
updateTime();

// Toggle Dark Mode
const themeToggleButton = document.getElementById('theme-toggle-button');
const themeMenu = document.getElementById('theme-menu');

themeToggleButton.addEventListener('click', () => {
  themeMenu.classList.toggle('hidden');
});

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggleButton.innerHTML = '<i class="ri-moon-line"></i>';
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggleButton.innerHTML = '<i class="ri-sun-line"></i>';
  } else {
    localStorage.removeItem('theme');
    themeToggleButton.innerHTML = '<i class="ri-computer-line"></i>';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

const userTheme = localStorage.getItem('theme');
if (userTheme) {
  setTheme(userTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

document.getElementById('light-mode').addEventListener('click', () => {
  setTheme('light');
  themeMenu.classList.add('hidden');
});

document.getElementById('dark-mode').addEventListener('click', () => {
  setTheme('dark');
  themeMenu.classList.add('hidden');
});

document.getElementById('system-mode').addEventListener('click', () => {
  setTheme('system');
  themeMenu.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!themeToggleButton.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.add('hidden');
  }
});

// 3D Model
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambah OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);

// Tambah lights
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Memuat 3D Model
const loader = new THREE.GLTFLoader();
loader.load('./assets/blend/organmanusia.glb', function (gltf) {
  scene.add(gltf.scene);

  originalRotation = gltf.scene.rotation.clone();
  mixer = new THREE.AnimationMixer(gltf.scene);

  if (gltf.animations && gltf.animations.length) {
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    mixer.timeScale = 2;
  }

  const clock = new THREE.Clock();

  // Loop Animasi
  const animate = function () {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
  };
  animate();
});

let resetTimeout;

// Reset Posisi Kamera
function resetRotationAndCamera() {
  if (resetTimeout) {
    clearTimeout(resetTimeout);
  }

  resetTimeout = setTimeout(() => {
    gsap.to(gltf.scene.rotation, {
      x: originalRotation.x,
      y: originalRotation.y,
      z: originalRotation.z,
      duration: 0.1,
      ease: 'power2.out',
    });

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 5,
      duration: 0.11,
      ease: 'power2.out',
      onUpdate: function () {
        camera.lookAt(scene.position);
      },
    });

    controls.update();
  }, 500);
}

controls.addEventListener('change', resetRotationAndCamera);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
