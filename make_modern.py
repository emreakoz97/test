def main():
    # 1. Update index.html
    html_path = 'index.html'
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Hero Title & Desc
    html = html.replace('Fantastik', 'Modern')
    html = html.replace('Montaj Sihirbazı!', 'Mobilya Montajı!')
    html = html.replace('Sihirli Fiyat Hesaplayıcı', 'Hızlı Teklif Formu')
    html = html.replace(
        'Vidalar eğilir, paneller birleşir, demonte mobilyalarınız adeta kendi kendine kurulur. Milimetrik hassasiyet, sıfır gürültü ve göz kamaştırıcı hızla',
        'Demonte mobilyalarınız uzman marangoz hassasiyetiyle tam ölçüsünde birleşir. Hızlı kurulum, temiz işçilik ve profesyonel teknik el aletleriyle'
    )
    
    # Stats
    html = html.replace('Kozmik Deneyim', 'Sektörel Deneyim')
    html = html.replace('Çıraklıktan efsaneliğe uzanan montaj sanatı.', 'Sektörün mutfağından gelen montaj ve marangozluk tecrübesi.')
    
    # Services Header & Titles
    html = html.replace('Kusursuz İşçilik Portalı', 'Kusursuz İşçilik & Güvence')
    html = html.replace('Montaj Sihirbazının Büyülü Hizmetleri', 'Profesyonel Montaj Hizmetlerimiz')
    html = html.replace('Gardırop & Yatak Odası Sihri', 'Gardırop & Yatak Odası Kurulumu')
    html = html.replace('Mutfak & Banyo Tapınağı', 'Mutfak & Banyo Mobilya Kurulumu')
    
    # Calculator
    html = html.replace('Şeffaf Fiyatlandırma', 'Detaylı Form')
    html = html.replace('Montaj Maliyeti Sihirbazı', 'Hızlı Teklif İsteme Formu')
    html = html.replace(
        'Kurulmasını istediğiniz mobilyaları seçin, boyutunu ayarlayın ve saniyeler içinde net fiyat aralığı ile tahmini süreyi görün. Sürpriz maliyetlere son!',
        'Kurulacak mobilya türünü ve boyutunu seçip detayları belirtin, WhatsApp üzerinden anında size özel fiyat teklifimizi hazırlayalım.'
    )
    
    # Testimonials
    html = html.replace('Müşterilerin Sihirli Yorumları', 'Müşterilerimizin Yorumları')
    
    # FAQs
    html = html.replace('Kadim Sırlar', 'Sıkça Sorulan Sorular')
    html = html.replace('Sihirli montaj hizmeti için randevuyu nasıl alırım?', 'Montaj hizmeti için randevuyu nasıl alırım?')
    html = html.replace('Sihirli montaj hizmeti', 'Profesyonel montaj hizmeti')
    
    # Footer
    html = html.replace('sihirli çözümler sunan', 'profesyonel çözümler sunan')
    html = html.replace('İletişim Portalı', 'İletişim Bilgileri')
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("HTML updated to modern theme.")

    # 2. Update app.js (WhatsApp Emojis)
    js_path = 'app.js'
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()
        
    js = js.replace('🔮 *Mobilya Türü:*', '🛠️ *Mobilya Türü:*')
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print("JS updated to modern theme.")

if __name__ == '__main__':
    main()
