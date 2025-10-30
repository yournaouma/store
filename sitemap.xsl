<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>خريطة موقع نعومة</title>
        <style>
          body { font-family: "Tajawal", sans-serif; background:#fffaf5; color:#333; margin:40px; }
          h1 { color:#ff9100; text-align:center; }
          table { border-collapse: collapse; width:100%; margin-top:20px; box-shadow:0 0 10px rgba(0,0,0,0.05); }
          th, td { border:1px solid #ddd; padding:10px 12px; text-align:right; }
          th { background:#ff9100; color:white; }
          tr:nth-child(even) { background:#fff4e6; }
          a { color:#ff6f00; text-decoration:none; }
          a:hover { text-decoration:underline; }
        </style>
      </head>
      <body>
        <h1>🗺️ خريطة موقع نعومة</h1>
        <p>يتم تحديث هذه الخريطة تلقائيًا يوميًا لتساعد Google على فهرسة صفحاتك بسرعة.</p>
        <table>
          <tr>
            <th>الرابط</th>
            <th>آخر تعديل</th>
            <th>تكرار التحديث</th>
            <th>الأولوية</th>
          </tr>
          <xsl:for-each select="urlset/url">
            <tr>
              <td><a href="{loc}" target="_blank"><xsl:value-of select="loc"/></a></td>
              <td><xsl:value-of select="lastmod"/></td>
              <td><xsl:value-of select="changefreq"/></td>
              <td><xsl:value-of select="priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
