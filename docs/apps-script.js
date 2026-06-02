// Bu kodu Google Apps Script (script.google.com) içerisine yapıştırıp kaydetmelisiniz.
// Güncellemeyi uygulamak için: Dağıt -> Yeni Dağıtım (veya Dağıtımları Yönet -> Düzenle -> Yeni Sürüm) seçmelisiniz.

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var emailTo = "sukrugencoglu10@gmail.com";
    var isSeller = data.variant === "seller";
    var subject = "🚀 YENİ TALEBİ (" + (isSeller ? "Satış" : "Alış") + ") - " + data.name;
    
    var cleanPhone = (data.phone || "").replace(/\D/g, "");
    var waLink = "https://wa.me/" + cleanPhone;
    var telLink = "tel:+" + cleanPhone;

    var htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Yeni Konteyner Talebi</h1>
          <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">Web sitenizden yeni bir ${isSeller ? "satış" : "fiyat alma"} talebi geldi.</p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          
          <!-- İletişim Bilgileri Tablosu -->
          <h2 style="font-size: 16px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">👤 İletişim Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 40%;">Ad Soyad</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Telefon</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">E-posta</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.email || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Firma Adı</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.company || "-"}</td>
            </tr>
          </table>

          <!-- Konteyner Bilgileri Tablosu -->
          <h2 style="font-size: 16px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">📦 Konteyner Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 40%;">Tipi</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.category}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Boyutu</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.size || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Miktar</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #ea580c; font-weight: bold;">${data.quantity} Adet</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Bölge</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.region}</td>
            </tr>
            ${isSeller && data.condition ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b;">Konteyner Durumu</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${data.condition}</td>
            </tr>` : ''}
          </table>

          <!-- Ek Açıklamalar -->
          <h2 style="font-size: 16px; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">📝 Müşteri Notu</h2>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; color: #475569; font-size: 14px; font-style: italic; margin-bottom: 32px;">
            ${data.message || "Ek açıklama eklenmemiş."}
          </div>

          <!-- Aksiyon Butonları -->
          <div style="text-align: center; margin-top: 10px;">
            <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: bold; font-size: 15px; margin-right: 10px; box-shadow: 0 2px 4px rgba(37,211,102,0.3);">
              💬 WhatsApp'tan Yaz
            </a>
            <a href="${telLink}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(15,23,42,0.3);">
              📞 Hemen Ara
            </a>
          </div>

        </div>
        
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
          Bu e-posta GNC Konteyner web sitesi üzerinden otomatik olarak gönderilmiştir.
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: emailTo,
      subject: subject,
      htmlBody: htmlMessage
    });

    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
