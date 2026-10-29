# Next Role

Adil için mobil öncelikli frontend iş arama uygulaması. React + TypeScript + Vite; Netlify Functions. Hesap/veritabanı gerektirmez.

## Netlify'da yayınlama

1. Bu klasörün içeriğini bir GitHub reposunun köküne koy. `package.json`, `netlify.toml`, `src` ve `netlify/functions` aynı kökte olmalı. `node_modules` yükleme.
2. Netlify'da **Add new project → Import an existing project → GitHub** ile repoyu seç.
3. Base directory: boş (repo kökü). Build command: `npm run build`. Publish directory: `dist`. Functions directory: `netlify/functions`. Node: 22. `netlify.toml` bunları tanımlar.
4. Deploy tamamlanınca site adresini telefonda aç. Tarayıcının Paylaş / menü seçeneğinden **Ana Ekrana Ekle** kullanabilirsin.
5. Profil ekranına e-posta ve telefonunu gir; temel CV'yi kontrol et. İstersen teslim edilen `Adil-Next-Role-Profile.json` dosyasını **Profil → Yedek / profil içe aktar** ile yükle. Bu özel dosyayı GitHub reposuna veya site klasörüne koyma.

**Sadece `dist` klasörünü Netlify Drop'a sürüklemek yeterli değildir:** ilan ve AI uçları Netlify Functions gerektirir. Git tabanlı deploy kullan. Henüz Netlify'a yayınlanmış bir site teslim edilmiyor; yerel kaynak ve test edilmiş build teslim ediliyor.

Netlify Free plan limitleri içinde kullanılabilir; sınırsız ücretsiz hosting iddiası yoktur. Kullanım/deploy kredilerini Netlify hesabından kontrol et. AI sağlayıcısının kotası Netlify'dan ayrıdır.

## Yerelde çalıştırma

Node 22.13+ önerilir.

```sh
npm ci
npm run dev
```

`http://127.0.0.1:5173` adresini aç. Vite development middleware'i aynı Netlify fonksiyonlarını yerelde çalıştırır. `npm run preview` yalnızca statik build sunar; API'ler için `npm run dev` veya Netlify ortamı kullan.

```sh
npm test
npm run build
```

## AI desteği (isteğe bağlı)

Anahtar olmadan ilanlar, takip, ilan ekleme, CV maddelerini ilana göre sıralama, şablon cover letter, düzenleme ve PDF/TXT indirme çalışır. Anahtarsız taslak bir dil modeli değildir.

AI ile yeniden yazma için:

1. Google AI Studio'dan Gemini API anahtarı oluştur.
2. Netlify proje ayarlarında Environment variables bölümüne `GEMINI_API_KEY` ekle.
3. Güçlü, rastgele ve kendine özel bir `APP_ACCESS_TOKEN` belirle; örneğin parola yöneticisinde 32+ karakter üret. Aynı isimle Netlify ortam değişkeni ekle.
4. İsteğe bağlı `GEMINI_MODEL`: varsayılan `gemini-3.5-flash-lite`. Hesabında kullanılabilir bir GenerateContent model adı seçebilirsin.
5. Değişkenlerin Functions kapsamında kullanılabildiğinden emin ol, yeniden deploy et.
6. Uygulamanın Profil ekranındaki AI erişim koduna `APP_ACCESS_TOKEN` değerini gir. Buraya Gemini API anahtarını girme.
7. Belgeler ekranında **AI ile uyarla** seç. Belgeyi kontrol edip düzenle ve PDF indir.

Yerelde `.env.example` dosyasını `.env` olarak kopyalayabilirsin. Gerçek anahtarları Git'e koyma. Hiçbir sır `VITE_` önekiyle tanımlanmamalı. Erişim kodu sadece sessionStorage'da; Gemini anahtarı yalnızca sunucudadır. Kod bir kullanıcı hesabı sistemi değildir. AI profil/CV ve seçili ilan metnini Google'a gönderir. Bu sürümle gerçek sağlayıcı çağrısı anahtar verilmediği için doğrulanmadı; endpoint auth ve hata durumları test edildi. Model yanıtları yine kullanıcı tarafından doğrulanmalıdır.

## İlan kaynakları

- **Himalayas**: ABD filtreli `frontend`, `react`, `next.js` aramalarının ilk 20 sonucu; kopyalar birleştirilir. Yayın/sona erme tarihleri kullanılır. `applicationLink` değiştirilmez; görünür kaynak linki korunur. İsteğe bağlı `HIMALAYAS_API_KEY` ile daha yüksek kota.
- **Remotive**: software-dev akışı; React/frontend ile ilgili roller seçilir. Kaynak şartları gereği 24 saat gecikmeli ilanlar ve Remotive bağlantısı kullanılır.
- **Greenhouse**: varsayılan `lumimeds,onetrust`. İsteğe bağlı `GREENHOUSE_BOARDS` ortam değişkenine virgülle ayrılmış board token'ları ekleyebilirsin. En fazla 5 şirket. Burada `updated_at` yayın tarihi sayılmaz.
- **Elle ekleme**: diğer kaynaklardan bulduğun ilanın URL, şirket, başlık ve açıklamasını ekle. Uygulama keyfi URL'lerden sunucu tarafında içerik çekmez.

Arayüz ve sunucu yanıtı 6 saatlik kaynak önbelleği kullanır; uygulama açılınca / sekmeye dönünce kontrol edilir. Netlify CDN cache global isteği azaltır, süreç içi cache warm instance için ek koruma sağlar. Cold start veya birden fazla instance sağlayıcıya ek istek doğurabilir; ticari/toplu kullanım için kalıcı cache gerekir. Uygulama kapalıyken tarama, bildirim veya otomatik başvuru yapmaz.

Tüm ABD/Michigan ilanlarını kapsamaz. Kaynak konumu ABD/dünya geneli olanlar öne alınır; gerçek eyalet ve çalışma izni şartlarını ilandan doğrula. Kaynaklar eksik veya hatalı sınıflandırılmış olabilir. Maaşlar kaynağın beyanıdır. İlan açık mı, ücret ve başvuru koşulları doğru mu son sayfadan kontrol et. Geçmişte kaydettiğin ilan kapanmış olsa da takip defterinde geçmiş kaydı kalır.

Uyum puanı sadece kodda açıkça tanımlanan beceri/deneyim/konum kurallarından oluşur; ATS puanı veya işe alınma ihtimali değildir. Senior unvanlar varsayılan gizli; bilinen yabancı konumlar varsayılan gizli. “Remote” gibi belirsiz konumlar teyit uyarısıyla gösterilir. Yayın tarihi olmayan ilanlar tarih filtresinde görünmeye devam eder.

## Veriler ve PDF

Profil, başvurular, notlar ve belgeler tarayıcı localStorage'ında. Sunucuda aday profili veya geçmiş tutulmaz. Cihazlar arası senkronizasyon yok; JSON yedekleme ve içe aktarma var. Varsayılan kaynakta profesyonel deneyim örneği bulunur, özel e-posta/telefon yoktur; bunları cihazındaki Profil ekranına gir. AI endpoint'i yalnızca istek sırasında bu verileri işler.

PDF'ler jsPDF ile metin olarak cihazda üretilir. Düzenlenmiş belgenin uzunluğuna göre birden fazla sayfa olabilir. Temel CV İngilizce içindir; Türkçe karakterler PDF çıktısında Latin karşılıklarına dönüştürülür. E-posta/telefon boşsa yer tutucuları doldur. Dosyayı işverene göndermeden önce gözden geçir. Başvuru bağlantısını açmak otomatik olarak “başvuruldu” yapmaz.

## Dosyalar

- `src/main.tsx`: mobil arayüz, takip, belge editörü, profil.
- `src/lib.js`: eşleştirme, temizleme, URL doğrulama, anahtarsız taslaklar.
- `netlify/functions/jobs.mjs`: kaynak birleştirme, cache, hata toleransı.
- `netlify/functions/generate.mjs`: korumalı Gemini isteği.
- `tests/matching.test.mjs`: kritik eşleşme ve auth kontrolleri.

## Referanslar

- https://himalayas.app/api
- https://github.com/remotive-com/remote-jobs-api
- https://developers.greenhouse.io/job-board.html
- https://ai.google.dev/api/generate-content
- https://ai.google.dev/gemini-api/docs/models
- https://docs.netlify.com/deploy/create-deploys/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
