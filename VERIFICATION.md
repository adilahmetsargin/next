# Doğrulama

- `npm test`: 11 test geçti. Eşleştirme, kaynak konumu, güvenli URL, HTML temizleme, tekrarları ayıklama, mevcut CV iddialarının korunması ve AI yetkilendirme kontrolleri.
- `npm run build`: TypeScript ve Vite production build başarılı.
- Canlı `jobs` fonksiyonu: Himalayas, Remotive ve iki Greenhouse board'undan başarılı yanıt alındı. Sonuç sayısı ve içerik kaynağa/tarihe göre değişir.
- 390 px mobil viewport: belge genişliği 390 px, yatay taşma yok. Mobil alt gezinme, ilan detayı, kaydetme, cover letter üretimi ve resume sıralama tarayıcıda denendi.
- Her iki belge türü arayüzden PDF olarak indirildi. Örnek çıktılar tek sayfa, metin seçilebilir ve sayfa düzeni görsel olarak kontrol edildi.
- Son temiz sayfa yüklemesinde tarayıcı hata kaydı yok.
- Gerçek Gemini üretimi, API anahtarı sağlanmadığı için test edilmedi. Yetkilendirme ve yapılandırma hata durumları test edildi.
- Netlify hesabına dağıtım yapılmadı; Netlify ortamında uçtan uca deployment doğrulaması henüz yapılmış değil.
