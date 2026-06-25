export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Navbar
    "nav.search_placeholder": "Search your favorite game...",
    "nav.cancel": "Cancel",
    "nav.trending": "Trending",
    "nav.latest": "Latest",
    "nav.blur_on": "Disable Thumbnail Blur",
    "nav.blur_off": "Enable Thumbnail Blur",
    "nav.search_aria": "Search Game",
    "nav.bookmarks": "Saved Games",

    // Home page
    "home.trending_title": "Trending Now",
    "home.trending_subtitle": "Most played games this week",
    "home.latest_title": "Newly Released",
    "home.latest_subtitle": "Latest games ready for you to play",
    "home.editors_choice": "Editor's Choice",
    "home.editors_title": "Need the Best Game Recommendations?",
    "home.editors_desc": "All games on RyuGame have been security scanned, free from malware, and tested for stability on Android and PC platforms. Pick your favorite game and start your adventure now!",

    // Hero carousel
    "hero.trending_badge": "Trending Game",
    "hero.download_text": "Download {title} latest version {version} free for Android & PC with safe, fast, and verified links.",
    "hero.download_text_no_version": "Download {title} free for Android & PC with safe, fast, and verified links.",
    "hero.download_btn": "Download Now",
    "hero.version": "Version {version}",

    // Terbaru page
    "latest.title": "Latest Releases",
    "latest.subtitle": "Newest Android & PC free games recently added",
    "latest.empty": "No recent games found.",
    "latest.load_failed": "Failed to Load Data",
    "latest.load_failed_desc": "Please try again in a moment.",
    "latest.loading": "Loading...",
    "latest.load_more": "Load More",

    // Search page
    "search.title": "Search Results",
    "search.showing": "Showing games for: ",
    "search.browse": "Browse free & premium game collection",
    "search.explore_title": "Start Exploring",
    "search.explore_desc": "Type an Android or PC game title in the search box above to start searching.",
    "search.not_found": "Game not found",
    "search.not_found_desc": "Sorry, we couldn't find results for \"{q}\". Try other keywords like \"RPG\" or \"Action\".",

    // Game detail page
    "detail.not_found": "Game not found",
    "detail.not_found_desc": "The URL may be incorrect or the game has been removed.",
    "detail.download_links": "Download Links",
    "detail.no_downloads": "Sorry, download links are currently unavailable for this game.",
    "detail.shortlink_tutorial": "How to Bypass Shortlink (Must Watch)",
    "detail.shortlink_help": "Watch the short video above if you're confused about downloading files from Safelinku.",
    "detail.android_mirror": "Select Android APK Download Mirror ({count})",
    "detail.windows_mirror": "Select Windows PC Download Mirror ({count})",
    "detail.no_direct_download": "This game doesn't provide direct (free) download files. Support or contact the developer through the links below.",
    "detail.support_developer": "Support Developer / VIP Access",
    "detail.access_link": "Access Link",
    "detail.about_game": "About Game",
    "detail.categories_tags": "Categories & Tags",
    "detail.additional_info": "Additional Information",
    "detail.seo_title_suffix": "- Free Premium Download",
    "detail.seo_not_found": "Game Not Found",
    "detail.seo_not_found_desc": "The game page could not be found.",

    // Footer
    "footer.copyright": "Made with love for gamers.",

    // Metadata (SEO)
    "meta.title": "RyuGame - Download Premium Android & PC Games Free",
    "meta.description": "The best place to download Android (APK) & PC games, latest, free and premium, easily, quickly, and safely.",
    "meta.latest_title": "Latest Games - Download Free Android & PC Games",
    "meta.latest_description": "List of the newest Android and PC games recently added, updated daily.",

    // Bookmarks / Saved Page
    "saved.title": "Saved Games",
    "saved.subtitle": "Your personally saved Android & PC games",
    "saved.empty": "Your library is empty.",
    "saved.empty_desc": "Start bookmarking your favorite games to see them here!",
    "saved.browse_btn": "Browse Games",
    "detail.bookmark_add": "Add Bookmark",
    "detail.bookmark_remove": "Saved",
  },
  id: {
    // Navbar
    "nav.search_placeholder": "Cari game favorit Anda...",
    "nav.cancel": "Batal",
    "nav.trending": "Trending",
    "nav.latest": "Terbaru",
    "nav.blur_on": "Matikan Blur Thumbnail",
    "nav.blur_off": "Aktifkan Blur Thumbnail",
    "nav.search_aria": "Cari Game",
    "nav.bookmarks": "Game Tersimpan",

    // Home page
    "home.trending_title": "Sedang Populer",
    "home.trending_subtitle": "Game yang paling banyak dimainkan minggu ini",
    "home.latest_title": "Baru Dirilis",
    "home.latest_subtitle": "Game terbaru yang siap Anda mainkan",
    "home.editors_choice": "Editor's Choice",
    "home.editors_title": "Butuh Rekomendasi Game Terbaik?",
    "home.editors_desc": "Semua game di RyuGame telah melewati proses scan keamanan, bebas dari malware, dan diuji kestabilannya pada platform Android serta PC. Pilih game favorit Anda dan mulailah berpetualang sekarang!",

    // Hero carousel
    "hero.trending_badge": "Trending Game",
    "hero.download_text": "Unduh game {title} versi terbaru {version} gratis untuk Android & PC dengan link aman, cepat, dan terverifikasi.",
    "hero.download_text_no_version": "Unduh game {title} gratis untuk Android & PC dengan link aman, cepat, dan terverifikasi.",
    "hero.download_btn": "Download Sekarang",
    "hero.version": "Versi {version}",

    // Terbaru page
    "latest.title": "Rilis Terbaru",
    "latest.subtitle": "Daftar game Android & PC gratis terbaru yang baru ditambahkan",
    "latest.empty": "Tidak ada game terbaru yang ditemukan.",
    "latest.load_failed": "Gagal Memuat Data",
    "latest.load_failed_desc": "Silakan coba kembali dalam beberapa saat.",
    "latest.loading": "Memuat...",
    "latest.load_more": "Muat Lebih Banyak",

    // Search page
    "search.title": "Hasil Pencarian",
    "search.showing": "Menampilkan game untuk: ",
    "search.browse": "Cari koleksi game gratis & premium",
    "search.explore_title": "Mulai Menjelajah",
    "search.explore_desc": "Ketikkan judul game Android atau PC pada kotak pencarian di atas untuk mulai mencari.",
    "search.not_found": "Game tidak ditemukan",
    "search.not_found_desc": "Maaf, kami tidak menemukan hasil untuk \"{q}\". Coba cari kata kunci lain seperti \"RPG\" atau \"Action\".",

    // Game detail page
    "detail.not_found": "Game tidak ditemukan",
    "detail.not_found_desc": "URL mungkin salah atau game telah dihapus.",
    "detail.download_links": "Link Unduh Game",
    "detail.no_downloads": "Maaf, saat ini link download belum tersedia untuk game ini.",
    "detail.shortlink_tutorial": "Cara Melewati Shortlink (Wajib Tonton)",
    "detail.shortlink_help": "Tonton video singkat di atas jika kamu bingung cara mendownload file dari Safelinku.",
    "detail.android_mirror": "Pilih Mirror Download Android APK ({count})",
    "detail.windows_mirror": "Pilih Mirror Download Windows PC ({count})",
    "detail.no_direct_download": "Game ini tidak menyediakan file unduhan langsung (Free). Hubungi atau dukung developer melalui link di bawah.",
    "detail.support_developer": "Dukung Developer / Akses VIP",
    "detail.access_link": "Akses Link",
    "detail.about_game": "Tentang Game",
    "detail.categories_tags": "Kategori & Tag",
    "detail.additional_info": "Informasi Tambahan",
    "detail.seo_title_suffix": "- Download Premium Gratis",
    "detail.seo_not_found": "Game Tidak Ditemukan",
    "detail.seo_not_found_desc": "Halaman game tidak dapat ditemukan.",

    // Footer
    "footer.copyright": "Dibuat dengan cinta untuk para gamer.",

    // Metadata (SEO)
    "meta.title": "RyuGame - Download Game Android & PC Premium Gratis",
    "meta.description": "Tempat download game Android (APK) & PC terbaik, terbaru, gratis dan premium dengan mudah, cepat, dan aman.",
    "meta.latest_title": "Game Terbaru - Unduh Game Android & PC Gratis",
    "meta.latest_description": "Daftar game Android dan PC terbaru yang baru saja ditambahkan, selalu diperbarui setiap hari.",

    // Bookmarks / Saved Page
    "saved.title": "Game Tersimpan",
    "saved.subtitle": "Daftar game Android & PC favorit yang Anda simpan",
    "saved.empty": "Perpustakaan Anda kosong.",
    "saved.empty_desc": "Mulai simpan game favorit Anda untuk melihatnya di sini!",
    "saved.browse_btn": "Jelajahi Game",
    "detail.bookmark_add": "Simpan Game",
    "detail.bookmark_remove": "Tersimpan",
  },
  ja: {
    // Navbar
    "nav.search_placeholder": "お気に入りのゲームを検索...",
    "nav.cancel": "キャンセル",
    "nav.trending": "トレンド",
    "nav.latest": "最新",
    "nav.blur_on": "サムネイルのぼかしを無効化",
    "nav.blur_off": "サムネイルのぼかしを有効化",
    "nav.search_aria": "ゲームを検索",
    "nav.bookmarks": "保存されたゲーム",

    // Home page
    "home.trending_title": "トレンド",
    "home.trending_subtitle": "今週最もプレイされたゲーム",
    "home.latest_title": "新着リリース",
    "home.latest_subtitle": "今すぐ遊べる最新ゲーム",
    "home.editors_choice": "エディターズ・チョイス",
    "home.editors_title": "おすすめのゲームをお探しですか？",
    "home.editors_desc": "RyuGameのすべてのゲームはセキュリティスキャン済みで、マルウェアがなく、AndroidおよびPCプラットフォームでの安定性がテストされています。お気に入りのゲームを選んで、今すぐ冒険を始めましょう！",

    // Hero carousel
    "hero.trending_badge": "トレンドゲーム",
    "hero.download_text": "安心、高速、検証済みのリンクで、AndroidおよびPC用の{title}の最新バージョン{version}を無料でダウンロード。",
    "hero.download_text_no_version": "安心、高速、検証済みのリンクで、AndroidおよびPC用の{title}を無料でダウンロード。",
    "hero.download_btn": "今すぐダウンロード",
    "hero.version": "バージョン {version}",

    // Terbaru page
    "latest.title": "最新リリース",
    "latest.subtitle": "最近追加された無料のAndroid＆PCゲーム一覧",
    "latest.empty": "最新のゲームが見つかりませんでした。",
    "latest.load_failed": "データの読み込みに失敗しました",
    "latest.load_failed_desc": "しばらくしてからもう一度お試しください。",
    "latest.loading": "読み込み中...",
    "latest.load_more": "もっと読み込む",

    // Search page
    "search.title": "検索結果",
    "search.showing": "検索ワードのゲームを表示: ",
    "search.browse": "無料＆プレミアムゲームコレクションを検索",
    "search.explore_title": "探索を始める",
    "search.explore_desc": "上の検索ボックスにAndroidまたはPCのゲームタイトルを入力して検索を開始します。",
    "search.not_found": "ゲームが見つかりません",
    "search.not_found_desc": "「{q}」の結果が見つかりませんでした。代わりに「RPG」や「アクション」などのキーワードを試してください。",

    // Game detail page
    "detail.not_found": "ゲームが見つかりません",
    "detail.not_found_desc": "URLが正しくないか、ゲームが削除された可能性があります。",
    "detail.download_links": "ゲームダウンロードリンク",
    "detail.no_downloads": "申し訳ありませんが、このゲームのダウンロードリンクは現在利用できません。",
    "detail.shortlink_tutorial": "ショートリンクのスキップ方法（必見）",
    "detail.shortlink_help": "Safelinkuからのファイルのダウンロード方法がわからない場合は、上の短いビデオをご覧ください。",
    "detail.android_mirror": "Android APK ダウンロードミラーを選択 ({count})",
    "detail.windows_mirror": "Windows PC ダウンロードミラーを選択 ({count})",
    "detail.no_direct_download": "このゲームは直接（無料）のダウンロードファイルを提供していません。以下のリンクから開発者をサポートまたは問い合わせてください。",
    "detail.support_developer": "開発者をサポート / VIPアクセス",
    "detail.access_link": "リンクにアクセス",
    "detail.about_game": "ゲームについて",
    "detail.categories_tags": "カテゴリー＆タグ",
    "detail.additional_info": "追加情報",
    "detail.seo_title_suffix": "- 無料プレミアムダウンロード",
    "detail.seo_not_found": "ゲームが見つかりません",
    "detail.seo_not_found_desc": "ゲームページが見つかりませんでした。",

    // Footer
    "footer.copyright": "ゲーマーのために愛を込めて制作。",

    // Metadata (SEO)
    "meta.title": "RyuGame - プレミアムAndroid＆PCゲーム無料ダウンロード",
    "meta.description": "Android（APK）およびPCゲームを、簡単に、素早く、安全にダウンロードできる最高のサイト。",
    "meta.latest_title": "最新ゲーム - 無料Android＆PCゲームダウンロード",
    "meta.latest_description": "毎日更新される、最近追加された最新のAndroidおよびPCゲームの一覧。",

    // Bookmarks / Saved Page
    "saved.title": "保存されたゲーム",
    "saved.subtitle": "保存したお気に入りのAndroid＆PCゲーム",
    "saved.empty": "ライブラリは空です。",
    "saved.empty_desc": "お気に入りのゲームを保存して、ここに表示しましょう！",
    "saved.browse_btn": "ゲームを探す",
    "detail.bookmark_add": "ブックマークに追加",
    "detail.bookmark_remove": "保存済み",
  },
};
