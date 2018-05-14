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
		<link href="/css/style.css" rel="stylesheet" type="text/css">
		<link href="/css/mobile.css" rel="stylesheet" type="text/css">
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
			Bitte aktiviere JavaScript!
		</div>
	</body>

	<!-- REQUIRED SCRIPTS -->
	<script src="/javascript/jquery_3.2.1.js"></script>
	<script src="/socket.io.js"></script>
	<script src="/javascript/main.js"></script>
	<script src="/dist/websuite.js"></script>

	<!-- OPTIONAL/EXTRA SCRIPTS -->
	{for $script in $scripts}
		<script src="{$script.src}"></script>
	{/for}
</html>