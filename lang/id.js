const { version } = require("mongoose");
const about = require("../commands/about");

module.exports = {
    games: {
        genshin: 'Genshin Impact',
        hkrpg: 'Honkai: Star Rail',
        nap: 'Zenless Zone Zero'
    },
    common: {
        enabled: 'AKTIF',
        disabled: 'NONAKTIF',
        notYourButton: 'Tombol ini bukan untukmu.',
        supportMsg: '❤️ Dukung pengembang: sociabuzz.com/neionri | github.com/sponsors/neionri'
    },
    welcome: {
        title: 'Terima Kasih Telah Menambahkan HoYo Code Sender!',
        description: 'Terima kasih telah menambahkan saya ke servermu! Saya akan membantumu mendapatkan kode game HoYoverse secara otomatis.',
        setupHeader: '🔧 Panduan Pengaturan Cepat',
        setupSteps: '1. Gunakan `/setup` untuk mengatur saluran notifikasi & role\n' +
            '2. (Opsional) Gunakan `/favgames` untuk memilih game yang ingin kamu terima kodenya\n' +
            '3. (Opsional) Ganti bahasa dengan `/setlang`\n\n' +
            'Selesai! Saya akan otomatis mengirim kode game baru ke saluran yang sudah diatur.',
        helpTip: 'Untuk informasi lebih lanjut, gunakan perintah `/help` kapan saja.',
        footer: 'HoYo Code Sender - Dapatkan kode game HoYoverse secara otomatis!',
        dmInfo: 'Saya tidak dapat menemukan saluran yang sesuai untuk mengirim pesan sambutan di servermu, jadi saya mengirimnya langsung kepadamu.'
    },
    commands: {
        listcodes: {
            title: 'Kode Aktif untuk {game}',
            noCodes: 'Tidak ada kode aktif yang ditemukan untuk {game}',
            reward: 'Hadiah: {reward}',
            status: 'Status: {status}',
            redeemButton: 'Klik untuk Menukar',
            redeemHeader: 'Tukar di Sini',
            newCodes: 'Kode {game} Baru!',
            noReward: 'Hadiah tidak disebutkan',
            error: {
                fetch: 'Gagal mengambil kode. Silakan coba lagi nanti.',
                invalid: 'Respons tidak valid dari API',
                notFound: 'Tidak ada kode yang tersedia'
            },
            loading: 'Memuat kode...',
            page: 'Halaman'
        },
        setup: {
            description: 'Atur role dan saluran untuk notifikasi kode',
            genshinRole: 'Role untuk notifikasi Genshin Impact',
            hsrRole: 'Role untuk notifikasi Honkai: Star Rail',
            zzzRole: 'Role untuk notifikasi Zenless Zone Zero',
            forumThreadHeader: '🧵 Thread Forum',
            forumThreadSuccess: '✅ Kode juga akan diposting ke thread ini!',
            forumThreadWarning: '⚠️ Thread forum telah diberikan namun bot tidak memiliki izin atau bukan thread yang valid. Thread tidak akan digunakan.',
            channel: 'Saluran untuk notifikasi kode',
            success: 'Konfigurasi server berhasil diselesaikan!',
            error: 'Pengaturan gagal',
            roleSetup: 'Role {role} telah diatur untuk notifikasi {type}',
            channelSetup: 'Saluran {channel} akan menerima notifikasi kode',
            autoSendSetup: 'Fitur kirim otomatis: {status}',
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini',
            channelValidation: '✅ Saluran berhasil diverifikasi! Bot dapat mengirim pesan di sini.',
            readyMessage: 'Servermu sekarang siap menerima notifikasi kode!',
            rolesHeader: '🎭 Role Notifikasi',
            channelHeader: '📣 Saluran Notifikasi',
            autoSendHeader: '⚙️ Fitur Kirim Otomatis',
            demoTipHeader: '💡 Tips Pengujian',
            demoTipText: 'Kamu dapat menguji pengaturanmu sekarang dengan menggunakan perintah `/demoautosend` untuk mengirim pesan notifikasi demo.',
            error: {
                channelValidation: 'Verifikasi saluran gagal'
            }
        },
        demoautosend: {
            noPermission: 'Kamu memerlukan izin administrator untuk menggunakan perintah ini.',
            noConfig: 'Bot belum diatur! Silakan gunakan `/setup` terlebih dahulu untuk mengonfigurasi saluran.',
            channelError: 'Tidak dapat mengirim pesan ke saluran yang dikonfigurasi:',
            title: '🔔 Kode Demo {game}!',
            notice: '⚠️ Pemberitahuan Demo',
            noticeText: 'Ini adalah kode demo hanya untuk tujuan pengujian. Kode ini tidak akan berfungsi di dalam game.',
            success: 'Berhasil mengirim kode demo untuk {count} game!',
            error: 'Terjadi kesalahan saat mengirim kode demo.'
        },
        deletesetup: {
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini.',
            loading: 'Menghapus konfigurasi server...',
            success: 'Konfigurasi server berhasil dihapus.',
            noConfig: 'Tidak ada konfigurasi yang ditemukan untuk server ini.',
            error: 'Terjadi kesalahan saat menghapus konfigurasi server.',
            deletedItemsHeader: 'Item yang dihapus:',
            deletedConfig: 'Pengaturan saluran dan role',
            deletedSettings: 'Pengaturan notifikasi',
            deletedLanguage: 'Pengaturan bahasa'
        },
        postcode: {
            modalTitle: 'Tambahkan Kode Penukaran',
            inputLabels: {
                games: 'Pilih Game (genshin/hsr/zzz)',
                code1: 'Kode 1 (Wajib)',
                code2: 'Kode 2 (Opsional)',
                code3: 'Kode 3 (Opsional)',
                message: 'Pesan Tambahan (Opsional)'
            },
            description: 'Tampilkan instruksi penukaran dan kode',
            success: 'Kode berhasil diposting!',
            error: 'Terjadi kesalahan saat memproses perintah',
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini',
            embedTitle: 'Kode Baru Telah Ditukarkan',
            invalidGame: 'Game tidak valid. Gunakan: genshin, hsr, atau zzz',
            noCode: 'Minimal satu kode diperlukan.',
            embedDescription: 'Kode baru telah tersedia untuk {game}!',
            messageLabel: 'Pesan:',
            redeemButton: 'Klik untuk Menukar'
        },
        toggleautosend: {
            loading: 'Memperbarui pengaturan kirim otomatis...',
            success: 'Kirim otomatis sekarang: **{status}**',
            error: 'Gagal memperbarui pengaturan kirim otomatis',
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini'
        },
        autosendoptions: {
            noPermission: 'Kamu memerlukan izin Administrator untuk menggunakan perintah ini.',
            success: '✅ Opsi kirim otomatis berhasil diperbarui!',
            warning: {
                autoSendDisabled: '⚠️ Kirim otomatis saat ini **nonaktif**. Aktifkan terlebih dahulu dengan `/toggleautosend status:Enable`'
            },
            error: {
                bothDisabled: '⚠️ Kamu tidak dapat menonaktifkan saluran dan thread sekaligus. Setidaknya satu harus diaktifkan.',
                general: 'Terjadi kesalahan saat memperbarui opsi kirim otomatis.'
            }
        },
        favgames: {
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini.',
            loading: 'Mengatur game favorit...',
            success: 'Game favorit berhasil dikonfigurasi!',
            error: 'Terjadi kesalahan saat mengatur game favorit.',
            filterStatus: 'Filter game: **{status}**',
            gameStatusHeader: 'Notifikasi Game:',
            allGamesEnabled: 'Kamu akan menerima notifikasi untuk semua game.'
        },
        help: {
            title: 'Bantuan HoYo Code Sender',
            description: 'HoYo Code Sender secara otomatis memberi tahu servermu tentang kode penukaran baru untuk Genshin Impact, Honkai: Star Rail, dan Zenless Zone Zero.',
            setupHeader: '📌 Pengaturan Awal',
            setupSteps: '1. Gunakan `/setup` untuk mengonfigurasi:\n' +
                '   • Pilih saluran notifikasi\n' +
                '   • Atur role untuk setiap game (untuk di-mention saat kode baru tiba)\n' +
                '   • Aktifkan/nonaktifkan pengiriman kode otomatis\n\n' +
                '2. Sesuaikan pengalamanmu:\n' +
                '   • `/favgames` - Pilih game yang ingin kamu terima kodenya\n' +
                '   • `/setlang` - Ganti bahasa bot\n' +
                '   • `/toggleautosend` - Aktifkan/nonaktifkan notifikasi kode otomatis',
            commandsHeader: '📋 Perintah yang Tersedia',
            commandsList: '• `/setup` - Pengaturan awal bot\n' +
                '• `/deletesetup` - Hapus konfigurasi server\n' +
                '• `/favgames` - Pilih game yang ingin kamu terima kodenya\n' +
                '• `/toggleautosend` - Aktifkan/nonaktifkan notifikasi otomatis\n' +
                '• `/autosendoptions` - Konfigurasi opsi kirim otomatis\n' +
                '• `/listcodes` - Tampilkan kode aktif untuk suatu game\n' +
                '• `/postcode` - Kirim kode tertentu ke saluranmu\n' +
                '• `/demoautosend` - Kirim kode demo untuk menguji notifikasi\n' +
                '• `/setupthread` - Atur thread forum untuk notifikasi kode\n' +
                '• `/checkchannels` - Cek saluran notifikasi yang dikonfigurasi\n' +
                '• `/livestreamcodesetup` - Konfigurasi saluran kode livestream\n' +
                '• `/setlang` - Ganti bahasa bot (Indonesia/Inggris/Vietnam/Jepang)\n' +
                '• `/dashboard` - Buka dasbor web\n' +
                '• `/vote` - Beri vote untuk bot di Top.gg\n' +
                '• `/help` - Tampilkan pesan bantuan ini\n' +
                '• `/about` - Informasi tentang bot',
            tipsHeader: '💡 Tips & Trik',
            tipsList: '• Bot memeriksa kode baru setiap 5 menit\n' +
                '• Kamu bisa memposting kode secara manual dengan `/postcode`\n' +
                '• Setelah setup, gunakan `/demoautosend` untuk menguji sistem notifikasi\n' +
                '• Gunakan `/favgames` untuk memfilter notifikasi berdasarkan game\n' +
                '• Atur role berbeda untuk setiap jenis game\n' +
                '• Gunakan `/livestreamcodesetup` untuk mengatur saluran khusus kode livestream\n' +
                '• Admin server dapat menjalankan `/setup` lagi untuk mengubah pengaturan',
            footer: 'HoYo Code Sender - Dapatkan kode game HoYoverse secara otomatis!',
            error: 'Terjadi kesalahan saat memuat informasi bantuan.'
        },
        setlang: {
            success: 'Bahasa bot telah diubah menjadi: **{language}**',
            error: 'Gagal mengatur bahasa untuk server ini',
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini',
            description: 'Atur bahasa bot untuk server ini',
            languageOption: 'Pilih bahasa'
        },
        about: {
            title: 'Tentang HoYo Code Sender',
            description: 'HoYo Code Sender adalah bot Discord yang secara otomatis mengumumkan kode baru untuk Genshin Impact, Honkai: Star Rail, dan Zenless Zone Zero dari Hoyoverse.',
            version: 'Versi:',
            sourceCode: 'Kode Sumber',
            inviteLink: 'Link Undangan',
            supportServer: 'Server Dukungan',
            vote: 'Vote untuk bot',
            github: 'Repositori GitHub',
            devbio: 'Profil Pengembang',
            donate: 'Donasi',
            sponsor: 'GitHub Sponsors'
        },
        dashboard: {
            title: '🌐 Dasbor Web',
            description: 'Akses dasbor web HoYo Code Sender untuk mengelola pengaturan servermu dengan antarmuka yang mudah digunakan.',
            webInterface: 'Antarmuka Web',
            openDashboard: 'Buka Dasbor',
            features: 'Fitur Dasbor',
            featuresList: '• 📊 Statistik server langsung\n• ⚙️ Manajemen konfigurasi visual\n• 🎮 Penugasan role game\n• 📱 Antarmuka ramah mobile\n• 🔔 Uji notifikasi\n• 🔄 Pembaruan waktu nyata',
            requirements: 'Persyaratan',
            requirementsList: '• Login akun Discord\n• Izin administrator server\n• Bot harus ada di servermu',
            footer: 'Kelola pengaturan bot dengan mudah melalui dasbor web!',
            error: 'Gagal memuat informasi dasbor.'
        },
        vote: {
            title: 'Vote untuk HoYo Code Sender',
            description: 'Dukung bot ini dengan memberikan vote di Top.gg! Votemu membantu kami menjangkau lebih banyak server.',
            status: 'Status Vote',
            hasVoted: '✅ Kamu sudah memberikan vote! Terima kasih atas dukunganmu.',
            hasNotVoted: '❌ Kamu belum memberikan vote dalam 12 jam terakhir.',
            link: 'Vote di Top.gg',
            error: 'Gagal memeriksa status vote.',
            voteAgain: 'Kamu bisa vote lagi dalam 12 jam.',
            thankTitle: 'Terima Kasih atas Votemu! 🎉',
            thankMessage: 'Terima kasih telah mendukung HoYo Code Sender di Top.gg! Votemu membantu kami berkembang.',
            dmThankTitle: 'Terima Kasih atas Votemu!',
            dmThankMessage: 'Terima kasih telah memberikan vote untuk HoYo Code Sender di Top.gg! Dukunganmu sangat berarti bagi kami.'
        },
        deletesetup: {
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini.',
            loading: 'Menghapus konfigurasi server...',
            success: 'Konfigurasi server berhasil dihapus.',
            noConfig: 'Tidak ada konfigurasi yang ditemukan untuk server ini.',
            error: 'Terjadi kesalahan saat menghapus konfigurasi server.',
            deletedItems: 'Item yang dihapus:',
            deletedConfig: 'Pengaturan saluran dan role',
            deletedSettings: 'Pengaturan notifikasi',
            deletedLanguage: 'Pengaturan bahasa'
        },
        togglegame: {
            noPermission: 'Kamu tidak memiliki izin untuk menggunakan perintah ini.',
            loading: 'Memproses permintaanmu...',
            enabledWithNewRole: '✅ Notifikasi **{game}** telah diaktifkan dengan role {role}.',
            enabledWithExistingRole: '✅ Notifikasi **{game}** telah diaktifkan dengan role yang ada {role}.',
            enabledNoRole: '⚠️ Notifikasi **{game}** telah diaktifkan, tetapi tidak ada role yang diatur. Tambahkan role dengan `{command}` atau notifikasi akan dikirim tanpa menyebut siapa pun.',
            disabled: '❌ Notifikasi **{game}** telah dinonaktifkan.',
            error: 'Terjadi kesalahan saat mengubah notifikasi game.'
        },
        sendtothread: {
            noPermission: 'Kamu memerlukan izin Administrator untuk menggunakan perintah ini.',
            noActiveCodes: 'Tidak ada kode aktif yang ditemukan untuk {game}.',
            success: '✅ Berhasil mengirim {count} kode aktif untuk {game} ke thread "{thread}"!',
            instructions: '**Cara menukar:**\n1. Klik tautan di atas\n2. Masuk ke akunmu\n3. Masukkan kode\n4. Klaim hadiahmu di dalam game!',
            error: {
                notThread: 'Saluran yang dipilih bukan thread. Silakan pilih thread forum.',
                noPermission: 'Saya tidak memiliki izin untuk mengirim pesan di thread tersebut. Silakan periksa izin saya.',
                general: 'Terjadi kesalahan saat mengirim kode ke thread.'
            }
        },
        setupthread: {
            noPermission: 'Kamu memerlukan izin Administrator untuk menggunakan perintah ini.',
            success: '✅ Thread forum telah dikonfigurasi! Kode akan diposting ke thread permanen khusus untuk setiap game.',
            error: {
                notThread: 'Salah satu saluran yang dipilih bukan thread forum. Silakan pilih thread forum.',
                noPermission: 'Saya tidak memiliki izin untuk mengirim pesan di salah satu thread. Silakan periksa izin saya.',
                noSetup: 'Silakan jalankan `/setup` terlebih dahulu untuk mengonfigurasi saluran notifikasi utama.',
                general: 'Terjadi kesalahan saat mengatur thread forum.'
            }
        }
    },
    errors: {
        general: 'Terjadi kesalahan. Silakan coba lagi.',
        api: 'Gagal terhubung ke API',
        database: 'Terjadi kesalahan database',
        invalidChannel: 'Kesalahan: Tidak dapat menemukan saluran yang dikonfigurasi',
        noConfig: 'Kesalahan: Saluran belum dikonfigurasi untuk server ini',
        rateLimit: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
        dmNotAllowed: '❌ Perintah `/{command}` hanya dapat digunakan di server Discord, bukan di pesan langsung.\n\n' +
            'Silakan gunakan perintah ini di server yang memiliki bot HoYo Code Sender.'
    },
    system: {
        startup: 'Bot sedang memulai...',
        ready: 'Bot sekarang online!',
        checking: 'Memeriksa kode baru...',
        connected: 'Terhubung ke database',
        disconnected: 'Terputus dari database'
    }
};
