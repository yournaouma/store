<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml">

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">

<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"/>
<title>🗺️ خريطة موقع نعومة نعومتك</title>
<style>
body {
  font-family: "Cairo", sans-serif;
  background-color: #fffaf3;
  margin: 0;
  padding: 20px;
  text-align: center;
}
h1 {
  color: #f79c05;
  margin-bottom: 25px;
}
h2 {
  color: #333;
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 20px;
}
a {
  display: block;
  margin: 8px auto;
  width: fit-content;
  text-decoration: none;
  color: #333;
  font-size: 18px;
  transition: all 0.3s ease;
  padding: 10px 18px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
a:hover {
  color: white;
  background-color: #f79c05;
  box-shadow: 0 0 12px #f79c05, 0 0 20px #f79c05;
  transform: scale(1.05);
}
footer {
  margin-top: 50px;
  color: #777;
  font-size: 14px;
}
</style>
</head>

<body>
  <h1>🗺️ خريطة موقع نعومة نعومتك</h1>

  <!-- روابط sitemap.xml الأصلية -->
  <h2>🔗 روابط مضافة تلقائيًا</h2>
  <xsl:for-each select="urlset/url">
    <a href="{loc}">
      <xsl:value-of select="loc"/>
    </a>
  </xsl:for-each>

  <!-- روابط إضافية ثابتة -->
  <h2>📁 روابط إضافية من ملفات الموقع</h2>

  <a href="https://yournaouma.github.io/store/about.html">about.html</a>
  <a href="https://yournaouma.github.io/store/cart.html">cart.html</a>
  <a href="https://yournaouma.github.io/store/cleansers.html">cleansers.html</a>
  <a href="https://yournaouma.github.io/store/contact.html">contact.html</a>
  <a href="https://yournaouma.github.io/store/creams.html">creams.html</a>
  <a href="https://yournaouma.github.io/store/index.html">index.html</a>
  <a href="https://yournaouma.github.io/store/itemap.yml">itemap.yml</a>
  <a href="https://yournaouma.github.io/store/payment.html">payment.html</a>
  <a href="https://yournaouma.github.io/store/privacy.html">privacy.html</a>
  <a href="https://yournaouma.github.io/store/refund.html">refund.html</a>
  <a href="https://yournaouma.github.io/store/robots.txt">robots.txt</a>
  <a href="https://yournaouma.github.io/store/serums.html">serums.html</a>
  <a href="https://yournaouma.github.io/store/shipping.html">shipping.html</a>
  <a href="https://yournaouma.github.io/store/sitemap.html">sitemap.html</a>
  <a href="https://yournaouma.github.io/store/sitemap.xml">sitemap.xml</a>
  <a href="https://yournaouma.github.io/store/sitemap.xsl">sitemap.xsl</a>
  <a href="https://yournaouma.github.io/store/store.html">store.html</a>
  <a href="https://yournaouma.github.io/store/sunscreen.html">sunscreen.html</a>
  <a href="https://yournaouma.github.io/store/update-sitemap.js">update-sitemap.js</a>
  <a href="https://yournaouma.github.io/store/yourskin.html">yourskin.html</a>

  <footer>نعومة نعومتك © 2025 — جميع الحقوق محفوظة</footer>
</body>
</html>

</xsl:template>
</xsl:stylesheet>
