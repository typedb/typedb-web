<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
	xmlns:html="http://www.w3.org/TR/REC-html40"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>Grakn XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body{
						background-color:rgb(188,222,165);
						color:rgb(37,37,37);
						font:11px/normal Helvetica, Arial, sans-serif;}
					#intro{
						padding:5px 0;
						margin:10px;}
					#intro p{
						line-height:16px;}
					td{
						font-size:11px;}
					th{
						text-align:left;
						font-size:11px;}
					tr.high{
						background-color:rgba(37,37,37,.1);}
					#footer{
						padding:5px 0;
						margin:10px;
						font-size:11px;}
					#footer a{
						color:rgba(37,37,37,.7);}
					a{
						color:rgb(37,37,37);}
				</style>
			</head>
			<body>
				<h1>Grakn XML Sitemap</h1>
				<div id="intro">
					<p>
						This is the Grakn XML <a href="http://sitemaps.org">Sitemap</a>.
					</p>
				</div>
				<div id="content">
					<table width="640" border="0" cellspacing="5" cellpadding="5">
						<tr>
							<th>URL</th>
							<th>Priority</th>
						</tr>
						<xsl:for-each select="sitemap:urlset/sitemap:url">
							<tr>
								<xsl:if test="position() mod 2 != 1">
									<xsl:attribute name="class">high</xsl:attribute>
								</xsl:if>
								<td>
									<xsl:variable name="itemURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<a href="{$itemURL}">
										<xsl:value-of select="sitemap:loc"/>
									</a>
								</td>
								<td>
									<xsl:value-of select="concat(sitemap:priority*100,'%')"/>
								</td>
							</tr>
						</xsl:for-each>
					</table>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
