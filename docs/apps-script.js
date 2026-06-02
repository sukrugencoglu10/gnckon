// Bu kodu Google Apps Script (script.google.com) içerisine yapıştırıp "Web App" olarak dağıtmalısınız.

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var emailTo = "sukrugencoglu10@gmail.com";
    var subject = "YENİ KONTEYNER TALEBİ (" + (data.variant === "seller" ? "Satış" : "Alış") + ")";
    
    var message = "Web sitenizden yeni bir form dolduruldu:\n\n" +
      "--- İLETİŞİM BİLGİLERİ ---\n" +
      "Ad Soyad: " + data.name + "\n" +
      "Telefon: " + data.phone + "\n" +
      "E-posta: " + (data.email || "-") + "\n" +
      "Firma: " + (data.company || "-") + "\n\n" +
      "--- KONTEYNER BİLGİLERİ ---\n" +
      "Tip: " + data.category + "\n" +
      "Boyut: " + (data.size || "-") + "\n" +
      "Miktar: " + data.quantity + "\n" +
      "Bölge: " + data.region + "\n";
      
    if (data.variant === "seller" && data.condition) {
      message += "Durum: " + data.condition + "\n";
    }
    
    message += "\n--- AÇIKLAMALAR ---\n" + (data.message || "-");

    MailApp.sendEmail({
      to: emailTo,
      subject: subject,
      body: message
    });

    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
