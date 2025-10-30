<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8"/>
        <title>🗺️ خريطة موقع نعومة</title>
        <style>
          body {
            font-family: 'Tajawal', sans-serif;
            background: #fffaf5;
            color: #333;
            margin: 40px;
          }
          h1 {
            color: #e67e22;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            text-align: center;
            font-size: 16px;
            color: #666;
            margin-bottom: 40px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          th, td {
            padding: 12px 10px;
            border-bottom: 1px solid #eee;
            text-align: center;
          }
          th {
            background: #ffe5cc;
            color: #333;
            font-weight: bold;
          }
          tr:hover td {
            background: #fff6ef;
          }
          a {
            color: #e67e22;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
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
              <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
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
