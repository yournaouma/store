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
  margin-top: 40px;
  color: #777;
  font-size: 14px;
}
</style>
</head>

<body>
  <h1>🗺️ خريطة موقع نعومة نعومتك</h1>

  <!-- عرض جميع الروابط -->
  <xsl:for-each select="urlset/url">
    <a href="{loc}">
      <xsl:value-of select="loc"/>
    </a>
  </xsl:for-each>

  <footer>نعومة نعومتك © 2025</footer>
</body>
</html>

</xsl:template>
</xsl:stylesheet>
