<!DOCTYPE HTML>
<html lang="de">
	<head>
		<!-- REQUIRED META -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<meta name="description" content="{$description}">
		<meta name="keywords" content="{$keywords}">

		<!-- OPTIONAL/EXTRA META -->
		{for $meta in $metas}
			<meta name="{$meta.name}" lang="{$meta.lang}" content="{$meta.content}">
		{/for}

		<title>{$title}</title>

		<!-- REQUIRED LINKS -->
		<link href="/css/websuite-light.css" rel="stylesheet" type="text/css">
		<link href="/css/mobile.css" rel="stylesheet" type="text/css">
		<link href="/css/loader.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600,700,800" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500,400italic,700" rel="stylesheet" type="text/css">
		<link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

		<script src="https://www.google.com/recaptcha/api.js" async defer></script>

		<!-- OPTIONAL/EXTRA LINKS -->
		{for $link in $links}
			<link href="{$link.href}" rel="{$link.rel}" type="{$link.type}">
		{/for}
	</head>
	<body>
		<div id="websuite">
			<div class="pre-loader-container">
				<div>
					<div class="pre-loader"></div>
					<div class="pre-status" id="loading-status">
						Verbindung wird hergestellt...
					</div>
					<div class="pre-info">
						<b>Information:</b> JavaScript und Cookies müssen aktiviert sein
					</div>
				</div>
			</div>
		</div>
	</body>

	<!-- REQUIRED SCRIPTS -->
	<script src="/socket.io.js"></script>
	<script src="/dist/websuite.js"></script>

	<!-- OPTIONAL/EXTRA SCRIPTS -->
	{for $script in $scripts}
		<script src="{$script.src}"></script>
	{/for}
</html>